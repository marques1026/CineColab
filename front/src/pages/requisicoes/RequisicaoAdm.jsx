import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Button from "../../components/button/Button"
import "../../pages/requisicoes/RequisicaoAdm.css"
import Footer from "../../components/footer/Footer";

export default function RequisicoesPage() {

    const requisicoes = [
        { usuario: "MarquesGl", titulo: "Monstros S.A", tipo: "Adição", data: "08/11/2025", status: "Pendente" },
        { usuario: "MarquesGl", titulo: "Avatar", tipo: "Edição", data: "05/10/2025", status: "Pendente" },
        { usuario: "MarquesGl", titulo: "Karatê Kid", tipo: "Edição", data: "02/11/2025", status: "Pendente" },
        { usuario: "MarquesGl", titulo: "Meu Malvado Favorito 2", tipo: "Adição", data: "13/11/2025", status: "Recusado" },
        { usuario: "MarquesGl", titulo: "Valente", tipo: "Edição", data: "14/11/2025", status: "Pendente" },
        { usuario: "MarquesGl", titulo: "Minions", tipo: "Adição", data: "07/11/2025", status: "Pendente" }
    ];

    return (
        <>
            <Navbar />

            {/* CONTEÚDO DA PÁGINA */}
            <div className="requisicoes-container">
                <div className="requisicoes-box">
                    
                    <h2 className="titulo">
                        Requisições <span>de Filmes</span>
                    </h2>

                    <table className="tabela">
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>Título do Filme</th>
                                <th>Tipo de Requisição</th>
                                <th>Data de Requisição</th>
                                <th>Status</th>
                                <th>Ação</th>
                            </tr>
                        </thead>

                        <tbody>
                            {requisicoes.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.usuario}</td>
                                    <td>{item.titulo}</td>
                                    <td>{item.tipo}</td>
                                    <td>{item.data}</td>

                                    <td>
                                        <span className={
                                            item.status === "Pendente" ? "status-pendente" :
                                            item.status === "Recusado" ? "status-recusado" :
                                            "status-aprovado"
                                        }>
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="acoes">
                                        <button className="btn-aceitar">✔</button>
                                        <button className="btn-recusar">x</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="botoes-final">
                        <Button variant="outline">Voltar</Button>

                        <div className="grupo-right">
                            <Button variant="outline">Recusar Todas</Button>
                            <Button variant="primary">Aceitar Todas</Button>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}
