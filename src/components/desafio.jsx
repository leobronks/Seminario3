import React, { useState, useEffect } from "react";
import "./desafio.css";

function Desafio({ operacao, onVoltar }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [alternativas, setAlternativas] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    gerarNovaConta();
  }, [operacao]);

  const calcularResultado = (n1, n2, operacao) => {
    switch (operacao) {
      case "adição":
        return n1 + n2;
      case "subtração":
        return n1 - n2;
      case "multiplicação":
        return n1 * n2;
      case "divisão":
        return n2 !== 0 ? Math.floor(n1 / n2) : 0;
      default:
        return n1 + n2;
    }
  };

  const gerarNovaConta = () => {
    let n1, n2;

    if (operacao === "multiplicação") {
      n1 = Math.floor(Math.random() * 10) + 1;
      n2 = Math.floor(Math.random() * 10) + 1;
    } else if (operacao === "divisão") {
      n2 = Math.floor(Math.random() * 9) + 2;
      const resultado = Math.floor(Math.random() * 10) + 1;
      n1 = n2 * resultado;
    } else {
      n1 = Math.floor(Math.random() * 30);
      n2 = Math.floor(Math.random() * 10);
      
      if (operacao === "subtração" && n1 < n2) {
        [n1, n2] = [n2, n1];
      }
    }

    setNum1(n1);
    setNum2(n2);
    setMensagem("");
    gerarAlternativas(n1, n2);
  };

  const gerarAlternativas = (n1, n2) => {
    const correta = calcularResultado(n1, n2, operacao);
  
    const alternativasFalsas = [];
    for (let i = 1; alternativasFalsas.length < 3; i++) {
      const tentativa = correta + i;
      const tentativaNegativa = correta - i;
  
      if (tentativa !== correta && !alternativasFalsas.includes(tentativa)) {
        alternativasFalsas.push(tentativa);
      }
  
      if (
        alternativasFalsas.length < 3 &&
        tentativaNegativa >= 0 &&
        tentativaNegativa !== correta &&
        !alternativasFalsas.includes(tentativaNegativa)
      ) {
        alternativasFalsas.push(tentativaNegativa);
      }
    }
  
    const todasAlternativas = [correta, ...alternativasFalsas];
    todasAlternativas.sort(() => Math.random() - 0.5);
  
    setAlternativas(todasAlternativas);
  };

  const verificarResposta = (alternativaEscolhida) => {
    const correta = calcularResultado(num1, num2, operacao);
    if (alternativaEscolhida === correta) {
      setMensagem("✅ Resposta correta! Parabéns!");
    } else {
      setMensagem(`❌ Ops! A resposta correta era ${correta}.`);
    }

    setCarregando(true);
    setTimeout(() => {
      gerarNovaConta();
      setCarregando(false);
    }, 2000);
  };

  const simboloOperacao = () => {
    switch (operacao) {
      case "adição":
        return "+";
      case "subtração":
        return "-";
      case "multiplicação":
        return "×";
      case "divisão":
        return "÷";
      default:
        return "?";
    }
  };

  return (
    <div className="desafio-container">
      <h2>Desafio de {operacao}</h2>

      <p>Quanto é {num1} {simboloOperacao()} {num2}?</p>

      <div style={{ marginTop: "20px" }}>
        {alternativas.map((alternativa, index) => (
          <button key={index} onClick={() => verificarResposta(alternativa)}>
            {alternativa}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={onVoltar}>Voltar</button>
      </div>

      {mensagem && <p style={{ marginTop: "20px", fontWeight: "bold" }}>{mensagem}</p>}

      {carregando && (
        <div className="carregando-barra">
          Carregando próxima pergunta...
          <div className="barra-animada"></div>
        </div>
      )}
    </div>
  );
}

export default Desafio;
