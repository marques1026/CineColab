import React, { useRef, useEffect, useState } from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import CardFilmes from "../../components/card/CardFilmes"
import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import AvatarEscuro from "../../assets/img/AvatarEscuro.svg";
import LogoAvatar from "../../assets/img/LogoAvatar.svg"
import { buscarDadosHomeAPI } from "../../api"; 

export default function Home() {
  const [listas, setListas] = useState({
    recentes: [],
    populares: [],
    generos: []
  });
  const [loading, setLoading] = useState(true);

  const maisAssistidosRef = useRef(null);
  const adicionadosRef = useRef(null);
  const suaListaRef = useRef(null);

  useEffect(() => {
    async function carregarFilmes() {
      try {
        const resp = await buscarDadosHomeAPI();
        if (resp && resp.data) {
          setListas({
            recentes: resp.data.filmes_recentes || [],
            populares: resp.data.filmes_populares || [],
            generos: resp.data.generos || []
          });
        }
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarFilmes();
  }, []);

  const scrollLeft = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  if (loading) return <div style={{color:'white', padding:'50px'}}>Carregando filmes...</div>;

  return (
    <div className="home-container">
      
      <div
        className="hero-banner"
        style={{ backgroundImage: `url(${AvatarEscuro})` }}
      >
        <Navbar />

        <div className="hero-overlay">
          <div className="hero-info">
            <img src={LogoAvatar} alt="Avatar Logo" className="hero-logo" />
            
            <div className="hero-meta">
              <span>2017</span>
              <span className="dot">•</span>
              <span>5 Temporadas</span>
              <span className="dot">•</span>
              <span className="tag-4k">4K</span>
            </div>

            <p className="hero-description">
              Oito ladrões se trancam com reféns na Casa da Moeda da Espanha. 
              Seu líder manipula a polícia para realizar um plano...
            </p>

            <div className="hero-buttons">
              <Button variant="outline">Ver Detalhes</Button>
              <Button variant="primary">Adicionar à Lista</Button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BARRA DE CATEGORIAS ===== */}
      <div className="category-bar">
        <button className="cat-btn active">Todos</button>
        {listas.generos.slice(0, 5).map(g => (
           <button key={g.ID} className="cat-btn">{g.Nome}</button>
        ))}
      </div>

      <div className="home-content">
        
        {/* ===== SEÇÃO MAIS POPULARES ===== */}
        <SectionCarrossel 
          tituloPrincipal="Mais" 
          tituloDestaque="Assistidos"
          refCarrossel={maisAssistidosRef}
          handleLeft={() => scrollLeft(maisAssistidosRef)}
          handleRight={() => scrollRight(maisAssistidosRef)}
          filmes={listas.populares} 
        />

        {/* ===== SEÇÃO RECENTES/ADICIONADOS ===== */}
        <SectionCarrossel 
          tituloPrincipal="Adicionados" 
          tituloDestaque="Recentemente"
          refCarrossel={adicionadosRef}
          handleLeft={() => scrollLeft(adicionadosRef)}
          handleRight={() => scrollRight(adicionadosRef)}
          filmes={listas.recentes}
        />

        {/* ===== SEÇÃO SUA LISTA ===== */}
        <SectionCarrossel 
          tituloPrincipal="Sua" 
          tituloDestaque="Lista"
          refCarrossel={suaListaRef}
          handleLeft={() => scrollLeft(suaListaRef)}
          handleRight={() => scrollRight(suaListaRef)}
          filmes={listas.recentes} 
        />

      </div>

      <Footer />

    </div>
  );
}

function SectionCarrossel({ tituloPrincipal, tituloDestaque, refCarrossel, handleLeft, handleRight, filmes }) {
  return (
    <section className="secao-filmes">
      <div className="secao-header">
        <h3 className="secao-titulo">
          {tituloPrincipal} <span>{tituloDestaque}</span>
        </h3>
        
        <div className="nav-buttons">
          <button onClick={handleLeft} className="nav-btn"> &#8592; </button>
          <button onClick={handleRight} className="nav-btn"> &#8594; </button>
        </div>
      </div>

      <div className="carrossel" ref={refCarrossel}>
        {filmes && filmes.length > 0 ? filmes.map((filme) => (
          <CardFilmes key={filme.id_filme} filme={filme} />
        )) : <p style={{color:'#666'}}>Nenhum filme encontrado.</p>}
      </div>
    </section>
  );
}