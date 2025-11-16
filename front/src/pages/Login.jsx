import React, { useState } from "react";
import "./login.css";
import { loginUsuario } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function fazerLogin(e) {
    e.preventDefault();

    const result = await loginUsuario({ email, senha });

    if (result.ok) {
      login(result.user);
      window.location.href = "/home";
    } else {
      alert("Login inválido");
    }
  }

  return (
    <div
      className="login-container"
      style={{
        "--bg": "url('/src/assets/img/Wallpaper-PerdidosNoEspaço.svg')",
      }}
    >
      <div className="login-card">
        <h1 className="login-title">Bem-Vindo(a)!</h1>

        <form className="login-form" onSubmit={fazerLogin}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Digite seu email aqui..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Senha:</label>
            <input
              type="password"
              placeholder="Digite sua senha aqui..."
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button className="btn-login">Fazer Login</button>
        </form>

        <div className="login-divider">ou</div>

        <p className="login-link">
          Não tem uma conta?
          <a href="/cadastro"> Criar conta</a>
        </p>
      </div>
    </div>
  );
}
