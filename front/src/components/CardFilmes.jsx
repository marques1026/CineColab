import React from "react";
import "./CardFilmes.css";

export default function CardFilmes({ filme }) { 
  // Se existir url no banco, usa ela, se não, usa uma imagem padrão cinza
  const poster = filme.poster && filme.poster.startsWith("http")
    ? filme.poster
    : "https://via.placeholder.com/200x300?text=Sem+Imagem";

  return (
    <div className="card-filme">
      <div className="card-image-wrapper">
        <img src={poster} alt={filme.titulo} onError={(e) => { 
            // Se a url do banco quebrar, carrega a imagem padrão
            e.target.src = "https://via.placeholder.com/200x300?text=Erro+Imagem"; 
        }} />
        <div className="card-overlay"></div>
      </div>
      
      <div className="card-content">
        <button className="btn-card-detalhes">Ver Detalhes</button>
      </div>
    </div>
  );
}