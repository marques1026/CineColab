import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function WallpaperManager() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.toLowerCase();

    // Rotas que usam o wallpaper de Perdidos no Espaço
    const wallpaperLoginCadastro = ["/login", "/cadastro"];

    if (wallpaperLoginCadastro.includes(path)) {
      document.body.setAttribute("data-wallpaper", "login");
    } else {
      // todas as outras usam o wallpaper default
      document.body.setAttribute("data-wallpaper", "default");
    }
  }, [location]);

  return null; // Não renderiza nada, só gerencia o fundo
}
