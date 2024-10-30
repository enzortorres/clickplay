const checkbox = document.getElementById('checkbox');
const nav = document.querySelector('.ulNav')
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        nav.classList.toggle('active');
    } else {
        nav.classList.remove('active');
    }
});