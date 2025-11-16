from http.server import HTTPServer, BaseHTTPRequestHandler
import json

from utils import json_response
from auth import cadastrar_usuario, login_usuario, login_admin, get_usuario_autenticado
from requisicoes import criar_requisicao, listar_requisicoes, responder_requisicao


class Server(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_POST(self):
        length = int(self.headers["Content-Length"])
        data = json.loads(self.rfile.read(length).decode())

        # CADASTRO
        if self.path == "/api/cadastro":
            cadastrar_usuario(data)
            return json_response(self, 200, {"ok": True})

        # LOGIN
        if self.path == "/api/login":
            resp = login_usuario(data)
            if resp:
                return json_response(self, 200, resp)
            return json_response(self, 401, {"error": "Login inválido"})

        # LOGIN ADMIN
        if self.path == "/api/login_admin":
            resp = login_admin(data)
            if resp:
                return json_response(self, 200, resp)
            return json_response(self, 401, {"error": "Admin inválido"})

        # ENVIAR REQUISIÇÃO
        if self.path == "/api/enviar_requisicao":
            user_id = get_usuario_autenticado(self)
            if not user_id:
                return json_response(self, 403, {"error": "Não autorizado"})

            criar_requisicao(user_id, data["tipo"], data.get("id_filme"), data["dados"])
            return json_response(self, 200, {"ok": True})

        # ADMIN RESPONDE
        if self.path == "/api/admin/responder":
            responder_requisicao(data["id_requisicao"], data["status"])
            return json_response(self, 200, {"ok": True})

        json_response(self, 404, {"error": "Rota não encontrada"})

    def do_GET(self):

        if self.path == "/api/admin/requisicoes":
            req = listar_requisicoes()
            return json_response(self, 200, req)

        json_response(self, 404, {"error": "Rota não encontrada"})


def run():
    print("Servidor rodando em http://localhost:8001")
    httpd = HTTPServer(("localhost", 8001), Server)
    httpd.serve_forever()


if __name__ == "__main__":
    run()
