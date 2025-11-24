// src/services/auth.js
import { loginUsuarioAPI, cadastrarUsuarioAPI, loginAdminAPI } from "../api";

export async function loginUsuario({ email, senha }) {
  const resp = await loginUsuarioAPI({ email, senha });
  if (resp.ok && resp.data && resp.data.token) {
    localStorage.setItem("token", resp.data.token);
    localStorage.setItem("usuario", JSON.stringify(resp.data.user || null));
    return { ok: true, ...resp.data };
  }
  return { ok: false, status: resp.status, ...resp.data };
}

export async function loginAdmin({ email, senha }) {
  const resp = await loginAdminAPI({ email, senha });
  if (resp.ok && resp.data && resp.data.token) {
    localStorage.setItem("token", resp.data.token);
    localStorage.setItem("admin", "true");
    return { ok: true, ...resp.data };
  }
  return { ok: false, status: resp.status, ...resp.data };
}

export async function cadastrarUsuario(dados) {
  const resp = await cadastrarUsuarioAPI(dados);
  if (resp.ok) return { ok: true, ...resp.data };
  return { ok: false, status: resp.status, ...resp.data };
}

export function getUsuario() {
  try {
    return JSON.parse(localStorage.getItem("usuario"));
  } catch {
    return null;
  }
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAdmin() {
  return localStorage.getItem("admin") === "true";
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  localStorage.removeItem("admin");
  window.location.href = "/login";
}
