import React from "react";
import "./filmesAdicionados.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button"; 

// dados fictícios 
const mockFilmes = Array(10).fill({
  id: 1,
  titulo: "Monstros S.A",
  poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop"
});

export default function FilmesAdicionados() {
  return (
    <div className="adicionados-page">
      <Navbar />

      <div className="content-wrapper">
        
        {/* CONTAINER DE VIDRO CENTRAL */}
        <div className="glass-container">
          
          <div className="header-section">
            <h2 className="titulo-pagina">
              Filmes <span className="destaque-gradiente">adicionados por você</span>
            </h2>
            <div className="divisor-line"></div>
          </div>

          {/* GRID DE FILMES */}
          <div className="grid-filmes">
            {mockFilmes.map((filme, index) => (
              <div key={index} className="card-filme-edit">
                <div className="poster-wrapper">
                  <img src={filme.poster} alt={filme.titulo} />
                  <div className="overlay-gradient"></div>
                  <span className="filme-logo-text">{filme.titulo}</span>
                </div>
                
                <div className="card-actions">
                  <button className="btn-editar-card">Editar</button>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="bottom-buttons">
            <Button variant="outline">Voltar</Button>
            <Button variant="primary">Adicionar Filme</Button>
        </div>

      </div>

      <Footer />
    </div>
  );
}