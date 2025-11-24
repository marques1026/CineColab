from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import traceback

# Importações dos seus arquivos
from utils import json_response
from auth import cadastrar_usuario, login_usuario, login_admin, get_usuario_autenticado
from requisicoes import criar_requisicao, listar_requisicoes, responder_requisicao

class Server(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        # Configuração CORS (Permite que o Front-end fale com o Back-end)
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_POST(self):
        try:
            # Lê o corpo da requisição
            length = int(self.headers["Content-Length"])
            data = json.loads(self.rfile.read(length).decode())

            # === ROTA: CADASTRO ===
            if self.path == "/api/cadastro":
                try:
                    cadastrar_usuario(data) # Chama a função do auth.py
                    return json_response(self, 201, {"message": "Usuário criado com sucesso!", "ok": True})
                except Exception as e:
                    print(f"Erro ao cadastrar: {e}")
                    # Retorna erro 400 ou 500 para o front saber que falhou
                    if "Duplicate entry" in str(e):
                        return json_response(self, 409, {"error": "Este email já está cadastrado."})
                    return json_response(self, 500, {"error": str(e)})

            # === ROTA: LOGIN ===
            if self.path == "/api/login":
                resp = login_usuario(data)
                if resp:
                    return json_response(self, 200, resp)
                return json_response(self, 401, {"error": "Email ou senha incorretos"})

            # === ROTA: LOGIN ADMIN ===
            if self.path == "/api/login_admin":
                resp = login_admin(data)
                if resp:
                    return json_response(self, 200, resp)
                return json_response(self, 401, {"error": "Credenciais de administrador inválidas"})

            # === ROTA: ENVIAR REQUISIÇÃO ===
            if self.path == "/api/enviar_requisicao":
                user_id = get_usuario_autenticado(self) # Pega o ID do token
                if not user_id:
                    return json_response(self, 403, {"error": "Token inválido ou ausente"})

                criar_requisicao(user_id, data["tipo"], data.get("id_filme"), data["dados"])
                return json_response(self, 200, {"ok": True})

            # === ROTA: ADMIN RESPONDE ===
            if self.path == "/api/admin/responder":
                responder_requisicao(data["id_requisicao"], data["status"])
                return json_response(self, 200, {"ok": True})

            # Se nenhuma rota bater:
            json_response(self, 404, {"error": "Rota não encontrada"})

        except Exception as e:
            print("Erro no servidor:", e)
            traceback.print_exc()
            json_response(self, 500, {"error": "Erro interno do servidor"})

    def do_GET(self):
        # === ROTA: LISTAR REQUISIÇÕES (ADMIN) ===
        if self.path == "/api/admin/requisicoes":
            req = listar_requisicoes()
            return json_response(self, 200, req)

        json_response(self, 404, {"error": "Rota não encontrada"})

def run():
    # AVISO: O servidor rodará na porta 8001
    print(" Servidor rodando em http://localhost:8001")
    httpd = HTTPServer(("localhost", 8001), Server)
    httpd.serve_forever()

if __name__ == "__main__":
    run()