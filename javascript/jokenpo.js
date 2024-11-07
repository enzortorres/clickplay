const playerScore = document.getElementById('player-score');
const enemyScore = document.getElementById('enemy-score');
const imgChoicePlayer = document.getElementById('choicePlayer');
const imgChoiceEnemy = document.getElementById('choiceEnemy');
const resultText = document.getElementById('resultText');
const reset = document.getElementById('reset');

const options = ["pedra", "papel", "tesoura"]
const playerOptions = document.querySelectorAll('.option');
let playerPoints = 0;
let enemyPoints = 0;
let isPlaying = false; // Controla se uma jogada está em andamento

playerOptions.forEach((option) => {
    option.onclick = () => {
        if (isPlaying) return; // Impede outra jogada enquanto uma está em andamento
        isPlaying = true;

        imgChoicePlayer.src = "../images/icos/jokenpo/pedraPlayer.png";
        imgChoiceEnemy.src = "../images/icos/jokenpo/pedraInimigo.png";
        imgChoicePlayer.style.animation = "shakePlayer 0.3s 3";
        imgChoiceEnemy.style.animation = "shakeEnemy 0.3s 3";
        
        clearOptions(playerOptions);
        option.style.opacity = "1";
        option.setAttribute("data-selected", true);

        const movePlayer = option.getAttribute("data-option");
        const moveEnemy = choiceEnemy();

        // Aguardar a animação terminar antes de mostrar o resultado
        imgChoicePlayer.addEventListener("animationend", () => {
            result(movePlayer, moveEnemy);
            isPlaying = false;
        }, { once: true });
    };
});

const choiceEnemy = () => {
    const randomOption = Math.floor(Math.random() * options.length);
    return options[randomOption];
};

const result = (movePlayer, moveEnemy) => {
    imgChoicePlayer.style.animation = '';
    imgChoiceEnemy.style.animation = '';
    imgChoicePlayer.src = `../images/icos/jokenpo/${movePlayer}Player.png`;
    imgChoiceEnemy.src = `../images/icos/jokenpo/${moveEnemy}Inimigo.png`;

    if (movePlayer === moveEnemy) {
        resultText.textContent = "Você empatou essa rodada!";
    } else if (
        (movePlayer === "pedra" && moveEnemy === "tesoura") ||
        (movePlayer === "papel" && moveEnemy === "pedra") ||
        (movePlayer === "tesoura" && moveEnemy === "papel")
    ) {
        resultText.textContent = "Você ganhou essa rodada!";
        playerPoints++;
    } else {
        resultText.textContent = "Você perdeu essa rodada!";
        enemyPoints++;
    }

    playerScore.textContent = playerPoints;
    enemyScore.textContent = enemyPoints;
};

const clearOptions = (array) => {
    array.forEach((value) => {
        value.setAttribute("data-selected", false);
        value.style.opacity = "0.5";
    });
};

reset.addEventListener("click", (e) => {
    e.preventDefault();
    clearOptions(playerOptions);
    imgChoicePlayer.src = "../images/icos/jokenpo/pedraPlayer.png";
    imgChoiceEnemy.src = "../images/icos/jokenpo/pedraInimigo.png";
    playerPoints = 0;
    enemyPoints = 0;
    playerScore.textContent = '0';
    enemyScore.textContent = '0';
    resultText.textContent = "Escolha sua jogada!";
});
