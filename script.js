const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

// Global Variables
let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

// Calculating first and second values
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

// Display Number
function sendNumberValue(number) {
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

// Add Decimal value
function addDecimal() {
  // if operator pressed don't add decimal
  if (awaitingNextValue) return;
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  //   Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  //   set First value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  //   Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset and Clear Btn
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

// Add Event Listeners for number, operators and decimal Button
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => {
      sendNumberValue(inputBtn.value);
    });
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => {
      useOperator(inputBtn.value);
    });
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => {
      addDecimal();
    });
  }
});

// Event Listener
clearBtn.addEventListener("click", resetAll);
