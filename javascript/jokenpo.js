const playerScore = document.getElementById('player-score');
const enemyScore = document.getElementById('enemy-score');
const imgChoicePlayer = document.getElementById('choicePlayer');
const imgChoiceEnemy = document.getElementById('choiceEnemy');
const resultText = document.getElementById('resultText');
const playerOptions = document.querySelectorAll('.option');
const reset = document.getElementById('reset');
const options = ["pedra", "papel", "tesoura"];
let playerPoints = 0;
let enemyPoints = 0;
let isPlaying = false;
let isHoverEnabled = true;

const enableHoverEffect = () => {
    playerOptions.forEach((option) => {
        option.addEventListener('mouseover', () => {
            if (isHoverEnabled) {
                option.style.opacity = "1";
                option.style.cursor = "pointer";
            }
        });

        option.addEventListener('mouseout', () => {
            if (isHoverEnabled) {
                option.style.opacity = "0.5";
            }
        });
    });
};

const disableHoverEffect = () => {
    isHoverEnabled = false;
    playerOptions.forEach((option) => {
        option.style.opacity = "0.5";
    });
};

const enableHover = () => {
    isHoverEnabled = true;
};

enableHoverEffect();

playerOptions.forEach((option) => {
    option.onclick = () => {
        if (isPlaying) return;
        isPlaying = true;
        
        disableHoverEffect();

        imgChoicePlayer.src = "../images/icos/jokenpo/pedraPlayer.png";
        imgChoiceEnemy.src = "../images/icos/jokenpo/pedraInimigo.png";
        imgChoicePlayer.style.animation = "shakePlayer 0.3s 3";
        imgChoiceEnemy.style.animation = "shakeEnemy 0.3s 3";
        
        clearOptions(playerOptions);
        option.style.opacity = "1";
        option.setAttribute("data-selected", true);

        const movePlayer = option.getAttribute("data-option");
        const moveEnemy = choiceEnemy();

        imgChoicePlayer.addEventListener("animationend", () => {
            result(movePlayer, moveEnemy);
            isPlaying = false;
            enableHover();
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
        resultText.style.color = "var(--primaryColor)"
    } else if (
        (movePlayer === "pedra" && moveEnemy === "tesoura") ||
        (movePlayer === "papel" && moveEnemy === "pedra") ||
        (movePlayer === "tesoura" && moveEnemy === "papel")
    ) {
        resultText.textContent = "Você ganhou essa rodada!";
        resultText.style.color = "green"
        playerPoints++;
    } else {
        resultText.textContent = "Você perdeu essa rodada!";
        resultText.style.color = "red"
        enemyPoints++;
    }
    clearOptions(playerOptions);
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
