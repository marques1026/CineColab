import React from "react";
import "./CardFilmes.css";

export default function CardFilmes({ filme }) {

  const poster = filme.poster 
    ? `/src/assets/img/posters/${filme.poster}`
    : "/src/assets/img/posters/defaultPoster.jpg";

  return (
    <div className="card-filme">
      <img src={poster} alt={filme.titulo} />

      <div className="card-title">
        {filme.titulo}
      </div>
    </div>
  );
}
