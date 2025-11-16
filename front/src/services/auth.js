// src/services/auth.js
import { loginUsuarioAPI, cadastrarUsuarioAPI, loginAdminAPI } from "../api";

export async function loginUsuario(email, senha) {
    const resposta = await loginUsuarioAPI({ email, senha });

    if (resposta.data.ok) {
        localStorage.setItem("usuario", JSON.stringify(resposta.data.user));
        localStorage.setItem("token", resposta.data.token || "TOKEN_FIXO");
    }

    return resposta.data;
}

export async function loginAdmin(email, senha) {
    const resposta = await loginAdminAPI({ email, senha });

    if (resposta.data.ok) {
        localStorage.setItem("admin", "true");
        localStorage.setItem("token", "TOKEN_ADMIN");
    }

    return resposta.data;
}

export async function cadastrarUsuario(dados) {
    return cadastrarUsuarioAPI(dados);
}

export function getUsuario() {
    return JSON.parse(localStorage.getItem("usuario"));
}

export function logout() {
    localStorage.clear();
    window.location.href = "/login";
}
