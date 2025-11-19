import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Login from "./pages/Login.jsx";
import EdicaoFilme from "./pages/EdicaoFilme.jsx";
import "./global.css";
import WallpaperManager from "./components/WallpaperManager";
import CadastrarFilme from "./pages/CadastroFilme.jsx";
import Home from "./pages/Home.jsx"
import Perfil from "./pages/Perfil.jsx";
import MovieDetails from "./pages/DetalheFilmes.jsx";



function App() {
  return (
    <BrowserRouter>
      <WallpaperManager />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}

        <Route path="/" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edicaofilmes" element={<EdicaoFilme />} />
        <Route path="/cadastrofilmes" element={<CadastrarFilme />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/detalhefilmes" element={<MovieDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
