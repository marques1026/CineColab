import React from "react";
import "./HistoricoEdicoes.css";

export default function HistoricoEdicoes() {
  // Em produção, você vai puxar isso do backend
  const historico = [
    { data: "00/00/00", hora: "00:00", usuario: "Usuário01" },
    { data: "00/00/00", hora: "00:00", usuario: "Usuário01" },
    { data: "00/00/00", hora: "00:00", usuario: "Usuário01" },
    { data: "00/00/00", hora: "00:00", usuario: "Usuário01" }
  ];

  return (
    <div className="historico-table">

      <div className="historico-header">
        <span>Data</span>
        <span>Hora</span>
        <span>Usuário</span>
      </div>

      <div className="historico-body">
        {historico.map((item, index) => (
          <div className="historico-row" key={index}>
            <span>{item.data}</span>
            <span>{item.hora}</span>
            <span>{item.usuario}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
