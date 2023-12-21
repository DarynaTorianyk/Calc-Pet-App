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
const operatorButtons = document.querySelectorAll('.purple-color');

let currentInput = '';
let previousInput = '';
let operator = '';
const MAX_DIGITS = 9;

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
  if (currentInput.length < MAX_DIGITS) {
    currentInput += number;

    if (currentInput.length == 6) {
      calculatorInput.classList.add('small-font');
    }  else if (currentInput.length >= 8) {
      calculatorInput.classList.remove('small-font');
      calculatorInput.classList.add('evenLess');    
    } else {
      calculatorInput.classList.remove('evenLess');
    }

    updateDisplay();
  }

  operatorButtons.forEach(button => button.classList.remove('active'));
}


function handleOperatorClick(op) {
  if (currentInput !== '' || previousInput !== '') {

    if (operator && currentInput !== '') {
      performCalculation();
    } else {
      if (previousInput !== '' && currentInput === '') {
      operator = op;
      } else {
      operator = op;
      previousInput = currentInput;
      }
      currentInput = '';
    }
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

  operatorButtons.forEach(button => button.classList.remove('active'));

  calculatorInput.classList.remove('small-font');
  calculatorInput.classList.remove('evenLess');
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
    subCalculatorInput.value = `${currentInput}`;
  } else {
    calculatorInput.value = currentInput;
    subCalculatorInput.value = currentInput;
  }
}

function handlePercentClick() {
  if (previousInput !== '' && currentInput !== '') {
    const result = parseFloat(previousInput) - (parseFloat(previousInput) * parseFloat(currentInput) / 100);
    currentInput = result.toString();

    updateDisplayForPercentClick();
  }
}

function handleDeleteClick() {
  if (operator.length > 0) {
    if (!isNaN(currentInput.slice(-1))) {
      currentInput = currentInput.slice(0, -1);
    }
    operator = operator.slice(0, -1);
  } else if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();

  operatorButtons.forEach(button => button.classList.remove('active'));
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
    case 'x':
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

for(let operatorButton of operatorButtons) {
  operatorButton.addEventListener('click', function () {
    if (operatorButton.textContent === '=') {
      return;
    }
    operatorButtons.forEach(button => button.classList.remove('active'));

    operatorButton.classList.add('active');
  })
}