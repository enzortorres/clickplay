document.addEventListener("DOMContentLoaded", function () {
    const linhaCarregamento = document.querySelector('.linhaCarregamento');
    const btnJogar = document.querySelector('.btnJogarCarregamento');

    linhaCarregamento.addEventListener('animationend', function() {
        btnJogar.classList.add('active');
    });
});
