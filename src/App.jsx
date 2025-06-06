import { useState } from "react";
import Home from "./components/home";
import Explicacao from "./components/explicacao";
import Desafio from "./components/desafio";

function App(){
    const[tela, setTela] = useState('home');
    const[operacaoSelecionada, setOperacaoSelecionada] = useState('');

    const voltarParaHome =() => {
        setTela("home");
    };

    const selecionarOperacao = (operacao) => {
        setOperacaoSelecionada(operacao);
        setTela('explicacao');
    };

    const irParaDesafio = () => {
        setTela('desafio');
    }

    return(
        <div>
            {tela === "home" &&<Home onSelecionarOperacao={selecionarOperacao}></Home>}
            {tela === "explicacao" && (<Explicacao operacao={operacaoSelecionada} 
            onContinuar={irParaDesafio}
            onVoltar={voltarParaHome}></Explicacao>)}
            {tela === "desafio" && (<Desafio operacao={operacaoSelecionada}
            onVoltar={voltarParaHome}></Desafio>)}
            
        </div>
    );
}

export default App