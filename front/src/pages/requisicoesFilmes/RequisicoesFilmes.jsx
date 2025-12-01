import React from "react";
import "./RequisicoesFilmes.css"
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";

// Dados fictícios
const mockRequisicoes = [
  {
    id: 1,
    titulo: "Monstros S.A",
    ano: "2001",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    tipo: "Edição",
    status: "Pendente",
    data: "06/11/25"
  },
  {
    id: 2,
    titulo: "Monstros S.A",
    ano: "2001",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    tipo: "Edição",
    status: "Recusado",
    data: "06/11/25"
  },
  {
    id: 3,
    titulo: "Monstros S.A",
    ano: "2001",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    tipo: "Adição",
    status: "Pendente",
    data: "06/11/25"
  },
  {
    id: 4,
    titulo: "Monstros S.A",
    ano: "2001",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    tipo: "Edição",
    status: "Recusado",
    data: "06/11/25"
  },
    {
    id: 5,
    titulo: "Monstros S.A",
    ano: "2001",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    tipo: "Adição",
    status: "Pendente",
    data: "06/11/25"
  },
  {
    id: 6,
    titulo: "Monstros S.A",
    ano: "2001",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    tipo: "Edição",
    status: "Pendente",
    data: "06/11/25"
  }
];

export default function MinhasRequisicoes() {
  return (
    <div className="requisicoes-page">
      <Navbar />

      <div className="req-content-wrapper">
        <div className="req-glass-container">
          
          {/* Cabeçalho */}
          <div className="req-header">
            <h2 className="req-titulo">
              Minhas <span className="req-destaque">Requisições</span>
            </h2>
            <div className="req-divisor"></div>
          </div>

          {/* Grid de Cards */}
          <div className="req-grid">
            {mockRequisicoes.map((req) => (
              <div key={req.id} className="req-card">
                
                {/* Imagem do Poster */}
                <div className="req-poster">
                  <img src={req.poster} alt={req.titulo} />
                </div>

                {/* Informações */}
                <div className="req-info">
                  
                  {/* Título e Ano */}
                  <div className="req-top-info">
                    <h3 className="req-movie-title">
                      {req.titulo} <span className="req-year">| {req.ano}</span>
                    </h3>
                  </div>

                  {/* Tipo de Requisição */}
                  <div className="req-field">
                    <span className="req-label">Tipo de Requisição</span>
                    <span className={`req-badge tipo-${req.tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>
                      {req.tipo}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="req-field">
                    <span className="req-label">Status</span>
                    <span className={`req-badge status-${req.status.toLowerCase()}`}>
                      {req.status}
                    </span>
                  </div>

                  {/* Data */}
                  <div className="req-field">
                    <span className="req-label">Data da Requisição</span>
                    <span className="req-data-value">{req.data}</span>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="req-bottom-buttons">
            <Button variant="outline">Voltar</Button>
            <Button variant="primary">Adicionar Filme</Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}