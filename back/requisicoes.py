from database import get_connection
from filmes import adicionar_filme, editar_filme
from historico import registrar_edicao
import json

def criar_requisicao(id_usuario, tipo, id_filme, dados):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO requisicoes (id_usuario, tipo, id_filme, dados)
        VALUES (%s, %s, %s, %s)
    """, (id_usuario, tipo, id_filme, json.dumps(dados)))

    conn.commit()
    conn.close()


def listar_requisicoes():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM requisicoes")
    req = cursor.fetchall()

    conn.close()
    return req


def responder_requisicao(id_req, status):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM requisicoes WHERE id_requisicao=%s", (id_req,))
    req = cursor.fetchone()

    if not req:
        return

    cursor.execute("UPDATE requisicoes SET status=%s WHERE id_requisicao=%s", (status, id_req))

    # se aprovado → executar ação
    if status == "aprovado":
        dados = json.loads(req["dados"])

        if req["tipo"] == "adicionar":
            adicionar_filme(dados)

        elif req["tipo"] == "editar":
            editar_filme(req["id_filme"], dados)

            registrar_edicao(
                req["id_filme"],
                req["id_usuario"],
                json.dumps(dados)
            )

    conn.commit()
    conn.close()
