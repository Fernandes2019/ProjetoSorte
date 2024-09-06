// Variáveis para armazenar o nome e pontuação do jogador
var jogadorNome;
var jogadorPontos = 0;
var jogadorEscolha = 0;

// Variáveis para armazenar a escolha e pontuação do computador
var computadorEscolha = 0;
var computadorPontos = 0;

// Função que gera números aleatórios entre o valor mínimo e máximo
// 1 - Rocha, 2 - Grama, 3 - Fogo
function sortear(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função que traduz o número da escolha em uma string correspondente
// 1 - Rocha, 2 - Grama, 3 - Fogo
function traduzirEscolha(numero) {
  if (numero == 1) {
    return 'Rocha';
  } else if (numero == 2) {
    return 'Grama';
  } else if (numero == 3) {
    return 'Fogo';
  }
}

// Função que adiciona a classe 'selecionado' ao elemento escolhido
function selecionar(tipo, escolha) {
  document.getElementById(tipo + '-escolha-' + escolha).classList.add('selecionado');
}

// Função que remove a classe 'selecionado' do elemento escolhido
function deselecionar(tipo, escolha) {
  document.getElementById(tipo + '-escolha-' + escolha).classList.remove('selecionado');
}

// Função que exibe uma mensagem na tela
function mensagem(texto) {
  document.getElementById('mensagem').innerHTML = texto;
}

// Função que define o nome do jogador no placar
function definirJogadorNome(nome) {
  document.getElementById('jogador-nome').innerHTML = nome;
}

// Função que calcula e retorna o ganhador
// 0 - Empate, 1 - Jogador, 2 - Computador
function calcularEscolha(jogador, computador) {
  if (jogador == 1 && computador == 1) {
    return 0;
  } else if (jogador == 1 && computador == 2) {
    return 2;
  } else if (jogador == 1 && computador == 3) {
    return 1;
  } else if (jogador == 2 && computador == 1) {
    return 1;
  } else if (jogador == 2 && computador == 2) {
    return 0;
  } else if (jogador == 2 && computador == 3) {
    return 2;
  } else if (jogador == 3 && computador == 1) {
    return 2;
  } else if (jogador == 3 && computador == 2) {
    return 1;
  } else if (jogador == 3 && computador == 3) {
    return 0;
  }
}

// Função que incrementa os pontos do jogador
function somarPontoJogador() {
  jogadorPontos++;
  document.getElementById('jogador-pontos').innerHTML = jogadorPontos;
}

// Função que incrementa os pontos do computador
function somarPontoComputador() {
  computadorPontos++;
  document.getElementById('computador-pontos').innerHTML = computadorPontos;
}

// Função principal que controla o fluxo do jogo
function jogar(escolha) {
  // Armazena a escolha do jogador e a marca como selecionada
  jogadorEscolha = escolha;
  selecionar('jogador', jogadorEscolha);

  // Computador faz sua escolha aleatória
  computadorEscolha = sortear(1, 3);
  selecionar('computador', computadorEscolha);

  // Calcula quem é o ganhador
  var ganhador = calcularEscolha(jogadorEscolha, computadorEscolha);

  // Exibe a mensagem do resultado
  if (ganhador == 0) {
    mensagem('Empate');
  } else if (ganhador == 1) {
    mensagem('Ponto para ' + jogadorNome);
    somarPontoJogador();
  } else if (ganhador == 2) {
    mensagem('Ponto para Computador');
    somarPontoComputador();
  }

  // Remove a seleção após um tempo e exibe nova mensagem
  setTimeout(function() {
    deselecionar('jogador', jogadorEscolha);
    deselecionar('computador', computadorEscolha);
    mensagem(jogadorNome + ' vamos la para proxima partida');
  }, 3000);
}

// Define eventos de clique para as escolhas do jogador
document.getElementById('jogador-escolha-1').onclick = function() { jogar(1); };
document.getElementById('jogador-escolha-2').onclick = function() { jogar(2); };
document.getElementById('jogador-escolha-3').onclick = function() { jogar(3); };

// Pergunta o nome do jogador e o define no placar
jogadorNome = prompt("Qual é o seu nome?");
definirJogadorNome(jogadorNome);

// Caixa de mensagem do jogo
function mensagem(jogadorNome) {
  const alerta = document.createElement('div');
  alerta.textContent = ` ${jogadorNome}! Escolha outra opção para continuar jogando`;
  alerta.classList.add('alerta'); // Classe CSS para estilizar

  document.body.appendChild(alerta);

  // Remover o alerta após alguns segundos (opcional)
  setTimeout(() => {
      document.body.removeChild(alerta);
  }, 3000);
}

