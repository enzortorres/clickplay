const jogadorAtual = document.querySelector(".currentPlayer");

let selecionados;
let jogador = "X";

let posicoes = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function iniciar() {
  selecionados = [];

  if (jogadorAtual) {
    jogadorAtual.innerHTML = `${jogador}`;
  }

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.classList.remove("hover-x", "hover-o");
    item.addEventListener("click", novoMovimento);
    item.addEventListener("mouseenter", adicionarHover);
    item.addEventListener("mouseleave", removerHover);
  });
  
}

function adicionarHover(e) {
  e.target.classList.add(jogador === "X" ? "hover-x" : "hover-o");
}

function removerHover(e) {
  e.target.classList.remove("hover-x", "hover-o");
}

iniciar();

function novoMovimento(e) {

  const indice = e.target.getAttribute("data-i");
  e.target.innerHTML = jogador;
  e.target.removeEventListener("click", novoMovimento);
  e.target.removeEventListener("mouseenter", adicionarHover);
  e.target.removeEventListener("mouseleave", removerHover);
  e.target.classList.remove("hover-x", "hover-o");

  selecionados[indice] = jogador;

  setTimeout(() => {
    verificar();
  }, 100);

  if (jogador === "X") {
    e.target.style.color = '#31C4BE';
    jogador = "O";
  } else {
    e.target.style.color = '#F3B13C';
    jogador = "X";
  }

  if (jogadorAtual) {
    jogadorAtual.innerHTML = `${jogador}`;
  }
}

let contadorX = 0;
let contadorO = 0;
let contadorEmpate = 0;

function verificar() {
  let ultimoJogador = jogador === "X" ? "O" : "X";
  const itens = selecionados
    .map((item, i) => [item, i])
    .filter((item) => item[0] === ultimoJogador)
    .map((item) => item[1]);

  for (const pos of posicoes) {
    if (pos.every((item) => itens.includes(item))) {
      jogoFinalizado = true;
      if (ultimoJogador === "X") {
        contadorX++;
        document.querySelector('.contadorVitoria').textContent = contadorX;
      } else {
        contadorO++;
        document.querySelector('.contadorDerrota').textContent = contadorO;
      }
      iniciar();
      return;
    }
  }

  if (selecionados.filter((item) => item).length === 9) {
    contadorEmpate++
    document.querySelector('.contadorEmpate').textContent = contadorEmpate
    iniciar();
    return;
  }
}

const resetar = document.getElementsByClassName('btnrestart')[0];

resetar.addEventListener("click", function() {
  iniciar();
  contadorEmpate = 0
  contadorO = 0
  contadorX = 0
    document.querySelector('.contadorVitoria').textContent = contadorX;
    document.querySelector('.contadorDerrota').textContent = contadorO;
    document.querySelector('.contadorEmpate').textContent = contadorEmpate;
});
