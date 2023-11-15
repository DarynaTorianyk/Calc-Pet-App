function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
            document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-light');
            document.getElementById('slider').checked = true;
            }
})();


const buttons = document.querySelectorAll('.buttons__buttonNumbers');

function buttonAnimation(event) {
    const circle = document.createElement('div');
    const x = event.layerX;
    const y = event.layerY;
    circle.classList.add('circle');
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    this.appendChild(circle);

    circle.addEventListener('animationend', () => {
    this.removeChild(circle);
})
}

for (let button of buttons) {
    button.addEventListener('click', buttonAnimation);
};
