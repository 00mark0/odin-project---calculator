let container = document.querySelector('.container');
let display = document.querySelector('.display');
const buttons = {
  zero: document.querySelector('#number-0'),
  one: document.querySelector('#number-1'),
  two: document.querySelector('#number-2'),
  three: document.querySelector('#number-3'),
  four: document.querySelector('#number-4'),
  five: document.querySelector('#number-5'),
  six: document.querySelector('#number-6'),
  seven: document.querySelector('#number-7'),
  eight: document.querySelector('#number-8'),
  nine: document.querySelector('#number-9'),
  plus: document.querySelector('#plus'),
  minus: document.querySelector('#minus'),
  multiply: document.querySelector('#multiply'),
  divide: document.querySelector('#divide'),
  equals: document.querySelector('#equal'),
  clear: document.querySelector('#clear'),
  power: document.querySelector('#power'),
  percentage: document.querySelector('#percentage'),
  delete: document.querySelector('#delete'),
  decimal: document.querySelector('#decimal'),
};

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

function updateDisplay() {
  if (operation !== undefined && previousOperand !== '') {
    display.textContent = `${previousOperand} ${operation} ${currentOperand}`;
  } else {
    display.textContent = currentOperand;
  }
}

function appendNumber(number) {
  currentOperand += number.toString();
  updateDisplay();
  disableDecimalButton();
}

function chooseOperation(op) {
  if (currentOperand === '') {
    return;
  }

  if (previousOperand !== '' || operation) {
    compute();
    equals();
  }

  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
  updateDisplay();
}

function compute() {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      currentOperand = prev + current;
      break;
    case '-':
      currentOperand = prev - current;
      break;
    case '*':
      currentOperand = prev * current;
      break;
    case '/':
      if (current === 0) {
        // Prevent division by zero
        alert('Error: Division by zero is not allowed');
        clear();
        return;
      }
      currentOperand = prev / current;
      break;
    case '^':
      currentOperand = Math.pow(prev, current);
      break;
    case '%':
      currentOperand = (prev / 100) * current;
      break;
    default:
      return;
  }

  if (currentOperand % 1 !== 0) {
    currentOperand = parseFloat(currentOperand.toFixed(2));
  }

  operation = undefined;
  previousOperand = '';
}

function equals() {
  if (
    operation !== undefined &&
    currentOperand !== '' &&
    previousOperand !== ''
  ) {
    compute();
  }
  updateDisplay();
}

function clear() {
  currentOperand = '';
  previousOperand = '';
  operation = undefined;

  updateDisplay();
  disableDecimalButton();
}

function deleteNumber() {
  currentOperand = currentOperand.toString().slice(0, -1);
  updateDisplay();
}

function appendDecimal() {
  if (!currentOperand.includes('.')) {
    currentOperand += '.';
  }
  updateDisplay();
  disableDecimalButton();
}

function disableDecimalButton() {
  const decimalIndex = currentOperand.indexOf('.');
  if (decimalIndex !== -1 && decimalIndex < currentOperand.length - 1) {
    buttons.decimal.disabled = true;
  } else {
    buttons.decimal.disabled = false;
  }
}

function handleKeyPress(e) {
  switch (e.key) {
    case '0':
      appendNumber(0);
      break;
    case '1':
      appendNumber(1);
      break;
    case '2':
      appendNumber(2);
      break;
    case '3':
      appendNumber(3);
      break;
    case '4':
      appendNumber(4);
      break;
    case '5':
      appendNumber(5);
      break;
    case '6':
      appendNumber(6);
      break;
    case '7':
      appendNumber(7);
      break;
    case '8':
      appendNumber(8);
      break;
    case '9':
      appendNumber(9);
      break;
    case '+':
      chooseOperation('+');
      break;
    case '-':
      chooseOperation('-');
      break;
    case '*':
      chooseOperation('*');
      break;
    case '/':
      chooseOperation('/');
      break;
    case 'Enter':
      equals();
      break;
    case 'c':
      clear();
      break;
    case '^':
      chooseOperation('^');
      break;
    case '%':
      chooseOperation('%');
      break;
    case 'Backspace':
      deleteNumber();
      break;
    case '.':
      appendDecimal();
      break;
    default:
      return;
  }
}

buttons.zero.addEventListener('click', () => appendNumber(0));
buttons.one.addEventListener('click', () => appendNumber(1));
buttons.two.addEventListener('click', () => appendNumber(2));
buttons.three.addEventListener('click', () => appendNumber(3));
buttons.four.addEventListener('click', () => appendNumber(4));
buttons.five.addEventListener('click', () => appendNumber(5));
buttons.six.addEventListener('click', () => appendNumber(6));
buttons.seven.addEventListener('click', () => appendNumber(7));
buttons.eight.addEventListener('click', () => appendNumber(8));
buttons.nine.addEventListener('click', () => appendNumber(9));
buttons.clear.addEventListener('click', () => {
  clear();
  clear.blur();
});
buttons.plus.addEventListener('click', () => chooseOperation('+'));
buttons.minus.addEventListener('click', () => chooseOperation('-'));
buttons.multiply.addEventListener('click', () => chooseOperation('*'));
buttons.divide.addEventListener('click', () => chooseOperation('/'));
buttons.equals.addEventListener('click', equals);
buttons.power.addEventListener('click', () => chooseOperation('^'));
buttons.percentage.addEventListener('click', () => chooseOperation('%'));
window.addEventListener('keydown', handleKeyPress);
buttons.delete.addEventListener('click', deleteNumber);
buttons.decimal.addEventListener('click', appendDecimal);

const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}
