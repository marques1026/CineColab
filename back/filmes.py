from database import get_connection

def adicionar_filme(dados):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO Filme (titulo, ano_de_lancamento, tempo_de_duracao, poster)
        VALUES (%s, %s, %s, %s)
    """, (
        dados["titulo"],
        dados["ano"],
        dados["duracao"],
        dados["poster"]
    ))

    conn.commit()
    conn.close()


def editar_filme(id_filme, dados):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE Filme 
        SET titulo=%s, ano_de_lancamento=%s, tempo_de_duracao=%s, poster=%s
        WHERE id_filme=%s
    """, (
        dados["titulo"],
        dados["ano"],
        dados["duracao"],
        dados["poster"],
        id_filme
    ))

    conn.commit()
    conn.close()
