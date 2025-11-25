import os
import re
import json
import mysql.connector
from http.server import SimpleHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse

# --- Conexão ---
try:
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",  # senha do banco de dados correspondente da maquina
        database="cinecolab"
    )
    print(" Conexão 'cinecolab' estabelecida.")
except mysql.connector.Error as err:
    print(f" Erro ao conectar ao MySQL: {err}")
    exit(1)

# --- Classe Principal do Servidor ---
class MyHandle(SimpleHTTPRequestHandler):

    # --- CORS Headers ---
    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_cors_headers()
        self.end_headers()

    # --- Funções Auxiliares de BD ---
    
    def parse_name(self, full_name):
        parts = full_name.strip().split(' ', 1)
        nome = parts[0]
        sobrenome = parts[1] if len(parts) > 1 else ''
        return nome, sobrenome

    def get_or_create_id(self, cursor, table_name, name_str):
        nome, sobrenome = self.parse_name(name_str)
        
        if table_name == 'Produtora':
            cursor.execute("SELECT id_produtora FROM Produtora WHERE nome = %s", (name_str,))
        elif table_name == 'Ator':
            cursor.execute("SELECT id_ator FROM Ator WHERE nome = %s", (name_str,))
        elif table_name == 'Diretor':
            cursor.execute("SELECT id_diretor FROM Diretor WHERE nome = %s AND sobrenome = %s", (nome, sobrenome))
        
        result = cursor.fetchone()
        
        if result:
            return result[0]
        else:
            # Inserção se não existir
            if table_name == 'Ator':
                cursor.execute("INSERT INTO Ator (nome) VALUES (%s)", (name_str,))
            elif table_name == 'Diretor':
                cursor.execute("INSERT INTO Diretor (nome, sobrenome) VALUES (%s, %s)", (nome, sobrenome))
            elif table_name == 'Produtora':
                cursor.execute("INSERT INTO Produtora (nome) VALUES (%s)", (name_str,))
            
            return cursor.lastrowid

    def _atualizar_relacionamentos_filme(self, cursor, id_filme, data):
        # Limpa relacionamentos antigos (Usando SUAS tabelas de junção)
        cursor.execute("DELETE FROM Filme_genero WHERE id_filme = %s", (id_filme,))
        cursor.execute("DELETE FROM filme_linguagem WHERE id_filme = %s", (id_filme,))
        cursor.execute("DELETE FROM filme_produtora WHERE id_filme = %s", (id_filme,))
        cursor.execute("DELETE FROM filme_diretor WHERE id_filme = %s", (id_filme,))
        cursor.execute("DELETE FROM Filme_ator WHERE id_filme = %s", (id_filme,))
        
        # Insere Novos
        cursor.execute("INSERT INTO Filme_genero (id_genero, id_filme) VALUES (%s, %s)", (int(data['id_genero']), id_filme))
        cursor.execute("INSERT INTO filme_linguagem (id_linguagem, id_filme) VALUES (%s, %s)", (int(data['id_linguagem']), id_filme))
        
        id_produtora = self.get_or_create_id(cursor, 'Produtora', data['produtora'])
        cursor.execute("INSERT INTO filme_produtora (id_filme, id_produtora) VALUES (%s, %s)", (id_filme, id_produtora))
        
        id_diretor = self.get_or_create_id(cursor, 'Diretor', data['diretor'])
        cursor.execute("INSERT INTO filme_diretor (id_filme, id_diretor) VALUES (%s, %s)", (id_filme, id_diretor))
        
        atores_list = [ator.strip() for ator in data['atores'].split(',')]
        for ator_nome in atores_list:
            if ator_nome:
                id_ator = self.get_or_create_id(cursor, 'Ator', ator_nome)
                cursor.execute("INSERT INTO Filme_ator (id_filme, id_ator, personagem) VALUES (%s, %s, 'Desconhecido')", (id_filme, id_ator))
    
    # --- Verificador de Login  ---
    def accont_user(self, login, password):
        if not mydb.is_connected(): mydb.reconnect()
        cursor = mydb.cursor(dictionary=True)
        
        # Consulta na tabela 'usuarios'
        sql = "SELECT * FROM usuarios WHERE email = %s AND senha = %s"
        cursor.execute(sql, (login, password))
        user = cursor.fetchone()
        cursor.close()

        if user:
            role = "admin" if user['is_admin'] else "comum"
            return {"status": "logado", "role": role, "nome": user['nome']}
        else:
            return {"status": "falha"}

    # --- Métodos GET ---
    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        query_params = parse_qs(parsed_path.query)

        # Rota API: /api/filmes (com Busca e Filtros)
        if path == "/api/filmes":
            try:
                if not mydb.is_connected(): mydb.reconnect()
                cursor = mydb.cursor(dictionary=True)
                
                # --- QUERY TABELAS ---
                sql = """
                    SELECT 
                        f.id_filme AS id_filme, f.titulo AS nomeFilme, f.tempo_de_duracao AS tempo_duracao,
                        f.ano_de_lancamento AS ano, f.poster AS poster, f.sinopse AS sinopse, f.status AS status,
                        GROUP_CONCAT(DISTINCT g.nome SEPARATOR ', ') AS generos,
                        GROUP_CONCAT(DISTINCT a.nome SEPARATOR ', ') AS atores,
                        GROUP_CONCAT(DISTINCT CONCAT(d.nome, ' ', d.sobrenome) SEPARATOR ', ') AS diretores,
                        GROUP_CONCAT(DISTINCT l.nome SEPARATOR ', ') AS linguagens
                    FROM Filme f
                    LEFT JOIN Filme_genero fg ON f.id_filme = fg.id_filme
                    LEFT JOIN genero g ON fg.id_genero = g.id_genero
                    LEFT JOIN Filme_ator fa ON f.id_filme = fa.id_filme
                    LEFT JOIN Ator a ON fa.id_ator = a.id_ator
                    LEFT JOIN filme_diretor fd ON f.id_filme = fd.id_filme
                    LEFT JOIN Diretor d ON fd.id_diretor = d.id_diretor
                    LEFT JOIN filme_linguagem fl ON f.id_filme = fl.id_filme
                    LEFT JOIN linguagem l ON fl.id_linguagem = l.id_linguagem
                """
                
                where_clauses = ["f.status = 'APROVADO'"]
                params = []

                if 'busca' in query_params:
                    termo_busca = f"%{query_params['busca'][0]}%"
                    where_clauses.append("""
                        (f.titulo LIKE %s 
                        OR a.nome LIKE %s
                        OR CONCAT(d.nome, ' ', d.sobrenome) LIKE %s)
                    """)
                    params.extend([termo_busca, termo_busca, termo_busca])
                
                if 'genero' in query_params and query_params['genero'][0]:
                    where_clauses.append("g.nome = %s")             
                    params.append(query_params['genero'][0])        

                if 'ano' in query_params and query_params['ano'][0]:
                    where_clauses.append("f.ano_de_lancamento = %s")
                    params.append(query_params['ano'][0])

                if where_clauses:
                    sql += " WHERE " + " AND ".join(where_clauses)

                sql += " GROUP BY f.id_filme ORDER BY f.titulo;"
                
                cursor.execute(sql, tuple(params))
                filmes = cursor.fetchall()
                cursor.close()

                self.send_response(200)
                self.send_cors_headers()
                self.send_header("Content-type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps(filmes, ensure_ascii=False).encode("utf-8"))

            except Exception as e:
                self.send_response(500)
                self.send_cors_headers()
                self.wfile.write(json.dumps({"error": f"Erro: {str(e)}"}).encode("utf-8"))

        # --- ROTA DA HOME  ---
        elif path == "/api/home":
            try:
                if not mydb.is_connected(): mydb.reconnect()
                cursor = mydb.cursor(dictionary=True)
                
                # 1. Buscar Gêneros 
                cursor.execute("SELECT id_genero AS ID, nome AS Nome FROM genero ORDER BY nome")
                generos = cursor.fetchall()
                
                # 2. Filmes Recentes 
                sql_filmes_recentes = """
                    SELECT 
                        f.id_filme AS id_filme, f.titulo AS titulo, f.poster AS poster, 
                        f.ano_de_lancamento AS ano,
                        GROUP_CONCAT(DISTINCT g.nome SEPARATOR ', ') AS generos
                    FROM Filme f
                    LEFT JOIN Filme_genero fg ON f.id_filme = fg.id_filme
                    LEFT JOIN genero g ON fg.id_genero = g.id_genero
                    WHERE f.status = 'APROVADO'
                    GROUP BY f.id_filme
                    ORDER BY f.id_filme DESC
                    LIMIT 10
                """
                cursor.execute(sql_filmes_recentes)
                filmes_recentes = cursor.fetchall()

                # 3. Filmes Populares
                sql_filmes_populares = """
                    SELECT 
                        f.id_filme AS id_filme, f.titulo AS titulo, f.poster AS poster,
                        f.ano_de_lancamento AS ano,
                        GROUP_CONCAT(DISTINCT g.nome SEPARATOR ', ') AS generos
                    FROM Filme f
                    LEFT JOIN Filme_genero fg ON f.id_filme = fg.id_filme
                    LEFT JOIN genero g ON fg.id_genero = g.id_genero
                    WHERE f.status = 'APROVADO'
                    GROUP BY f.id_filme
                    ORDER BY f.titulo ASC
                    LIMIT 10
                """
                cursor.execute(sql_filmes_populares)
                filmes_populares = cursor.fetchall()
                
                cursor.close()
                
                response_data = {
                    "generos": generos,
                    "filmes_recentes": filmes_recentes,
                    "filmes_populares": filmes_populares
                }

                self.send_response(200)
                self.send_cors_headers()
                self.send_header("Content-type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps(response_data, ensure_ascii=False).encode("utf-8"))

            except Exception as e:
                print(e)
                self.send_response(500)
                self.send_cors_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))

        # Rota API: /api/filme/{id} (Individual)
        elif re.match(r"/api/filme/(\d+)", path):
            try:
                filme_id = path.split("/")[-1]
                if not mydb.is_connected(): mydb.reconnect()
                cursor = mydb.cursor(dictionary=True)
                
                sql = """
                    SELECT 
                        f.id_filme AS id_filme, f.titulo AS nomeFilme, f.tempo_de_duracao AS tempo_duracao,
                        f.ano_de_lancamento AS ano, f.poster AS poster, f.sinopse AS sinopse, f.status AS status,
                        GROUP_CONCAT(DISTINCT g.nome SEPARATOR ', ') AS generos,
                        GROUP_CONCAT(DISTINCT a.nome SEPARATOR ', ') AS atores,
                        GROUP_CONCAT(DISTINCT CONCAT(d.nome, ' ', d.sobrenome) SEPARATOR ', ') AS diretores,
                        GROUP_CONCAT(DISTINCT l.nome SEPARATOR ', ') AS linguagens,
                        GROUP_CONCAT(DISTINCT p.nome SEPARATOR ', ') AS produtoras
                    FROM Filme f
                    LEFT JOIN Filme_genero fg ON f.id_filme = fg.id_filme
                    LEFT JOIN genero g ON fg.id_genero = g.id_genero
                    LEFT JOIN Filme_ator fa ON f.id_filme = fa.id_filme
                    LEFT JOIN Ator a ON fa.id_ator = a.id_ator
                    LEFT JOIN filme_diretor fd ON f.id_filme = fd.id_filme
                    LEFT JOIN Diretor d ON fd.id_diretor = d.id_diretor
                    LEFT JOIN filme_linguagem fl ON f.id_filme = fl.id_filme
                    LEFT JOIN linguagem l ON fl.id_linguagem = l.id_linguagem
                    LEFT JOIN filme_produtora fp ON f.id_filme = fp.id_filme
                    LEFT JOIN Produtora p ON fp.id_produtora = p.id_produtora
                    WHERE f.id_filme = %s
                    GROUP BY f.id_filme;
                """
                cursor.execute(sql, (filme_id,))
                filme = cursor.fetchone()
                cursor.close()

                if filme:
                    self.send_response(200)
                    self.send_cors_headers()
                    self.send_header("Content-type", "application/json; charset=utf-8")
                    self.end_headers()
                    self.wfile.write(json.dumps(filme, ensure_ascii=False).encode("utf-8"))
                else:
                    self.send_response(404)
                    self.send_cors_headers()
                    self.wfile.write(json.dumps({"error": "Filme não encontrado"}).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_cors_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
        
        # Rota API: /api/filmes/pendentes (Para Admin)
        elif path == "/api/filmes/pendentes":
            try:
                if not mydb.is_connected(): mydb.reconnect()
                cursor = mydb.cursor(dictionary=True)
                sql = "SELECT id_filme, titulo, ano_de_lancamento AS ano FROM Filme WHERE status = 'PENDENTE' ORDER BY id_filme DESC"
                cursor.execute(sql)
                filmes_pendentes = cursor.fetchall()
                cursor.close()
                
                self.send_response(200)
                self.send_cors_headers()
                self.send_header("Content-type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps(filmes_pendentes, ensure_ascii=False).encode("utf-8"))

            except Exception as e:
                self.send_response(500)
                self.send_cors_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))

        else:
            self.send_response(404)
            self.send_cors_headers()
            self.wfile.write(json.dumps({"error": f"Rota GET '{path}' não encontrada."}).encode("utf-8"))


    # --- Métodos POST ---
    def do_POST(self):
        path = urlparse(self.path).path
        
        def send_json_response(status_code, content):
            self.send_response(status_code)
            self.send_cors_headers()
            self.send_header("Content-type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps(content, ensure_ascii=False).encode('utf-8'))

        # Rota POST: /cadastro (Adicionar Filme)
        if path == "/cadastro":
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length).decode('utf-8')
            form_data = parse_qs(body)

            data = {
                'titulo': form_data.get('nome', [''])[0].strip(),
                'atores': form_data.get('atores', [''])[0].strip(),
                'diretor': form_data.get('diretor', [''])[0].strip(),
                'ano': form_data.get('ano', [''])[0].strip(),
                'duracao': form_data.get('duracao', [''])[0].strip() or None,
                'id_genero': form_data.get('id_genero', [''])[0].strip(),
                'produtora': form_data.get('produtora', [''])[0].strip(),
                'id_linguagem': form_data.get('id_linguagem', [''])[0].strip(),
                'poster': form_data.get('urlposter', [''])[0].strip() or None,
                'sinopse': form_data.get('sinopse', [''])[0].strip() or None,
                'userRole': form_data.get('userRole', ['comum'])[0].strip()
            }

            try:
                if not mydb.is_connected(): mydb.reconnect()
                cursor = mydb.cursor()
                
                status_filme = 'APROVADO' if data['userRole'] == 'admin' else 'PENDENTE'
                
                # Inserção na tabela Filme
                sql_filme = "INSERT INTO Filme (titulo, tempo_de_duracao, ano_de_lancamento, poster, sinopse, status) VALUES (%s, %s, %s, %s, %s, %s)"
                cursor.execute(sql_filme, (
                    data['titulo'], int(data['duracao']), int(data['ano']), 
                    data['poster'], data['sinopse'], status_filme
                ))
                id_filme = cursor.lastrowid

                self._atualizar_relacionamentos_filme(cursor, id_filme, data)

                mydb.commit() 
                cursor.close()
                send_json_response(200, {"status": "sucesso", "id": id_filme, "message": "Filme processado!"})

            except Exception as e:
                mydb.rollback()
                send_json_response(500, {"status": "erro", "message": f"Erro: {str(e)}"})

        # Rota POST: /send_login (Login Real com Banco)
        elif path == "/send_login": 
            try:
                content_length = int(self.headers['Content-Length'])
                body = self.rfile.read(content_length).decode('utf-8')
                form_data = parse_qs(body)

                login_form = form_data.get('email', [''])[0] 
                senha_form = form_data.get('password', [''])[0]

                resultado = self.accont_user(login_form, senha_form)

                if resultado["status"] == "logado":
                    send_json_response(200, {
                        "status": "sucesso", 
                        "message": "Logado!", 
                        "role": resultado["role"],
                        "nome": resultado["nome"]
                    })
                else:
                    send_json_response(401, {"status": "erro", "message": "Usuário ou senha inválidos"})
            except Exception as e:
                send_json_response(500, {"status": "erro", "message": f"Erro no servidor: {e}"})

        # Rota POST: /delete
        elif path == '/delete':
            try:
                content_length = int(self.headers['Content-Length'])
                body = self.rfile.read(content_length).decode('utf-8')
                form_data = parse_qs(body)
                filme_id = int(form_data.get('id', [None])[0])

                if not mydb.is_connected(): mydb.reconnect()
                cursor = mydb.cursor()
                
                # Deleta das tabelas de junção
                cursor.execute("DELETE FROM Filme_ator WHERE id_filme = %s", (filme_id,))
                cursor.execute("DELETE FROM Filme_genero WHERE id_filme = %s", (filme_id,))
                cursor.execute("DELETE FROM filme_diretor WHERE id_filme = %s", (filme_id,))
                cursor.execute("DELETE FROM filme_linguagem WHERE id_filme = %s", (filme_id,))
                cursor.execute("DELETE FROM filme_produtora WHERE id_filme = %s", (filme_id,))
                cursor.execute("DELETE FROM Filme_pais WHERE id_filme = %s", (filme_id,))
                
                cursor.execute("DELETE FROM Filme WHERE id_filme = %s", (filme_id,))
                
                mydb.commit() 
                cursor.close()
                send_json_response(200, {"status": "sucesso", "message": "Filme deletado."})

            except Exception as e:
                mydb.rollback() 
                send_json_response(500, {"status": "erro", "message": f"Erro: {str(e)}"})
        
        # Rota de aprovação de admin
        elif path == '/api/filme/aprovar':
             try:
                content_length = int(self.headers['Content-Length'])
                body = self.rfile.read(content_length).decode('utf-8')
                form_data = parse_qs(body)
                filme_id = int(form_data.get('id', [None])[0])

                if not mydb.is_connected(): mydb.reconnect()
                cursor = mydb.cursor()
                cursor.execute("UPDATE Filme SET status = 'APROVADO' WHERE id_filme = %s", (filme_id,))
                
                mydb.commit()
                cursor.close()
                send_json_response(200, {"status": "sucesso", "message": "Filme aprovado!"})
             except Exception as e:
                send_json_response(500, {"status": "erro", "message": str(e)})

                # Adicione este bloco dentro do do_POST no server.py

        # Rota POST: /register (Criar Conta de Usuário)
        elif path == "/register":
            try:
                content_length = int(self.headers['Content-Length'])
                body = self.rfile.read(content_length).decode('utf-8')
                form_data = parse_qs(body)

                nome = form_data.get('nome', [''])[0]
                email = form_data.get('email', [''])[0]
                senha = form_data.get('senha', [''])[0]

                # Validação básica
                if not nome or not email or not senha:
                    send_json_response(400, {"status": "erro", "message": "Dados incompletos"})
                    return

                if not mydb.is_connected(): mydb.reconnect()
                cursor = mydb.cursor()

                # Verifica se email já existe
                cursor.execute("SELECT id_usuario FROM usuarios WHERE email = %s", (email,))
                if cursor.fetchone():
                    cursor.close()
                    send_json_response(400, {"status": "erro", "message": "Email já cadastrado"})
                    return

                # Insere o usuário (definindo is_admin como 0/False por padrão)
                sql = "INSERT INTO usuarios (nome, email, senha, is_admin) VALUES (%s, %s, %s, 0)"
                cursor.execute(sql, (nome, email, senha))
                
                mydb.commit()
                cursor.close()

                send_json_response(200, {"status": "sucesso", "message": "Usuário criado com sucesso!"})

            except Exception as e:
                send_json_response(500, {"status": "erro", "message": f"Erro no servidor: {str(e)}"})

        else:
            send_json_response(404, {"status": "erro", "message": "Rota POST não encontrada."})

def main():
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, MyHandle)
    print(f"Servidor CineColab rodando em http://localhost:8000")
    httpd.serve_forever()

if __name__ == '__main__':
    main()