// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getUsuario, logout as doLogout } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const u = getUsuario();
    if (u) setUsuario(u);
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
