import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/cadastro/Cadastro.jsx"
import Login from "./pages/login/Login.jsx"
import EdicaoFilme from "./pages/edicaoFilmes/EdicaoFilme.jsx"
import "./global.css";
import WallpaperManager from "./components/WallpaperManager";
import Home from "./pages/home/Home.jsx"
import Perfil from "./pages/perfil/Perfil.jsx"
import MovieDetails from "./pages/detalheFilmes/DetalheFilmes.jsx";
import RequisicoesPage from "./pages/requisicoes/RequisicaoAdm.jsx"
import MinhaLista from "./pages/minhaLista/MinhaLista.jsx";
import CadastrarFilme from "./pages/cadastroFilme/CadastroFilme.jsx";
import PesquisaFilmes from "./pages/pesquisa/PesquisaFilmes.jsx"
import FilmesAdicionados from "./pages/FilmesAdicionados/FilmesAdicionados.jsx";
import MinhasRequisicoes from "./pages/requisicoesFilmes/RequisicoesFilmes.jsx";

function App() {
  return (
    <BrowserRouter>
      <WallpaperManager />
      <Routes>

        <Route path="/" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edicaofilmes" element={<EdicaoFilme />} />
        <Route path="/cadastrofilmes" element={<CadastrarFilme />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} /> 
        <Route path="/detalhefilmes" element={<MovieDetails />} />
        <Route path="/requisicoesadm" element={<RequisicoesPage />} />
        <Route path="/minhalista" element={<MinhaLista />} /> 
        <Route path="/pesquisafilmes" element={<PesquisaFilmes />} />
        <Route path="/filmesadicionados" element={<FilmesAdicionados />} />
        <Route path="/minhasrequisicoes" element={<MinhasRequisicoes />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;