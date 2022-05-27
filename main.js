let buttons = document.querySelectorAll("#buttonsContainer > button");
let displayTop = document.querySelector("#displayTop");
let displayBot = document.querySelector("#displayBot");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let id = e.target.id;
    displayInput(id);
    if (id === "delete") erase(displayBot);
    if (id === "equals") calculateInput(id);
  });
});

let firstNumber;
let operationType;
let isOperationActive = false;
let secondNumber;
let rezult;

function calculateInput(id) {
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
  if (id === "0") {
    if (!isOperationActive) firstNumber += "0";
    if (isOperationActive) secondNumber += "0";
  }
  if (id === "plus") {
    operationType = "add";
    isOperationActive = true;
  }
  if (id === "minus") {
    operationType = "subtract";
    isOperationActive = true;
  }
  if (id === "star") {
    operationType = "multiply";
    isOperationActive = true;
  }
  if (id === "backtick") {
    operationType = "divide";
    isOperationActive = true;
  }
}

function displayInput(id) {
  switch (id) {
    case "one":
      displayBot.innerText += "1";
      break;
    case "two":
      displayBot.innerText += "2";
      break;
    case "three":
      displayBot.innerText += "3";
      break;
    case "four":
      displayBot.innerText += "4";
      break;
    case "five":
      displayBot.innerText += "5";
      break;
    case "six":
      displayBot.innerText += "6";
      break;
    case "seven":
      displayBot.innerText += "7";
      break;
    case "eight":
      displayBot.innerText += "8";
      break;
    case "nine":
      displayBot.innerText += "9";
      break;
    case "zero":
      displayBot.innerText += "0";
      break;
    case "plus":
      displayBot.innerText += "+";
      break;
    case "minus":
      displayBot.innerText += "-";
      break;
    case "star":
      displayBot.innerText += "*";
      break;
    case "backtick":
      displayBot.innerText += "/";
      break;
    case "dot":
      displayBot.innerText += ".";
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
  displayBot.innerText = "";
}

function erase(displayElement) {
  displayElement.innerText = displayElement.innerText.slice(0, displayElement.innerText.length - 1);
  firstNumber = null;
  secondNumber = null;
  operation = null;
  rezult = null;
}
