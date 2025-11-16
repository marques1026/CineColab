// src/services/api.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8001/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// INSERE TOKEN AUTOMATICAMENTE
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;

/* =============================
        ROTAS DO SISTEMA
============================= */

// --- AUTH ---
export const cadastrarUsuarioAPI = (dados) =>
    api.post("/cadastro", dados);

export const loginUsuarioAPI = (dados) =>
    api.post("/login", dados);

export const loginAdminAPI = (dados) =>
    api.post("/login_admin", dados);

// --- REQUISIÇÕES ---
export const enviarRequisicaoAPI = (dados) =>
    api.post("/enviar_requisicao", dados);

export const listarRequisicoesAPI = () =>
    api.get("/admin/requisicoes");

export const responderRequisicaoAPI = (dados) =>
    api.post("/admin/responder", dados);

// --- FILMES ---
export const adicionarFilmeAPI = (dados) =>
    api.post("/filmes/adicionar", dados);

export const editarFilmeAPI = (dados) =>
    api.post("/filmes/editar", dados);
