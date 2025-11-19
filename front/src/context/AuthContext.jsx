import { createContext, useState, useContext, useEffect } from "react";
import { getUsuario, logout as doLogout } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Ao carregar a página, verifica se já existe alguém logado
    const usuarioSalvo = getUsuario();
    if (usuarioSalvo) {
      setUsuario(usuarioSalvo);
    }
  }, []);

  function login(dadosUsuario) {
    setUsuario(dadosUsuario);
    localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
  }

  function logout() {
    setUsuario(null);
    doLogout();
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}