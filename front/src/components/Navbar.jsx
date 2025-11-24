import React, { useState, useEffect } from "react";
import "./Navbar.css"; 
import { FaSearch } from "react-icons/fa";

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

      <div className="navbar-left">
        <a href="/" className="navbar-logo">
          Cine<span>Colab</span>
        </a>
      </div>

      <div className="navbar-center">
        
        {/* Links */}
        <div className="navbar-links">
          <a href="/home" className="navbar-link">Home</a>
          <a href="/minha-lista" className="navbar-link">Minha Lista</a>
        </div>
        
        {/* Barra de Busca */}
        <div className="navbar-search">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Pesquisar por filmes..." />
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-user">
          <div className="user-icon-wrapper"></div>
          <span className="navbar-username">Olá, {userName}</span>
        </div>
      </div>

    </nav>
  );
}