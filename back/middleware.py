import jwt
from config import SECRET_KEY

def gerar_token(id_usuario):
    return jwt.encode({"id_usuario": id_usuario}, SECRET_KEY, algorithm="HS256")

def validar_token(token):
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return data["id_usuario"]
    except:
        return None
