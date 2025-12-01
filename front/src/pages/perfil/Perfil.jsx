import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";
import "../../pages/perfil/perfil.css"
import { useAuth } from "../../context/AuthContext";

export default function Perfil() {

  const { usuario } = useAuth();

  return (
    <div className="perfil-container">

      <Navbar />

      <div className="perfil-content">

        <h1 className="perfil-title">
          Per<span>fil</span>
        </h1>

        <div className="perfil-grid">

          {/* CARD ESQUERDO */}
          <div className="perfil-left-card">
            <h2 className="perfil-name">
              {usuario?.nome ?? "Usuário"}
            </h2>

            <div className="perfil-photo-circle"></div>
          </div>

          {/* CARD DIREITO */}
          <div className="profile-info-card">

            <h2 className="info-title">Informações da Conta</h2>

            <div className="info-grid">

              <div className="info-item">
                <span className="info-label">Nome</span>
                <span className="info-value">{usuario?.nome}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{usuario?.email}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Data de Cadastro</span>
                <span className="info-value">{usuario?.dataCadastro || "—"}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Requisições</span>
                <span className="info-value">{usuario?.totalRequisicoes ?? 0}</span>
              </div>

            </div>
          </div>
        </div>

        {/* BOTÕES */}
        <div className="perfil-buttons">
          <Button variant="outline" onClick={() => window.history.back()}>
            Voltar
          </Button>

          <div className="perfil-buttons-right">
            <Button variant="primary">Minhas Requisições</Button>
            <Button variant="primary">Ver Minha Lista</Button>
            <Button variant="primary">Adicionar Filme</Button>
            <Button variant="primary">Filmes Adicionados</Button>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
