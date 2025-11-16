import React, { useState } from "react";
import "./cadastro.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/Button.css"

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  async function cadastrar(e) {
    e.preventDefault();
    setErro("");

    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      await axios.post("http://localhost:8001/api/cadastro", {
        nome,
        email,
        senha,
      });

      alert("Conta criada com sucesso!");
      navigate("/login");

    } catch (err) {
      setErro("Erro ao cadastrar. Tente novamente.");
    }
  }

  return (
    <div
      className="cadastro-container"
      style={{
        "--bg": "url('/src/assets/img/Wallpaper-PerdidosNoEspaço.svg')",
      }}
    >
      <div className="cadastro-card">

        <h1 className="cadastro-title">Criar Conta</h1>

        <form className="cadastro-form" onSubmit={cadastrar}>

          <div className="input-group">
            <label>Nome completo:</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome..."
              required
            />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email..."
              type="email"
              required
            />
          </div>

          <div className="input-group">
            <label>Senha:</label>
            <input
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Crie uma senha..."
              type="password"
              required
            />
          </div>

          {erro && <p className="cadastro-error">{erro}</p>}

          <button className="btn-cadastro" type="submit">
            Criar Conta
          </button>

        </form>

        <p className="cadastro-link">
          Já possui conta?
          <a href="/login"> Fazer login</a>
        </p>
      </div>
    </div>
  );
}
