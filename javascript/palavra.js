let desempenho = document.querySelector('.seudesempenho')
let textoResultado = document.querySelector('.textoResultado')

let wordList = [
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
    gameGrid: Array(6).fill().map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
    hiddenWord: wordList[Math.floor(Math.random() * wordList.length)]
};

let isGameOver = false;

function init() {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';
    gridJogo(gameContainer);
    console.log(jogoStatus.hiddenWord);
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
                jogoStatus.currentRow++;
                jogoStatus.currentCol = 0;
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
        let charBox = document.getElementById('charBox.' + jogoStatus.currentRow + '' + i);
        let letter = charBox.textContent;
        if (letter == jogoStatus.hiddenWord[i]) {
            charBox.classList.add('correct');
        } else if (jogoStatus.hiddenWord.includes(letter)) {
            charBox.classList.add('contains');
        } else {
            charBox.classList.add('empty');
        }
    }
}

function checkTurn(enteredWord) {
    let won = jogoStatus.hiddenWord === enteredWord;
    let gameOver = jogoStatus.currentRow === 5;

    if (won) {
        resultado.classList.add('resultadoAparecer');
        isGameOver = true;
        desempenho.textContent = 'Parabens'
        textoResultado.textContent = 'Você acertou a palavra!'
    } else if (gameOver) {
        resultado.classList.add('resultadoAparecer');
        isGameOver = true;
        desempenho.textContent = 'Não foi dessa vez'
        textoResultado.textContent = 'Você errou a palavra: ' + jogoStatus.hiddenWord
    }
}

fecharBotao.addEventListener('click', () => {
    resultado.classList.remove('resultadoAparecer');
    resetGame();
});

function resetGame() {
    jogoStatus.hiddenWord = wordList[Math.floor(Math.random() * wordList.length)];
    jogoStatus.currentRow = 0;
    jogoStatus.currentCol = 0;
    jogoStatus.gameGrid = Array(6).fill().map(() => Array(5).fill(''));
    console.log('Nova palavra gerada: ', jogoStatus.hiddenWord);
    init();
}

function getEnteredWord() {
    return jogoStatus.gameGrid[jogoStatus.currentRow].reduce((previous, current) => previous + current);
}

function updateGameGrid() {
    for (let i = 0; i < jogoStatus.gameGrid.length; i++) {
        for (let o = 0; o < jogoStatus.gameGrid[i].length; o++) {
            let charBox = document.getElementById('charBox.' + i + '' + o);
            charBox.textContent = jogoStatus.gameGrid[i][o];
        }
    }
}

function isAlpha(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(key) {
    if (jogoStatus.currentCol === 5) return;
    jogoStatus.gameGrid[jogoStatus.currentRow][jogoStatus.currentCol] = key;
    jogoStatus.currentCol++;
}

function deleteLetter() {
    if (jogoStatus.currentCol === 0) return;
    jogoStatus.gameGrid[jogoStatus.currentRow][jogoStatus.currentCol - 1] = '';
    jogoStatus.currentCol--;
}

function showError() {
    const errorMessage = document.querySelector('.error');
    errorMessage.style.opacity = '1';
    setTimeout(() => {
        errorMessage.style.opacity = '0';
    }, 3000);
}

init();
