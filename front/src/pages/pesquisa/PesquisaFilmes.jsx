import React, { useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import Button from "../../components/button/Button";
import Footer from "../../components/footer/Footer";
import InputFiltro from "../../components/input/inputFiltro";
import { Filter } from 'lucide-react';
import "./PesquisaFilmes.css";

const mockMovies = [
  {
    id: 1,
    title: "Monstros S.A",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop"
  },
  {
    id: 2,
    title: "Monstros S.A",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop"
  }
];

const MovieCard = ({ movie, isHighlighted }) => {
  return (
    <div className={`movie-card ${isHighlighted ? 'highlighted' : ''}`}>
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <Button variant="primary">Ver Detalhes</Button>
      </div>
    </div>
  );
};

export default function MovieSearchScreen() {
  const [searchTerm] = useState("Monstros S.A");
  const [selectedMovie] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleApplyFilter = (filters) => {
    console.log('Filtros aplicados:', filters);
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="search-content">
        <div className="search-header">
          <h2 className="search-title">
            Resultados para <span className="highlight">"{searchTerm}"</span>
          </h2>
          <Button variant="primary" onClick={() => setIsFilterOpen(true)}>
            <Filter size={20} />
            Filtrar Por
          </Button>
        </div>

        <div className="movies-grid">
          {mockMovies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie}
              isHighlighted={movie.id === selectedMovie}
            />
          ))}
        </div>
      </div>

      <Footer />

      <InputFiltro 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilter={handleApplyFilter}
      />
    </div>
  );
}