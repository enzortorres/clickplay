//!Menu Responsivo
const nav = document.querySelector('.ulNav')
const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        nav.classList.toggle('active');
    } else {
        nav.classList.remove('active');
    }
});

//!Tema claro/escuro
const switchTheme = document.getElementById('theme-switch');
switchTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    let className = document.body.className;
    if (className == 'light-theme') {
        switchTheme.src = "../images/sun.png";
    } else {
        switchTheme.src = "../images/moon.png";
    }
})

//!Efeito fadein
const observador = new IntersectionObserver ( (evento) => {
    evento.forEach( (ev) => {
        if(ev.isIntersecting){
            ev.target.classList.add('show')
        } else{
            ev.target.classList.remove('show')
        }
    })
})
const elements = document.querySelectorAll('.hidden')
elements.forEach((elements) => observador.observe(elements))


