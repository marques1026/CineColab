from database import get_connection

def registrar_edicao(id_filme, id_usuario, alteracoes):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO historico_edicoes (id_filme, id_usuario, alteracoes) VALUES (%s, %s, %s)",
        (id_filme, id_usuario, alteracoes)
    )
    conn.commit()
    conn.close()
