import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { loginUsuario } from "../services/auth";
import { useAuth } from "../context/AuthContext";

// Componentes
import Button from "../components/Button";
import PageTitle from "../components/TituloPagina";
import InputField from "../components/InputField";

export default function Login() {
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

 async function fazerLogin(e) {
  e.preventDefault();
  setErro("");

  const result = await loginUsuario({ email, senha });

  if (result.ok) {
    login(result.user);
    navigate("/home");
  } else {
    setErro(result.message || "Email ou senha incorretos.");
  }
}

  return (
    <div className="login-container" style={{ "--bg": "url('/src/assets/img/Wallpaper-PerdidosNoEspaço.svg')" }}>
      <div className="login-card">
        <PageTitle>Bem-<span>Vindo(a)!</span></PageTitle>

        <form className="login-form" onSubmit={fazerLogin}>
          <InputField 
            label="Email:"
            type="email"
            placeholder="Digite seu email..."
            value={email}
            onChange={setEmail}
            required
          />

          <InputField 
            label="Senha:"
            type="password"
            placeholder="Digite sua senha..."
            value={senha}
            onChange={setSenha}
            required
          />

          {erro && <p style={{color: "#ff4d4d", textAlign: "center"}}>{erro}</p>}

          <div style={{ marginTop: "10px" }}>
            <Button type="submit" variant="primary" style={{ width: "100%" }}>
              Fazer Login
            </Button>
          </div>
        </form>

        <p className="login-link">
          Não tem uma conta? <a href="/">Criar agora</a>
        </p>
      </div>
    </div>
  );
}