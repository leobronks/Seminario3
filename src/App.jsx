import { useState, useEffect } from "react";
import Home from "./components/home";
import Explicacao from "./components/explicacao";
import Desafio from "./components/desafio";

function App(){
    const[tela, setTela] = useState('home');
    const[operacaoSelecionada, setOperacaoSelecionada] = useState('');

    useEffect(() => {
        // Função para carregar o script VLibras
        const loadVLibrasScript = () => {
            return new Promise((resolve, reject) => {
                // Verifica se o script já foi carregado
                const existingScript = document.querySelector('script[src="https://vlibras.gov.br/app/vlibras-plugin.js"]');
                if (existingScript) {
                    // Se já existe, verifica se o VLibras está disponível
                    if (window.VLibras) {
                        resolve();
                    } else {
                        // Se o script existe mas VLibras não está disponível, aguarda
                        existingScript.onload = () => resolve();
                    }
                    return;
                }

                const script = document.createElement('script');
                script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
                script.async = true;
                
                script.onload = () => {
                    console.log('VLibras script carregado');
                    resolve();
                };
                
                script.onerror = () => {
                    console.error('Erro ao carregar o script VLibras');
                    reject(new Error('Erro ao carregar o script VLibras'));
                };
                
                document.head.appendChild(script);
            });
        };

        // Função para aguardar o VLibras estar disponível
        const waitForVLibras = (maxAttempts = 50) => {
            return new Promise((resolve, reject) => {
                let attempts = 0;
                
                const checkVLibras = () => {
                    attempts++;
                    console.log(`Tentativa ${attempts} de verificar VLibras...`);
                    
                    if (window.VLibras && window.VLibras.Widget) {
                        console.log('VLibras disponível!');
                        resolve();
                    } else if (attempts >= maxAttempts) {
                        console.error('VLibras não foi carregado após', maxAttempts, 'tentativas');
                        reject(new Error('VLibras não foi carregado'));
                    } else {
                        setTimeout(checkVLibras, 100);
                    }
                };
                
                checkVLibras();
            });
        };

        // Função para inicializar o VLibras
        const initVLibras = () => {
            try {
                // Remove widget anterior se existir
                const existingWidget = document.querySelector('[vw]');
                if (existingWidget) {
                    existingWidget.remove();
                    console.log('Widget VLibras anterior removido');
                }

                // Cria o elemento do widget VLibras
                const vLibrasDiv = document.createElement('div');
                vLibrasDiv.setAttribute('vw', '');
                vLibrasDiv.className = 'enabled';
                
                const accessButton = document.createElement('div');
                accessButton.setAttribute('vw-access-button', '');
                accessButton.className = 'active';
                
                const pluginWrapper = document.createElement('div');
                pluginWrapper.setAttribute('vw-plugin-wrapper', '');
                
                const topWrapper = document.createElement('div');
                topWrapper.className = 'vw-plugin-top-wrapper';
                
                pluginWrapper.appendChild(topWrapper);
                vLibrasDiv.appendChild(accessButton);
                vLibrasDiv.appendChild(pluginWrapper);
                
                // Adiciona o widget ao body
                document.body.appendChild(vLibrasDiv);
                console.log('Elementos VLibras adicionados ao DOM');
                
                // Inicializa o widget
                new window.VLibras.Widget('https://vlibras.gov.br/app');
                console.log('Widget VLibras inicializado com sucesso!');
                
            } catch (error) {
                console.error('Erro ao inicializar VLibras:', error);
            }
        };

        // Processo de carregamento e inicialização
        const setupVLibras = async () => {
            try {
                console.log('Iniciando carregamento do VLibras...');
                
                // Carrega o script
                await loadVLibrasScript();
                console.log('Script carregado, aguardando VLibras estar disponível...');
                
                // Aguarda o VLibras estar disponível
                await waitForVLibras();
                
                // Inicializa o widget
                initVLibras();
                
            } catch (error) {
                console.error('Erro no setup do VLibras:', error);
            }
        };

        setupVLibras();

        // Cleanup: remove o widget quando o componente for desmontado
        return () => {
            const vLibrasWidget = document.querySelector('[vw]');
            if (vLibrasWidget) {
                vLibrasWidget.remove();
                console.log('Widget VLibras removido na limpeza');
            }
        };
    }, []); // useEffect executa apenas uma vez quando o componente monta

    const voltarParaHome = () => {
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
            {tela === "home" && <Home onSelecionarOperacao={selecionarOperacao}></Home>}
            {tela === "explicacao" && (<Explicacao operacao={operacaoSelecionada} 
            onContinuar={irParaDesafio}
            onVoltar={voltarParaHome}></Explicacao>)}
            {tela === "desafio" && (<Desafio operacao={operacaoSelecionada}
            onVoltar={voltarParaHome}></Desafio>)}
        </div>
    );
}

export default App;
