import json
from database import get_connection

def criar_requisicao(id_usuario, tipo, id_filme, dados):
    conn = get_connection()
    cursor = conn.cursor()

    # Converte o dicionário de dados do filme para texto JSON para salvar no banco
    dados_json = json.dumps(dados)

    try:
        cursor.execute(
            """
            INSERT INTO requisicoes (id_usuario, tipo, id_filme, dados)
            VALUES (%s, %s, %s, %s)
            """,
            (id_usuario, tipo, id_filme, dados_json)
        )
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()

def listar_requisicoes():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    
    # Traz as requisições e o nome de quem pediu
    query = """
        SELECT r.*, u.nome as nome_usuario 
        FROM requisicoes r
        JOIN usuarios u ON r.id_usuario = u.id_usuario
        WHERE r.status = 'pendente'
        ORDER BY r.data_criacao DESC
    """
    cursor.execute(query)
    requisicoes = cursor.fetchall()
    
    # Converte a string JSON de volta para objeto Python
    for req in requisicoes:
        if req["dados"]:
            req["dados"] = json.loads(req["dados"])
            
    conn.close()
    return requisicoes

def responder_requisicao(id_requisicao, novo_status):
    conn = get_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            "UPDATE requisicoes SET status = %s WHERE id_requisicao = %s",
            (novo_status, id_requisicao)
        )
        conn.commit()
    finally:
        conn.close()