import React from "react";
import "./explicacao.css";

function Explicacao({ operacao, onContinuar, onVoltar }) {
  const textos = {
    "adição": "Adição é somar dois números. Exemplo: 2 + 3 = 5",
    "subtração": "Subtração é tirar um número do outro. Exemplo: 5 - 2 = 3",
    "multiplicação": "Multiplicação é repetir um número várias vezes. Exemplo: 3 x 2 = 6",
    "divisão": "Divisão é repartir um número em partes iguais. Exemplo: 6 ÷ 2 = 3"
  };

  return (
    <div className="explicacao-container">
      <h2>Explicação: {operacao}</h2>
      <p>{textos[operacao]}</p>

      <button onClick={onContinuar}>Começar desafio</button>
      <button onClick={onVoltar}>Voltar ao menu</button>
    </div>
  );
}

export default Explicacao;
