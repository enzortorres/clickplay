const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const gameContainer = document.querySelector(".game-container");
const controls = document.querySelector(".controls-container");
const resultDisplay = document.getElementById("result");
const resultText = document.getElementById("result-text");
const close = document.getElementById("close");
let secondCard = false;
let firstCard = false;
let interval;
let cards;

const items = [
    { name: "html", image: "../images/icos/memoria/htmllogo.png" },
    { name: "css", image: "../images/icos/memoria/csslogo.png" },
    { name: "javascript", image: "../images/icos/memoria/javascriptlogo.png" },
    { name: "react", image: "../images/icos/memoria/reactlogo.png" },
    { name: "vue", image: "../images/icos/memoria/vuelogo.png" },
    { name: "cpp", image: "../images/icos/memoria/cpplogo.png" },
    { name: "java", image: "../images/icos/memoria/javalogo.png" },
    { name: "python", image: "../images/icos/memoria/pythonlogo.png" },
];

let seconds = 0,
    minutes = 0;
let movesCount = 0,
    winCount = 0;

const timeGenerator = () => {
    seconds += 1;
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Timer:</span> ${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Jogadas: </span>${movesCount}`;
};

const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardValues = [];
    size = (size * size) / 2;
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
        gameContainer.innerHTML += `
            <div class="card-container" data-card-value="${cardValues[i].name}">
                <div class="card-before">?</div>
                <div class="card-after">
                <img src="${cardValues[i].image}" class="image"/></div>
            </div>
            `;
    }
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("matched")) {
                card.classList.add("flipped");
                if (!firstCard) {
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                } else {
                    movesCounter();
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue) {
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        firstCard = false;
                        winCount += 1;
                        if (winCount == Math.floor(cardValues.length / 2)) {
                            showResults();
                            stopGame();
                        }
                    } else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        }, 900);
                    }
                }
            }
        });
    });
};

window.addEventListener("load", () => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    controls.classList.add("hide");
    interval = setInterval(timeGenerator, 1000);
    moves.innerHTML = `<span>Jogadas:</span> ${movesCount}`;
    initializer();
});

const initializer = () => {
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};

function showResults() {
    clearInterval(interval);
    resultDisplay.style.display = "flex";
    resultText.innerHTML = `Parabéns você ganhou com ${movesCount} jogadas!<br>
    Em ${minutes} minutos e ${seconds} segundos!`
    
    setTimeout(() => {
        resultDisplay.style.opacity = "1";
    }, 500);
}

close.addEventListener("click", () => {
    resultDisplay.style.opacity = "0";
    
    setTimeout(() => {
        resultDisplay.style.display = "none";
        restartGame();
    }, 300);
});

const restartGame = () => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    winCount = 0;
    moves.innerHTML = `<span>Jogadas:</span> ${movesCount}`;
    timeValue.innerHTML = `<span>Timer:</span> 00:00`;
    
    clearInterval(interval);
    interval = setInterval(timeGenerator, 1000);
    initializer();
};