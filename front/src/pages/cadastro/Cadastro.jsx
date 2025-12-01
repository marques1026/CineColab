import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cadastro.css";

import { cadastrarUsuario } from "../../services/auth";

// Componentes
import Button from "../../components/button/Button";
import PageTitle from "../../components/titulo/TituloPagina";
import InputField from "../../components/input/InputField";

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
      const result = await cadastrarUsuario({ nome, email, senha });
      
      console.log("Resultado do cadastro:", result); 


      if (result && result.ok) {
        alert("Conta criada com sucesso!");
        navigate("/login");
      } else {
        setErro(result?.message || "Erro ao criar conta. Tente novamente.");
      }

    } catch (error) {
      console.error("Erro crítico:", error);
      setErro("Erro inesperado no sistema.");
    }
  }

  return (
    <div
      className="cadastro-container"
      style={{ "--bg": "url('/src/assets/img/Wallpaper-PerdidosNoEspaço.svg')" }}
    >
      <div className="cadastro-card">
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

          {erro && <p style={{color: "#ff4d4d", textAlign:"center", fontSize:"14px"}}>{erro}</p>}

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