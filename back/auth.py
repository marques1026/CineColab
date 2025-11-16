import bcrypt
from database import get_connection
from config import ADMIN_EMAIL, ADMIN_SENHA
from middleware import gerar_token, validar_token

def cadastrar_usuario(data):
    nome = data["nome"]
    email = data["email"]
    senha = data["senha"]

    conn = get_connection()
    cursor = conn.cursor()

    senha_hash = bcrypt.hashpw(senha.encode(), bcrypt.gensalt())

    cursor.execute(
        "INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s)",
        (nome, email, senha_hash)
    )

    conn.commit()
    conn.close()


def login_usuario(data):
    email = data["email"]
    senha = data["senha"]

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE email=%s", (email,))
    user = cursor.fetchone()

    if not user:
        return None

    senha_bd = user["senha"].encode()

    if bcrypt.checkpw(senha.encode(), senha_bd):
        token = gerar_token(user["id_usuario"])
        return {"token": token, "user": user}

    return None


def login_admin(data):
    if data["email"] == ADMIN_EMAIL and data["senha"] == ADMIN_SENHA:
        return {"token": gerar_token(0)}
    return None


def get_usuario_autenticado(handler):
    token = handler.headers.get("Authorization")
    if not token:
        return None
    return validar_token(token)
