from database import get_connection

def listar_filmes():
    conn = get_connection()
    cursor = conn.cursor()
    # Pega todos os filmes, ordenando do mais novo para o mais antigo (ID)
    cursor.execute("SELECT * FROM Filme ORDER BY id_filme DESC")
    filmes = cursor.fetchall()
    conn.close()
    return filmes

def adicionar_filme(dados):
    conn = get_connection()
    cursor = conn.cursor()
    
    # Insere um novo filme na tabela Filme
    cursor.execute("""
        INSERT INTO Filme (titulo, ano_de_lancamento, tempo_de_duracao, poster)
        VALUES (%s, %s, %s, %s)
    """, (
        dados["titulo"], 
        dados.get("ano_de_lancamento", 0), # Usa .get para evitar erro se faltar campo
        dados.get("tempo_de_duracao", 0),
        dados.get("poster", "")
    ))

    conn.commit()
    conn.close()

def adicionar_filme_aprovado(dados):
    """Função usada pelo sistema de requisições para adicionar filme aprovado"""
    adicionar_filme(dados)

def editar_filme(id_filme, dados):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE Filme 
        SET titulo=%s, ano_de_lancamento=%s, tempo_de_duracao=%s, poster=%s
        WHERE id_filme=%s
    """, (
        dados["titulo"], 
        dados.get("ano_de_lancamento", 0), 
        dados.get("tempo_de_duracao", 0),
        dados.get("poster", ""),
        id_filme
    ))

    conn.commit()
    conn.close()

def deletar_filme(id_filme):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Filme WHERE id_filme=%s", (id_filme,))
    conn.commit()
    conn.close()