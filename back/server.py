from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import traceback

from utils import json_response
from auth import cadastrar_usuario, login_usuario, login_admin

from requisicoes import criar_requisicao, listar_requisicoes, responder_requisicao

try:
    from filmes import listar_filmes, adicionar_filme, editar_filme, deletar_filme
except ImportError:
    listar_filmes = None

class Server(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        # Configuração para o Front-end conseguir acessar (CORS)
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def parse_body(self):
        length = int(self.headers.get("Content-Length", 0))
        if length == 0:
            return {}
        return json.loads(self.rfile.read(length).decode())

    def do_POST(self):
        try:
            data = self.parse_body()
            print(f"📩 POST recebido em {self.path} | Dados: {data}") 

            # === ROTA: CADASTRO ===
            if self.path == "/api/cadastro":
                cadastrar_usuario(data) # Chama a função do auth.py
                return json_response(self, 201, {"ok": True, "message": "Usuário criado!"})

            # === ROTA: LOGIN ===
            if self.path == "/api/login":
                resp = login_usuario(data)
                if resp:
                    return json_response(self, 200, resp)
                return json_response(self, 401, {"error": "Email ou senha incorretos"})

            # === ROTA: LOGIN ADMIN ===
            if self.path == "/api/login_admin":
                resp = login_admin(data)
                if resp:
                    return json_response(self, 200, resp)
                return json_response(self, 401, {"error": "Credenciais inválidas"})

            # --- AS ROTAS DE REQUISIÇÕES FORAM DESATIVADAS TEMPORARIAMENTE ---
            # if self.path == "/api/enviar_requisicao": ...
            # if self.path == "/api/admin/responder": ...

            return json_response(self, 404, {"error": "Rota POST não encontrada"})

        except Exception as e:
            print("❌ ERRO NO SERVIDOR:")
            traceback.print_exc()
            return json_response(self, 500, {"error": str(e)})

    def do_GET(self):
        print(f"🔎 GET recebido em {self.path}")
        
        # === ROTA: LISTAR FILMES ===
        if self.path == "/api/filmes":
            if listar_filmes:
                filmes = listar_filmes()
                return json_response(self, 200, filmes)
            else:
                return json_response(self, 503, {"error": "Módulo de filmes indisponível"})

        return json_response(self, 404, {"error": "Rota GET não encontrada"})

def run():
    # Porta 8001 para bater com o seu Front-end
    PORT = 8001
    print(f"🔥 Servidor rodando em http://localhost:{PORT}")
    server = HTTPServer(("localhost", PORT), Server)
    server.serve_forever()

if __name__ == "__main__":
    run()