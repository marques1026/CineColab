import React, { useRef } from "react";
import "./home.css";

import CardFilmes from "../components/CardFilmes";

import LogoAvatar from "../assets/img/LogoAvatar.svg";
import AvatarEscuro from "../assets/img/AvatarEscuro.svg";



export default function Home({ filmes = [] }) {

  const maisAssistidosRef = useRef(null);
  const adicionadosRef = useRef(null);
  const suaListaRef = useRef(null);

  const scrollLeft = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <div className="home-container">


      <div
        className="hero-banner"
        style={{ backgroundImage: `url(${AvatarEscuro})` }}
      >
        <div className="hero-info">

          <img
            src={LogoAvatar}
            alt="Avatar Logo"
            className="hero-logo"
          />

          <p className="hero-description">
            2017 • 3h 12min • Sci-fi, Fantasia  
            <br />
            Os Caminhantes da Água retornam para defender Pandora de uma nova ameaça.
          </p>

          <div className="hero-buttons">
            <button className="btn-hero-detalhes">Ver Detalhes</button>
            <button className="btn-hero-lista">Adicionar à Lista</button>
          </div>

        </div>
      </div>


      <div className="home-content">

        {/* ===== FILMES MAIS ASSISTIDOS ===== */}
        <section className="secao-filmes">
          <h3 className="secao-titulo">Mais Assistidos</h3>

          <button className="carrossel-btn left" onClick={() => scrollLeft(maisAssistidosRef)}>
            &#10094;
          </button>

          <div className="carrossel" ref={maisAssistidosRef}>
            {filmes.map((filme) => (
              <CardFilmes key={filme.id} filme={filme} />
            ))}
          </div>

          <button className="carrossel-btn right" onClick={() => scrollRight(maisAssistidosRef)}>
            &#10095;
          </button>
        </section>

        {/* ===== ADICIONADOS POR VOCÊ ===== */}
        <section className="secao-filmes">
          <h3 className="secao-titulo">Adicionados por Você</h3>

          <button className="carrossel-btn left" onClick={() => scrollLeft(adicionadosRef)}>
            &#10094;
          </button>

          <div className="carrossel" ref={adicionadosRef}>
            {filmes.map((filme) => (
              <CardFilmes key={filme.id} filme={filme} />
            ))}
          </div>

          <button className="carrossel-btn right" onClick={() => scrollRight(adicionadosRef)}>
            &#10095;
          </button>
        </section>

        {/* ===== SUA LISTA ===== */}
        <section className="secao-filmes">
          <h3 className="secao-titulo">Sua Lista</h3>

          <button className="carrossel-btn left" onClick={() => scrollLeft(suaListaRef)}>
            &#10094;
          </button>

          <div className="carrossel" ref={suaListaRef}>
            {filmes.map((filme) => (
              <CardFilmes key={filme.id} filme={filme} />
            ))}
          </div>

          <button className="carrossel-btn right" onClick={() => scrollRight(suaListaRef)}>
            &#10095;
          </button>
        </section>

      </div>
    </div>
  );
}
