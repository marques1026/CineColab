// src/services/auth.js
import { loginUsuarioAPI, cadastrarUsuarioAPI } from "../api"; 

export async function loginUsuario({ email, senha }) {
  const resp = await loginUsuarioAPI({ email, senha });
  
  if (resp.ok && resp.data && resp.data.status === "sucesso") {
    const usuarioData = {
      nome: resp.data.nome,
      email: email,
      role: resp.data.role 
    };

    localStorage.setItem("usuario", JSON.stringify(usuarioData));
    return { ok: true, user: usuarioData };
  }
  
  return { ok: false, message: resp.data.message || "Erro ao logar" };
}

export async function cadastrarUsuario(dados) {
  const resp = await cadastrarUsuarioAPI(dados);
  if (resp.ok) return { ok: true, ...resp.data };
  return { ok: false, message: resp.data.message || "Erro ao cadastrar" };
}

export function getUsuario() {
  try {
    return JSON.parse(localStorage.getItem("usuario"));
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "/login";
}
