/**
 * The main JavaScript file for the calculator application.
 *
 * @file This file contains the logic for the calculator application.
 * It defines functions to handle button clicks, perform calculations,
 * update the display, and handle keyboard inputs.
 *
 * @summary Calculator application logic.
 * @since 1.0.0
 * @version 1.0.0
 */

// FILEPATH: /home/mark00/repos/odin-project---calculator/main.js

// Selecting DOM elements
let container = document.querySelector('.container');
let display = document.querySelector('.display');

// Object containing references to all the calculator buttons
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

// Variables to store the current and previous operands, and the current operation
let currentOperand = '';
let previousOperand = '';
let operation = undefined;

// Maximum number allowed in calculations
const MAX_NUMBER = 9007199254740991;

/**
 * Updates the display with the current operand and operation.
 * If there is no operation or previous operand, only the current operand is displayed.
 *
 * @function
 * @returns {void}
 */
function updateDisplay() {
  if (operation !== undefined && previousOperand !== '') {
    display.textContent = `${previousOperand} ${operation} ${currentOperand}`;
  } else {
    display.textContent = currentOperand;
  }
  adjustFontSize();
}

/**
 * Appends a number to the current operand.
 * If the display length exceeds 30 characters, the number is not appended.
 * If the resulting number exceeds the maximum allowed number, it is not appended.
 *
 * @function
 * @param {number} number - The number to append.
 * @returns {void}
 */
function appendNumber(number) {
  if (display.textContent.length >= 30) {
    return;
  }

  if (parseFloat(currentOperand + number.toString()) > MAX_NUMBER) {
    return;
  }

  currentOperand += number.toString();
  updateDisplay();
  adjustFontSize();
  disableDecimalButton();
}

/**
 * Sets the chosen operation and performs the calculation if necessary.
 *
 * @function
 * @param {string} op - The operation to perform.
 * @returns {void}
 */
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

/**
 * Performs the calculation based on the current operation and operands.
 *
 * @function
 * @returns {void}
 */
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

  if (currentOperand > MAX_NUMBER) {
    currentOperand = 'Error: Number is too large';
    return;
  }

  if (currentOperand % 1 !== 0) {
    currentOperand = parseFloat(currentOperand.toFixed(2));
  }

  operation = undefined;
  previousOperand = '';
}

/**
 * Performs the calculation and updates the display.
 *
 * @function
 * @returns {void}
 */
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

/**
 * Clears the current and previous operands, and the operation.
 *
 * @function
 * @returns {void}
 */
function clear() {
  currentOperand = '';
  previousOperand = '';
  operation = undefined;

  updateDisplay();
  disableDecimalButton();
}

/**
 * Deletes the last character from the current operand.
 *
 * @function
 * @returns {void}
 */
function deleteNumber() {
  currentOperand = currentOperand.toString().slice(0, -1);
  updateDisplay();
}

/**
 * Appends a decimal point to the current operand if it doesn't already contain one.
 *
 * @function
 * @returns {void}
 */
function appendDecimal() {
  if (!currentOperand.includes('.')) {
    currentOperand += '.';
  }
  updateDisplay();
  disableDecimalButton();
}

/**
 * Disables the decimal button if the current operand already contains a decimal point.
 *
 * @function
 * @returns {void}
 */
function disableDecimalButton() {
  const decimalIndex = currentOperand.indexOf('.');
  if (decimalIndex !== -1 && decimalIndex < currentOperand.length - 1) {
    buttons.decimal.disabled = true;
  } else {
    buttons.decimal.disabled = false;
  }
}

/**
 * Handles key press events and performs the corresponding action.
 *
 * @function
 * @param {KeyboardEvent} e - The key press event.
 * @returns {void}
 */
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

/**
 * Adjusts the font size of the display based on its content length.
 *
 * @function
 * @returns {void}
 */
function adjustFontSize() {
  const display = document.querySelector('.display');
  let length = display.textContent.length;

  if (length > 20) {
    display.style.fontSize = '15px';
  } else if (length > 15) {
    display.style.fontSize = '20px';
  } else if (length > 10) {
    display.style.fontSize = '30px';
  } else {
    display.style.fontSize = '50px';
  }
}

// Event listeners for button clicks
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
  buttons.clear.blur();
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

// Prevent form submission
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}
