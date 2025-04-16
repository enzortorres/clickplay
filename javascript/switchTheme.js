//!Tema claro/escuro
const switchTheme = document.getElementById('theme-switch');
switchTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    let className = document.body.className;
    if (className == 'light-theme') {
        switchTheme.src = "images/sun.png";
    } else {
        switchTheme.src = "images/moon.png";
    }
})