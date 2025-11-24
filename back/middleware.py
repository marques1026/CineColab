import jwt
from config import SECRET_KEY

def gerar_token(user_id):
    return jwt.encode({"id": user_id}, SECRET_KEY, algorithm="HS256")

def validar_token(token):
    try:
        dados = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return dados["id"]
    except:
        return None
