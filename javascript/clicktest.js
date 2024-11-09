var clicks = 0;
const btn = document.getElementById('btn');
const res = document.getElementById('res');
const resMedia = document.querySelector('.cps')
const segundosEl = document.querySelector('.segundos');
const mlsegundosEl = document.querySelector('.mlsegundos');
const radioButtons = document.querySelectorAll('.segundoOption');
var selectedTime = 10000;
var timerInterval;
var isRunning = false;


radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        selectedTime = parseInt(radio.dataset.value) * 1000;
    });
});

btn.addEventListener('click', () => {
    if (!isRunning) {
        startTimer();
        isRunning = true;
    }
    clicks++;
    res.innerText = clicks;
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

        segundosEl.textContent = String(seconds).padStart(2, '0');
        mlsegundosEl.textContent = String(milliseconds).padStart(2, '0');

        if (elapsedTime >= selectedTime) {
            endTimer();
            clicks = 0
        }
    }, 10);
}

function endTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    const media = clicks / (selectedTime / 1000);
    btn.disabled = true;
    btn.style.cursor = 'default'
    resMedia.style.opacity = "1";
    resMedia.textContent = `${media.toFixed(1)}`;
    setTimeout(() =>{
        btn.style.cursor = 'pointer'
        btn.innerHTML = 'Clique novamente'
        btn.disabled = false
        btn.addEventListener('click', () => {
            if (!isRunning) {
                startTimer();
                isRunning = true;
            }
            res.innerText = clicks;
            btn.classList.add("active")
            setTimeout(() => {
                btn.classList.remove("active");
            }, 50);
        });
    }, 1000)
}
