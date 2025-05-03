import React from "react";
import "./Home.css"; // 👈 importa o estilo

function Home({ onSelecionarOperacao }) {
  return (
    <div className="container">
      <h1>Jogo de Matemática</h1>
      <p>Escolha uma operação para começar:</p>

      <button onClick={() => onSelecionarOperacao("adição")}>➕ Adição</button>
      <button onClick={() => onSelecionarOperacao("subtração")}>➖ Subtração</button>
      <button onClick={() => onSelecionarOperacao("multiplicação")}>✖️ Multiplicação</button>
      <button onClick={() => onSelecionarOperacao("divisão")}>➗ Divisão</button>

    </div>
  );
}

export default Home;
