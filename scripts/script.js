const switchTheme = document.getElementById('theme-switch');
const checkbox = document.getElementById('checkbox');
const nav = document.querySelector('.ulNav')

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        nav.classList.toggle('active');
    } else {
        nav.classList.remove('active');
    }
});

switchTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    let className = document.body.className;
    if (className == 'light-theme') {
        switchTheme.style.backgroundImage = 'url("../images/sun.png")';
    } else {
        switchTheme.style.backgroundImage = 'url("../images/moon.png")';
    }
})