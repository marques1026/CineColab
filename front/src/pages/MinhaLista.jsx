import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import TituloPagina from '../pages/TituloPagina'


const MovieCard = ({ title, imageUrl }) => {
  return (
    <div className="movie-card">
      <img src={imageUrl} alt={title} className="movie-image" />
      <p className="movie-title">{title}</p>
      <Button variant="ghost" onClick={() => alert(`Remover ${title}`)}>
        Remover
      </Button>
    </div>
  );
};


export default function MinhaLista() {
  const myMovies = [
    { id: 1, title: 'Monstros S.A.', imageUrl: 'URL_DA_IMAGEM_MONSTROS' },
    { id: 2, title: 'Monstros S.A.', imageUrl: 'URL_DA_IMAGEM_MONSTROS' },
    { id: 3, title: 'Monstros S.A.', imageUrl: 'URL_DA_IMAGEM_MONSTROS' },
  ];

  const handleVoltar = () => {
    console.log('Voltar para a Home/Página Anterior');
  };

  const handleAdicionarFilme = () => {
    console.log('Navegar para a busca de filmes');
  };

  return (
    <div className="minha-lista-page">
      <Navbar /> 
      
      <main className="content-wrapper">
        <TituloPagina>Sua Lista</TituloPagina>

        <section className="list-container">
          <div className="movie-grid">
            {/* Renderiza a lista de filmes */}
            {myMovies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                title={movie.title} 
                imageUrl={movie.imageUrl} 
              />
            ))}
            {/* Repetição para simular a grade cheia da imagem */}
            {myMovies.map((movie) => (
              <MovieCard 
                key={movie.id + 10} // chave diferente
                title={movie.title} 
                imageUrl={movie.imageUrl} 
              />
            ))}
          </div>

        </section>

        <div className="action-buttons">
          <Button variant="outline" onClick={handleVoltar}>
            Voltar
          </Button>
          <Button variant="primary" onClick={handleAdicionarFilme}>
            Adicionar Filme à Lista
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}