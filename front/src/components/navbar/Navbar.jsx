import React, { useState, useEffect } from "react";
import "./Navbar.css"; 
import { Search } from "lucide-react"; 

export default function Navbar() {
  const [userName, setUserName] = useState("Visitante");

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("usuarioLogado");
    if (nomeSalvo) {
      setUserName(nomeSalvo);
    }
  }, []);

  return (
    <nav className="navbar">

      <div className="navbar-left-group">
        <a href="/" className="navbar-logo">
          Cine<span>Colab</span>
        </a>

        <div className="navbar-links">
          <a href="/home" className="navbar-link">Home</a>
          <a href="/minha-lista" className="navbar-link">Minha Lista</a>
        </div>
      </div>

      <div className="navbar-right-group">
        
        <div className="navbar-search">
          <Search className="search-icon" size={20} />
          <input type="text" placeholder="Pesquisar Por Filmes..." />
        </div>

        <div className="navbar-user">
          <div className="user-icon-wrapper"></div>
          <span className="navbar-username">Olá, {userName}</span>
        </div>

      </div>

    </nav>
  );
}