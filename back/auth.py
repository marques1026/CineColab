import bcrypt
from database import get_connection
from config import ADMIN_EMAIL, ADMIN_SENHA
from middleware import gerar_token

def cadastrar_usuario(data):
    # Verifica se os dados chegaram
    if not data or "nome" not in data or "email" not in data or "senha" not in data:
        raise Exception("Dados incompletos. Envie nome, email e senha.")

    nome = data["nome"]
    email = data["email"]
    senha = data["senha"]

    conn = get_connection()
    # Usa dictionary=True para facilitar leitura se precisar
    cursor = conn.cursor() 

    # Criptografa a senha
    senha_hash = bcrypt.hashpw(senha.encode(), bcrypt.gensalt())

    try:
        cursor.execute(
            "INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s)",
            (nome, email, senha_hash)
        )
        conn.commit() # <--- O PULO DO GATO: FALTAVA ISSO AQUI!
    except Exception as e:
        conn.rollback()
        conn.close()
        # Se for erro de email duplicado, avisa
        if "Duplicate entry" in str(e):
            raise Exception("Email já cadastrado.")
        raise e # Relança outros erros
    
    conn.close()

def login_usuario(data):
    email = data["email"]
    senha = data["senha"]

    conn = get_connection()
    cursor = conn.cursor(dictionary=True) # Importante para acessar por nome

    cursor.execute("SELECT * FROM usuarios WHERE email=%s", (email,))
    user = cursor.fetchone()
    conn.close()

    if not user:
        return None

    # Verifica senha (senha do banco está em bytes ou string, precisa ajustar)
    senha_bd = user["senha"]
    if isinstance(senha_bd, str):
        senha_bd = senha_bd.encode()

    if bcrypt.checkpw(senha.encode(), senha_bd):
        token = gerar_token(user["id_usuario"])
        return {"token": token, "user": {"id": user["id_usuario"], "nome": user["nome"], "email": user["email"]}}

    return None

def login_admin(data):
    if data["email"] == ADMIN_EMAIL and data["senha"] == ADMIN_SENHA:
        # Gera um token fake ou real para admin
        return {"token": gerar_token(9999), "user": {"nome": "Administrador", "is_admin": True}}
    return None