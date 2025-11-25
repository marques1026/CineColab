const API_BASE_URL = "http://localhost:8000"; 

function toFormData(data) {
  const formData = new URLSearchParams();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
}

async function doFetch(path, options = {}) {
  let body = options.body;
  let headers = options.headers || {};

  if (options.method === "POST" && body && typeof body === "object") {
    body = toFormData(body);
  }

  try {
    const resp = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: headers,
      body: body,
    });
    
    const data = await resp.json().catch(() => ({}));
    return { ok: resp.ok, status: resp.status, data };
  } catch (error) {
    console.error("Erro na requisição:", error);
    return { ok: false, status: 500, data: { error: "Erro de conexão" } };
  }
}

// === ROTAS ===

// Cadastro
export async function cadastrarUsuarioAPI(userData) {
  return doFetch("/register", {
    method: "POST",
    body: userData,
  });
}

// Login
export async function loginUsuarioAPI(credentials) {
  return doFetch("/send_login", {
    method: "POST",
    body: {
      email: credentials.email,
      password: credentials.senha 
    },
  });
}

// Buscar dados da Home
export async function buscarDadosHomeAPI() {
  return doFetch("/api/home", { method: "GET" });
}

// Detalhes do Filme
export async function getFilmeDetalhesAPI(id) {
  return doFetch(`/api/filme/${id}`, { method: "GET" });
}