from database import conectar
from filmes import adicionar_filme_aprovado, registrar_edicao

def aprovar(requisicao):
    db = conectar()
    cur = db.cursor()

    if requisicao["tipo"] == "adicao":
        adicionar_filme_aprovado(eval(requisicao["dados"]))

    if requisicao["tipo"] == "edicao":
        registrar_edicao(requisicao["id_filme"], requisicao["id_usuario"])

    cur.execute("UPDATE requisicoes SET status='aprovado' WHERE id=%s", (requisicao["id"],))
    db.commit()
    db.close()

def negar(req_id):
    db = conectar()
    cur = db.cursor()
    cur.execute("UPDATE requisicoes SET status='negado' WHERE id=%s", (req_id,))
    db.commit()
    db.close()
