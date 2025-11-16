import React from "react";
import "./detalheFilme.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";


// IMPORTA OS ARQUIVOS DO AVATAR
import AvatarPoster from "../assets/img/Avatar.svg"
import LogoAvatar from "../assets/img/LogoAvatar.svg";

export default function MovieDetails() {
  return (
    <div className="movie-details-page">
      <Navbar />

      {/* LOGO DO FILME CENTRALIZADA */}
      <div className="movie-logo-container">
        <img src={LogoAvatar} alt="Avatar Logo" className="movie-logo" />
      </div>

      {/* POSTER DO FILME */}
      <div className="movie-banner">
        <img src={AvatarPoster} alt="Avatar Poster" className="movie-banner-img" />

        <div className="movie-banner-buttons">
          <Button variant="primary">+ Minha Lista</Button>
          <Button variant="primary">▶ Assistir Trailer</Button>
        </div>
      </div>

      {/* RESTO IGUAL */}
      <div className="movie-content-grid">

        <div className="movie-description-card">
          <h3 className="section-title">Descrição</h3>
          <p className="movie-description-text">
            Após formar uma família, Jake Sully e Neytiri fazem de tudo para ficarem juntos.
            No entanto, eles devem sair de casa e explorar as regiões de Pandora quando uma
            antiga ameaça ressurge, e Jake deve travar uma guerra difícil contra os humanos.
          </p>
        </div>

        <div className="movie-info-card">
          <div className="info-item">
            <span className="info-label">Lançado em</span>
            <span className="info-value">2022</span>
          </div>

          <div className="info-item">
            <span className="info-label">Linguagens Disponíveis</span>
            <span className="info-value">Inglês • Português • Espanhol</span>
          </div>

          <div className="info-item">
            <span className="info-label">Tempo de Duração</span>
            <span className="info-value">3h12min</span>
          </div>

          <div className="info-item">
            <span className="info-label">Produtora</span>
            <span className="info-value">Lightstorm Entertainment</span>
          </div>
        </div>

        <div className="movie-cast-card">
          <h3 className="section-title">Elenco Principal</h3>

          <div className="cast-list">
            <div className="cast-item"></div>
            <div className="cast-item"></div>
            <div className="cast-item"></div>
            <div className="cast-item"></div>
            <div className="cast-item"></div>
          </div>

          <div className="cast-pagination">
            <button className="circle-btn">←</button>
            <button className="circle-btn">→</button>
          </div>
        </div>

      </div>

      <div className="movie-bottom-buttons">
        <Button variant="outline">Voltar</Button>
        <Button variant="primary">Editar Filme</Button>
      </div>

      <Footer />
    </div>
  );
}

