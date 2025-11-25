import React, { useState } from "react";
import "./cadastroFilme.css";

import Navbar from "../components/Navbar";
import PageTitle from "../components/TituloPagina";
import Footer from "../components/Footer";
import MovieForm from "../components/MovieForm";

export default function CadastrarFilme() {

  const [titulo, setTitulo] = useState("");
  const [ano, setAno] = useState("");
  const [duracao, setDuracao] = useState("");
  const [diretor, setDiretor] = useState("");
  const [produtora, setProdutora] = useState("");
  const [elenco, setElenco] = useState("");
  const [genero, setGenero] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [poster, setPoster] = useState("");

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

  const cadastrarFilme = () => {
    console.log("Filme cadastrado:", {
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
          Cadastrar <span>Filme</span>
        </h1>

        <div className="editar-filme-grid">

          <div className="editar-filme-card">

            <MovieForm
              modo="create"
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
              onSubmit={cadastrarFilme}
            />

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
