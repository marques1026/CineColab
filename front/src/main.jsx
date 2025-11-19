import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Global.css"; // Garante que o CSS global está aqui

// IMPORTANTE: Importar o Provedor
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* O AuthProvider tem de ser o "pai" de todos */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);