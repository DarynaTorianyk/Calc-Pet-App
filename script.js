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


const buttons = document.querySelectorAll('.buttons__numbers');
const calculatorInput = document.querySelector('.calculatorInput');
const subCalculatorInput = document.querySelector('.subCalculatorInput');

let currentInput = '';
let previousInput = '';
let operator = '';

function updateDisplay() {
  if (previousInput !== '') {
    calculatorInput.value = currentInput;
    subCalculatorInput.value = `${previousInput}${operator}${currentInput}`;
  } else {
    calculatorInput.value = currentInput;
    subCalculatorInput.value = currentInput;
  }
}

function handleNumberClick(number) {
  currentInput += number;
  updateDisplay();
}

function handleOperatorClick(op) {
  if (currentInput !== '' || previousInput !== '') {
    performCalculation();

    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
  }
}

function handleEqualsClick() {
  if (previousInput !== '' && currentInput !== '') {
    performCalculation();
    operator = '';
  }
}

function handleClearClick() {
  currentInput = '';
  previousInput = '';
  operator = '';
  updateDisplay();
}

function handlePlusMinusClick() {
  if (currentInput !== '') {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
  }
}

function updateDisplayForPercentClick() {
  if (previousInput !== '') {
    calculatorInput.value = currentInput;
    subCalculatorInput.value = `${parseFloat(currentInput)}`;
  } else {
    calculatorInput.value = currentInput;
    subCalculatorInput.value = currentInput;
  }
}

function handlePercentClick() {
  if (currentInput !== '' && previousInput !== '') {
    const percentage = parseFloat(previousInput) * (parseFloat(currentInput) / 100);
    currentInput = (parseFloat(previousInput) - percentage).toString();
    updateDisplayForPercentClick();
  }
}

function handleDeleteClick() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function performCalculation() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  switch (operator) {
    case '+':
      currentInput = (num1 + num2).toString();
      break;
    case '-':
      currentInput = (num1 - num2).toString();
      break;
    case 'X':
      currentInput = (num1 * num2).toString();
      break;
    case '/':
      currentInput = (num1 / num2).toString();
      break;
  }
  previousInput = '';
  updateDisplay();
}

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
  });
}

for (let button of buttons) {
  button.addEventListener('click', function (event) {
    buttonAnimation.call(this, event);
    const buttonText = this.textContent;
    switch (buttonText) {
      case 'C':
        handleClearClick();
        break;
      case '+/-':
        handlePlusMinusClick();
        break;
      case '%':
        handlePercentClick();
        break;
      case '=':
        handleEqualsClick();
        break;
      case 'del':
        handleDeleteClick();
        break;
      default:
        if (!isNaN(parseFloat(buttonText)) || buttonText === '.') {
          handleNumberClick(buttonText);
        } else {
          handleOperatorClick(buttonText);
        }
        break;
    }
  });
}