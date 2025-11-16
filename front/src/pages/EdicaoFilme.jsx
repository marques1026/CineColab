import React, { useState } from "react";
import "./edicaoFilme.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HistoricoEdicoes from "../components/HistoricoEdicoes";
import MovieForm from "../components/MovieForm";

export default function EdicaoFilme() {
  // ESTADOS
  const [titulo, setTitulo] = useState("");
  const [ano, setAno] = useState("");
  const [duracao, setDuracao] = useState("");
  const [diretor, setDiretor] = useState("");
  const [produtora, setProdutora] = useState("");
  const [elenco, setElenco] = useState("");
  const [genero, setGenero] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [poster, setPoster] = useState("");

  // FUNÇÕES
  const limparTudo = () => {
    setTitulo("");
    setAno("");
    setDuracao("");
    setDiretor("");
    setProdutora("");
    setElenco("");
    setGenero("");
    setSinopse("");
    setPoster("");
  };

  const enviarRequisicao = () => {
    console.log("Requisição enviada:", {
      titulo,
      ano,
      duracao,
      diretor,
      produtora,
      elenco,
      genero,
      sinopse,
      poster
    });
  };

  return (
    <div className="editar-filme-container">
      <Navbar />

      <div className="editar-filme-content">
        <h1 className="editar-filme-title">
          Editar <span>Filme</span>
        </h1>

        <div className="editar-filme-grid">

          <div className="editar-filme-card">

            <MovieForm
              modo="edit"
              titulo={titulo} setTitulo={setTitulo}
              ano={ano} setAno={setAno}
              duracao={duracao} setDuracao={setDuracao}
              diretor={diretor} setDiretor={setDiretor}
              produtora={produtora} setProdutora={setProdutora}
              elenco={elenco} setElenco={setElenco}
              genero={genero} setGenero={setGenero}
              sinopse={sinopse} setSinopse={setSinopse}
              poster={poster} setPoster={setPoster}
              onClear={limparTudo}
              onSubmit={enviarRequisicao}
            />

          </div>

          <div className="editar-historico-card">
            <h3 className="historico-title">Histórico de edições</h3>
            <HistoricoEdicoes />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
