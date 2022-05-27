// Elements
const buttons = document.querySelectorAll("#buttonsContainer > button");
const displayTop = document.querySelector("#displayTop");
const displayBottom = document.querySelector("#displayBot");

// Global Variables
let firstNumber = "";
let secondNumber = "";
let operationType = "";
let isOperationActive = false;
let isSameOperation = false;
let isFirstCalculation = true;
let isFirstButtonPress = true;
let result = null;
let previousResult = null;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let id = e.target.id;

    displayInputs(id);
    setupCalculationInputs(id);

    if (id === "delete") erase(displayBottom);
    if (id === "clear") clear();

    if (id === "equals") {
      calculate();
      displayResult();
      firstNumber = result;
      isSameOperation = true;
      previousResult = result;
    }
  });
});

function calculate() {
  if (operationType === "add") result = add(parseFloat(firstNumber), parseFloat(secondNumber));
  if (operationType === "subtract") result = subtract(parseFloat(firstNumber), parseFloat(secondNumber));
  if (operationType === "multiply") result = multiply(parseFloat(firstNumber), parseFloat(secondNumber));
  if (operationType === "divide") result = divide(parseFloat(firstNumber), parseFloat(secondNumber));
  isFirstCalculation = false;
}

function displayResult() {
  if (isSameOperation) {
    if (operationType === "add") displayTop.innerText = `${previousResult}+${secondNumber}`;
    if (operationType === "subtract") displayTop.innerText = `${previousResult}-${secondNumber}`;
    if (operationType === "multiply") displayTop.innerText = `${previousResult}*${secondNumber}`;
    if (operationType === "divide") displayTop.innerText = `${previousResult}/${secondNumber}`;
  } else if (isFirstCalculation) {
    displayTop.innerText = displayBottom.innerText;
  } else {
    if (operationType === "add") displayTop.innerText = `${firstNumber}+${secondNumber}`;
    if (operationType === "subtract") displayTop.innerText = `${firstNumber}-${secondNumber}`;
    if (operationType === "multiply") displayTop.innerText = `${firstNumber}*${secondNumber}`;
    if (operationType === "divide") displayTop.innerText = `${firstNumber}/${secondNumber}`;
  }

  displayBottom.innerText = `=${result}`;
}

function setupCalculationInputs(id) {
  if (id === "one") {
    if (!isOperationActive) firstNumber += "1";
    if (isOperationActive) secondNumber += "1";
  }
  if (id === "two") {
    if (!isOperationActive) firstNumber += "2";
    if (isOperationActive) secondNumber += "2";
  }
  if (id === "three") {
    if (!isOperationActive) firstNumber += "3";
    if (isOperationActive) secondNumber += "3";
  }
  if (id === "four") {
    if (!isOperationActive) firstNumber += "4";
    if (isOperationActive) secondNumber += "4";
  }
  if (id === "five") {
    if (!isOperationActive) firstNumber += "5";
    if (isOperationActive) secondNumber += "5";
  }
  if (id === "six") {
    if (!isOperationActive) firstNumber += "6";
    if (isOperationActive) secondNumber += "6";
  }
  if (id === "seven") {
    if (!isOperationActive) firstNumber += "7";
    if (isOperationActive) secondNumber += "7";
  }
  if (id === "eight") {
    if (!isOperationActive) firstNumber += "8";
    if (isOperationActive) secondNumber += "8";
  }
  if (id === "nine") {
    if (!isOperationActive) firstNumber += "9";
    if (isOperationActive) secondNumber += "9";
  }
  if (id === "zero") {
    if (!isOperationActive) firstNumber += "0";
    if (isOperationActive) secondNumber += "0";
  }
  if (id === "dot") {
    if (!isOperationActive) firstNumber += ".";
    if (isOperationActive) secondNumber += ".";
  }
  if (id === "plus") {
    operationType = "add";
    isOperationActive = true;
    secondNumber = "";
  }
  if (id === "minus") {
    operationType = "subtract";
    isOperationActive = true;
    isSameOperation = false;
    secondNumber = "";
  }
  if (id === "star") {
    operationType = "multiply";
    isOperationActive = true;
    isSameOperation = false;
    secondNumber = "";
  }
  if (id === "backtick") {
    operationType = "divide";
    isOperationActive = true;
    isSameOperation = false;
    secondNumber = "";
  }
}

function displayInputs(id) {
  switch (id) {
    case "one":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText += "1";
      break;
    case "two":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText += "2";
      break;
    case "three":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText += "3";
      break;
    case "four":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText += "4";
      break;
    case "five":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText += "5";
      break;
    case "six":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText += "6";
      break;
    case "seven":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText += "7";
      break;
    case "eight":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText += "8";
      break;
    case "nine":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText += "9";
      break;
    case "zero":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText += "0";
      break;
    case "plus":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText += "+";
      break;
    case "minus":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText += "-";
      break;
    case "star":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText += "*";
      break;
    case "backtick":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText += "/";
      break;
    case "dot":
      displayBottom.innerText += ".";
      break;

    default:
      break;
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function clear() {
  displayTop.innerText = "";
  displayBottom.innerText = "0";

  firstNumber = "";
  secondNumber = "";
  operationType = "";
  isOperationActive = false;
  isSameOperation = false;
  isFirstCalculation = true;
  isFirstButtonPress = true;
  result = null;
  previousResult = null;
}

function erase(displayElement) {
  displayElement.innerText = displayElement.innerText.slice(0, displayElement.innerText.length - 1);
}
