import React from "react";
import "./detalheFilme.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";

// Ícones
import { Calendar, Globe, Clock, Video, Plus, Play, ChevronLeft, ChevronRight } from "lucide-react";

import AvatarPoster from "../../assets/img/Avatar.svg"
import LogoAvatar from '../../assets/img/LogoAvatar.svg'

export default function MovieDetails() {
  return (
    <div className="movie-details-page">
      <Navbar />

      {/* BANNER COM SOBREPOSIÇÃO */}
      <div className="movie-banner">
        <img src={AvatarPoster} alt="Avatar Poster" className="movie-banner-img" />
        
        <div className="movie-banner-overlay">
          <img src={LogoAvatar} alt="Avatar Logo" className="movie-logo-hero" />
          
          <div className="movie-banner-buttons">
            {/* Botão + (Mantive a classe customizada para o efeito de vidro quadrado) */}
            <Button className="btn-icon-only">
              <Plus size={24} />
            </Button>

            {/* Botão Assistir (Usando variant primary do seu componente) */}
            {/* Adicionei um style inline flex gap apenas para garantir alinhamento do ícone se seu botão não tiver nativamente */}
            <Button variant="primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Play size={18} fill="currentColor" /> 
              Assistir Trailer
            </Button>
          </div>
        </div>
      </div>

      <div className="movie-content-grid">

        {/* DESCRIÇÃO */}
        <div className="glass-card movie-description-card">
          <h3 className="section-title">Descrição</h3>
          <p className="movie-description-text">
            Após formar uma família, Jake Sully e Ney'tiri fazem de tudo para ficarem juntos. 
            No entanto, eles devem sair de casa e explorar as regiões de Pandora quando uma 
            antiga ameaça ressurge, e Jake deve travar uma guerra difícil contra os humanos.
          </p>
        </div>

        {/* INFORMAÇÕES TÉCNICAS */}
        <div className="glass-card movie-info-card">
          
          <div className="info-row">
            <Calendar size={20} className="info-icon" />
            <div className="info-content">
              <span className="info-label">Lançado em</span>
              <span className="info-value">2022</span>
            </div>
          </div>

          <div className="info-row">
            <Globe size={20} className="info-icon" />
            <div className="info-content">
              <span className="info-label">Linguagens Disponíveis</span>
              <div className="language-tags">
                <span className="lang-tag">Inglês</span>
                <span className="lang-tag">Português</span>
                <span className="lang-tag">Espanhol</span>
              </div>
            </div>
          </div>

          <div className="info-row">
            <Clock size={20} className="info-icon" />
            <div className="info-content">
              <span className="info-label">Tempo de Duração</span>
              <span className="info-value">3h12min</span>
            </div>
          </div>

          <div className="info-row">
            <Video size={20} className="info-icon" />
            <div className="info-content">
              <span className="info-label">Produtora</span>
              <span className="info-value">Lightstorm Entertainment</span>
            </div>
          </div>

        </div>

        {/* ELENCO */}
        <div className="glass-card movie-cast-card">
          <div className="cast-header">
            <h3 className="section-title" style={{marginBottom: 0}}>Elenco Principal</h3>
            <div className="cast-nav">
                <button className="nav-btn"><ChevronLeft size={18}/></button>
                <button className="nav-btn"><ChevronRight size={18}/></button>
            </div>
          </div>

          <div className="cast-list">
            <div className="cast-item"></div>
            <div className="cast-item"></div>
            <div className="cast-item"></div>
            <div className="cast-item"></div>
            <div className="cast-item"></div>
            <div className="cast-item"></div>
          </div>
        </div>

      </div>

      {/* BOTÕES INFERIORES */}
      <div className="movie-bottom-buttons">
        <Button variant="outline">Voltar</Button>
        <Button variant="primary">Editar Filme</Button>
      </div>

      <Footer />
    </div>
  );
}