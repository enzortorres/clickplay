const randomWord = document.getElementById('random-word');
const input = document.getElementById('text-input');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const radioButtons = document.querySelectorAll('.levels-buttons');
const resultDisplay = document.getElementById('res');
let playerPoints = 0;
let isPlaying = false;
let timeOutTimer;
let timerInterval;
let time;

function getRandomWord() {
    const randomWords = [
        "casa", "carro", "livro", "mesa", "computador", "porta", "janela", "cadeira", "parede", "telefone",
        "lápis", "caneta", "papel", "chave", "bolsa", "relógio", "quadro", "cachorro", "gato", "pessoa",
        "cidade", "rua", "praia", "sol", "lua", "estrela", "flor", "árvore", "música", "festa",
        "cama", "trabalho", "escola", "faculdade", "futebol", "filme", "amigo", "família", "amor", "tempo",
        "verão", "inverno", "chuva", "vento", "neve", "montanha", "rio", "lago", "oceano", "comida"
    ];
    let randomNumber = Math.floor(Math.random() * randomWords.length);
    randomWord.textContent = randomWords[randomNumber];
    console.log(randomNumber);
}

function startTimer() {
    if (!isPlaying) {
        isPlaying = true;
        updateTime();
        timerDisplay.textContent = `Tempo restante: ${time}`;

        timerInterval = setInterval(() => {
            time--;
            timerDisplay.textContent = `Tempo restante: ${time}`;
            
            if (time === 0) {
                clearInterval(timerInterval);
                showResults();

                playerPoints = 0; 
                scoreDisplay.textContent = `Pontuação: ${playerPoints}`;

                input.value = '';
                isPlaying = false;
                resetGame();
            }
        }, 1000);
    }
}

function updateTime() {
    radioButtons.forEach((button) => {
        if (button.checked) {
            time = parseInt(button.getAttribute('data-level'), 10);
        }
    });
}

function resetGame() {
    randomWord.style.color = "white";
    clearInterval(timerInterval);
    isPlaying = false;
    input.value = '';
}

input.addEventListener('input', (e) => {
    if (!isPlaying) {
        startTimer();
    }
    isPlaying = true;
    const typedText = e.target.value;
    const currentWord = randomWord.textContent;

    if (typedText === currentWord) {
        playerPoints++;
        scoreDisplay.textContent = `Pontuação: ${playerPoints}`;
        randomWord.style.color = 'green';
        
        clearTimeout(timeOutTimer);
        timeOutTimer = setTimeout(() => {
            input.value = '';
            getRandomWord();
            randomWord.style.color = 'white';
        }, 500);
        
    } else if (typedText.length >= currentWord.length) {
        randomWord.style.color = 'red';
        clearTimeout(timeOutTimer);
    } else {
        randomWord.style.color = 'white';
        clearTimeout(timeOutTimer);
    }
});

function showResults() {
    clearTimeout(timeOutTimer);
    input.blur();
    resultDisplay.style.display = 'flex'
    timeOutTimer = setTimeout(() => {
        resultDisplay.style.opacity = '1';
    }, 300)
}

getRandomWord();
