// src/api.js
const API_BASE_URL = ""; // usa proxy do vite; em produção coloque "http://localhost:8001" ou URL real

// helper
async function doFetch(path, options = {}) {
  const resp = await fetch(`/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await resp.json().catch(() => ({}));
  return { ok: resp.ok, status: resp.status, data };
}

// Cadastro
export async function cadastrarUsuarioAPI(userData) {
  return doFetch("/cadastro", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

// Login usuário (rota /api/login)
export async function loginUsuarioAPI(credentials) {
  return doFetch("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

// Login admin
export async function loginAdminAPI(credentials) {
  return doFetch("/login_admin", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

// Filmes (listar)
export async function listarFilmesAPI() {
  return doFetch("/filmes", { method: "GET" });
}

// Adicionar filme (admin)
export async function adicionarFilmeAPI(dados, token) {
  return doFetch("/filmes/adicionar", {
    method: "POST",
    body: JSON.stringify(dados),
    headers: { Authorization: `Bearer ${token || ""}` },
  });
}
