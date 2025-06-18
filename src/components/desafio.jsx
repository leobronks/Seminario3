body {
  margin: 0;
  padding: 0;
  /*background: linear-gradient(135deg, #e0f7fa, #80deea);*/
  font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  background-image: url('./img/bg.png');
  background-size: 400px 400px;
  background-repeat: repeat;
  animation: Loop_Bg 16s linear infinite;
  z-index: -1;
}

@keyframes Loop_Bg {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}

/* Container principal */
.desafio-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 80px auto;
  background-color: white;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  font-family: 'Poppins', sans-serif;
  min-height: 400px;
}

/* Título */
.desafio-container h2 {
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 20px;
}

/* Texto de perguntas */
.desafio-container p {
  font-size: 20px;
  color: #555;
  margin-bottom: 20px;
  font-weight: bold;
}

/* Estilo dos botões */
.desafio-container button {
  background-color: #00796b;
  color: white;
  border: none;
  padding: 12px 20px;
  margin: 8px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Efeito de hover nos botões */
.desafio-container button:hover {
  background-color: #004d40;
  transform: scale(1.05);
}

/* Desabilita botões quando necessário */
.desafio-container button:disabled {
  background-color: #bdbdbd;
  cursor: not-allowed;
  transform: none;
}

/* Mensagem de acerto ou erro */
.mensagem {
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
  text-align: center;
  color: #2c3e50;
}

/* Carregando barra */
.carregando-barra {
  margin-top: 20px;
  color: #555;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
}

.barra-animada {
  height: 6px;
  background: #00796b;
  width: 0%;
  animation: carregar 2s linear forwards;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@keyframes carregar {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

/* Media queries para responsividade */
@media (max-width: 600px) {
  .desafio-container {
    margin: 40px 20px;
    padding: 30px 20px;
  }

  .desafio-container button {
    width: 100%;
    margin: 8px 0;
  }

  .desafio-container h2 {
    font-size: 24px;
  }

  .desafio-container p {
    font-size: 18px;
  }
}
