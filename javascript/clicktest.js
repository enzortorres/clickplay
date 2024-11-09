var clicksResults = 0;
var click = document.getElementById('res')
const btn = document.getElementById('btn');
const res = document.querySelector('.qtdCliques')
const resMedia = document.querySelector('.cps')
const segundosResult = document.querySelector('.segundosDesempenho');
const segundosEl = document.querySelector('.segundosMain')
const mlsegundosEl = document.querySelector('.mlsegundosMain');
const radioButtons = document.querySelectorAll('.segundoOption');
var selectedTime = 10000;
var timerInterval;
var isRunning = false;
var imgEstrela = document.querySelector('.imgEstrela')
var telaResultado = document.querySelector('.telaResultado')
var fecharResultado = document.querySelector('.fechar')

radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        selectedTime = parseInt(radio.dataset.value) * 1000;
    });
});
const startClickHandler = (event) => {
    event.preventDefault();
};

btn.addEventListener('click', function clique(){
    if (!isRunning) {
        startTimer();
        isRunning = true;
        radioButtons.forEach(radio => {
            radio.addEventListener('click', startClickHandler);
        });
    }
    clicksResults++;
    click.innerHTML = clicksResults
    res.innerText = clicksResults;
    btn.classList.add("active")
    setTimeout(() => {
        btn.classList.remove("active");
    }, 50);
});

function startTimer() {
    let startTime = Date.now();
    timerInterval = setInterval(() => {
        let elapsedTime = Date.now() - startTime;
        let seconds = Math.floor(elapsedTime / 1000);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        segundosResult.textContent = String(seconds).padStart(1, '0');
        segundosEl.textContent = String(seconds).padStart(2, '0');
        mlsegundosEl.textContent = String(milliseconds).padStart(2, '0');

        if (elapsedTime >= selectedTime) {
            endTimer();
            clicksResults = 0
        }
    }, 10);

}

function endTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    const media = clicksResults / (selectedTime / 1000);
    btn.disabled = true;
    btn.style.cursor = 'default'
    resMedia.style.opacity = "1";
    resMedia.textContent = `${media.toFixed(1)}`;
    switch(true){
        case (media < 4):             
            imgEstrela.setAttribute('src','../images/umaestrela.png')
            break
        case (media < 6):
            imgEstrela.setAttribute('src','../images/duasestrelas.png')
            break
        case (media < 9):
            imgEstrela.setAttribute('src','../images/tresestrelas.png')
            break
        case (media < 12):
            imgEstrela.setAttribute('src','../images/quatroestrelas.png')
            break
        case (media >= 12):
            imgEstrela.setAttribute('src','../images/cincoestrelas.png')
            break
    }
    const clickHandler = (event) => {
        event.preventDefault();
    };
    telaResultado.classList.add('resultadoAparecer')

    radioButtons.forEach(radio => {
        radio.addEventListener('click', clickHandler);
    });

    fecharResultado.addEventListener('click', () =>{
        telaResultado.classList.remove('resultadoAparecer')
        radioButtons.forEach(radio => {
            radio.removeEventListener('click', clickHandler);
        })
        radioButtons.forEach(radio => {
            radio.removeEventListener('click', startClickHandler)
        })
    })

    setTimeout(() =>{
        btn.style.cursor = 'pointer'
        btn.disabled = false
        btn.addEventListener('click', () => {
            if (!isRunning) {
                startTimer();
                isRunning = true;
            }
            res.innerText = clicksResults;
            btn.classList.add("active")
            setTimeout(() => {
                btn.classList.remove("active");
            }, 50);
        });
    }, 1000)
}
