import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./cadastro.css";

// Componentes
import Button from "../components/Button";
import PageTitle from "./TituloPagina";
import InputField from "../components/InputField";

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
      // Tenta conectar no back (porta 8001)
      await axios.post("http://localhost:8001/api/cadastro", {
        nome,
        email,
        senha,
      });
      alert("Conta criada com sucesso!");
      navigate("/login");

    } catch (err) {
      // Se der erro, apenas mostra alerta (pode ser modo offline)
      console.error(err);
      setErro("Erro ao cadastrar. O servidor pode estar offline.");
    }
  }

  return (
    <div
      className="cadastro-container"
      style={{ "--bg": "url('/src/assets/img/Wallpaper-PerdidosNoEspaço.svg')" }}
    >
      <div className="cadastro-card">
        
        {/* Título com Gradiente */}
        <PageTitle>Criar <span>Conta</span></PageTitle>

        <form className="cadastro-form" onSubmit={cadastrar}>
          
          <InputField 
            label="Nome completo:"
            placeholder="Digite seu nome..."
            value={nome}
            onChange={setNome}
            required
          />

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
            placeholder="Crie uma senha..."
            value={senha}
            onChange={setSenha}
            required
          />

          {erro && <p style={{color: "#ff4d4d", textAlign:"center"}}>{erro}</p>}

          <div style={{ marginTop: "10px" }}>
            <Button type="submit" variant="primary" style={{ width: "100%" }}>
              Criar Conta
            </Button>
          </div>

        </form>

        <p className="cadastro-link">
          Já possui conta? <a href="/login">Fazer login</a>
        </p>
      </div>
    </div>
  );
}