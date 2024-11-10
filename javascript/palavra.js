let desempenho = document.querySelector('.seudesempenho')
let textoResultado = document.querySelector('.textoResultado')

let listaPalavras = [
    "amigo", "dolar", "tempo", "carro", "feira", "olhar", "sorte", "poder", "chave",
    "mundo", "falar", "homem", "chuva", "amado", "sabor", "certo", "sinto", "perto", 
    "beijo", "terra", "viver", "festa", "letra", "justo", "tarde", "banco",
    "feliz", "pesca", "moeda", "peixe", "custo", "pista", "casar", "carta", "bicho", 
    "piano", "minha", "morte", "larva", "vento", "flore", "pegar", "corda", 
    "prego", "trago", "corte", "gente", "golpe", "saber"
];

let resultado = document.querySelector('.telaResultado');
let fecharBotao = document.querySelector('.fechar');

let jogoStatus = {
    gridJogo: Array(6).fill().map(() => Array(5).fill('')),
    linhaJogo: 0,
    colunaJogo: 0,
    palavraEscolhida: listaPalavras[Math.floor(Math.random() * listaPalavras.length)]
};

let isGameOver = false;

function init() {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';
    gridJogo(gameContainer);
    console.log(jogoStatus.palavraEscolhida);
    teclaApertada();
    isGameOver = false; 
}

function gridJogo(gameContainer) {
    const gameGrid = document.createElement('div');
    gameGrid.className = 'gameGrid';

    for (let i = 0; i < 6; i++) {
        for (let o = 0; o < 5; o++) {
            fazerCaixa(gameGrid, i, o);
        }
    }
    gameContainer.appendChild(gameGrid);
}

function fazerCaixa(gameGrid, row, col, letter = '') {
    const charBox = document.createElement('div');
    charBox.className = 'charBox';
    charBox.id = 'charBox.' + row + '' + col;
    charBox.textContent = letter;
    gameGrid.appendChild(charBox);
    return charBox;
}

function teclaApertada() {
    document.body.onkeydown = (e) => {
        if (isGameOver) return;

        let tecla = e.key;
        if (tecla === 'Enter') {
            let word = getEnteredWord();
            if (word.length < 5) {
                showError();
            } else {
                checkLetters();
                checkTurn(word);
                jogoStatus.linhaJogo++;
                jogoStatus.colunaJogo = 0;
            }
        }
        if (tecla === 'Backspace') {
            deleteLetter();
        }
        if (isAlpha(tecla)) {
            addLetter(tecla);
        }
        updateGameGrid();
    }
}

function checkLetters() {
    for (let i = 0; i < 5; i++) {
        let charBox = document.getElementById('charBox.' + jogoStatus.linhaJogo + '' + i);
        let letter = charBox.textContent;
        setTimeout(() => {
            if (letter == jogoStatus.palavraEscolhida[i]) {
                charBox.classList.add('correct');
            } else if (jogoStatus.palavraEscolhida.includes(letter)) {
                charBox.classList.add('contains');
            } else {
                charBox.classList.add('empty');
            }
            charBox.classList.add('reveal');  // Adiciona a classe de revelação da letra
        }, i * 300)  // Espera 300ms para cada letra antes de mostrar a próxima
    }
}

function checkTurn(enteredWord) {
    let won = jogoStatus.palavraEscolhida === enteredWord;
    let gameOver = jogoStatus.linhaJogo === 5;

    if (won) {
        setTimeout(() => {
            resultado.classList.add('resultadoAparecer');
            isGameOver = true;
            desempenho.textContent = 'Parabens'
            textoResultado.textContent = 'Você acertou a palavra!'
        }, 1500)
    } else if (gameOver) {
        setTimeout(() => {
            resultado.classList.add('resultadoAparecer');
            isGameOver = true;
            desempenho.textContent = 'Não foi dessa vez'
            textoResultado.textContent = 'Você errou a palavra: ' + jogoStatus.palavraEscolhida
        }, 1500)
    }
}

fecharBotao.addEventListener('click', () => {
    resultado.classList.remove('resultadoAparecer');
    resetGame();
});

function resetGame() {
    jogoStatus.palavraEscolhida = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    jogoStatus.linhaJogo = 0;
    jogoStatus.colunaJogo = 0;
    jogoStatus.gridJogo = Array(6).fill().map(() => Array(5).fill(''));
    console.log('Nova palavra gerada: ', jogoStatus.palavraEscolhida);
    init();
}

function getEnteredWord() {
    return jogoStatus.gridJogo[jogoStatus.linhaJogo].reduce((previous, current) => previous + current);
}

function updateGameGrid() {
    for (let i = 0; i < jogoStatus.gridJogo.length; i++) {
        for (let o = 0; o < jogoStatus.gridJogo[i].length; o++) {
            let charBox = document.getElementById('charBox.' + i + '' + o);
            charBox.textContent = jogoStatus.gridJogo[i][o];
        }
    }
}

function isAlpha(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(key) {
    if (jogoStatus.colunaJogo === 5) return;
    jogoStatus.gridJogo[jogoStatus.linhaJogo][jogoStatus.colunaJogo] = key;
    jogoStatus.colunaJogo++;
}

function deleteLetter() {
    if (jogoStatus.colunaJogo === 0) return;
    jogoStatus.gridJogo[jogoStatus.linhaJogo][jogoStatus.colunaJogo - 1] = '';
    jogoStatus.colunaJogo--;
}

function showError() {
    const errorMessage = document.querySelector('.error');
    errorMessage.style.opacity = '1';
    setTimeout(() => {
        errorMessage.style.opacity = '0';
    }, 3000);
}

init();
