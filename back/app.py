from http.server import BaseHTTPRequestHandler, HTTPServer
from models import get_all_filmes

class CineColabServer(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path == "/filmes":
            filmes = get_all_filmes()

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()

            import json
            self.wfile.write(json.dumps(filmes).encode())
            return

        self.send_response(404)
        self.wfile.write(b"Rota inexistente")

def run():
    server = HTTPServer(("localhost", 5000), CineColabServer)
    print("🔥 Servidor rodando em http://localhost:5000")
    server.serve_forever()

if __name__ == "__main__":
    run()
