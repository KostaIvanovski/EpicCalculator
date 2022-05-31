//TODO: Maybe remove the = from the display (depends)
//TODO: Error handling (NaN, operations with NaN, having more than one dot, refreshing etc.)
//TODO: Test out more examples

// Elements
const buttons = document.querySelectorAll("#buttonsContainer > button");
const displayTop = document.querySelector("#displayTop");
const displayBottom = document.querySelector("#displayBot");

// Global Variables
let firstNumber = "";
let secondNumber = "";
let operationType = "";
let result = "";
let isOperationActive = false;
let isSameOperation = false;
let isFirstCalculation = true;
let isFirstButtonPress = true;
let previousResult = null;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let id = e.target.id;

    if (
      isFirstButtonPress &&
      (id === "plus" || id === "minus" || id === "star" || id === "backtick" || id === "dot" || id === "power" || id === "squareRoot" || id === "equals")
    ) {
      clear();
      return;
    }

    if (isOperationActive && (id === "plus" || id === "minus" || id === "star" || id === "backtick" || id === "power" || id === "squareRoot")) {
      if (secondNumber === "") return;
      calculate();
      displayResult();
      reArrange();
      displayInputs(id);
      identifyInputs(id);
      return;
    }

    displayInputs(id);
    identifyInputs(id);
    if (id === "delete") erase();
    if (id === "clear") clear();
    if (id === "equals") {
      if (parseFloat(secondNumber) === 0) {
        clear();
        throw alert("You cant divide with 0 :)");
      }
      if (secondNumber === "" || operationType === "") {
        clear();
        return;
      }
      calculate();
      displayResult();
      reArrange();
    }
  });
});

function calculate() {
  if (operationType === "add") result = parseFloat(firstNumber) + parseFloat(secondNumber);
  if (operationType === "subtract") result = parseFloat(firstNumber) - parseFloat(secondNumber);
  if (operationType === "multiply") result = parseFloat(firstNumber) * parseFloat(secondNumber);
  if (operationType === "divide") result = parseFloat(firstNumber) / parseFloat(secondNumber);
  if (operationType === "power") result = Math.pow(parseFloat(firstNumber), parseFloat(secondNumber));
  if (operationType === "squareRoot") result = Math.sqrt(parseFloat(firstNumber));
  isFirstCalculation = false;
}

function displayResult() {
  if (isSameOperation) {
    if (operationType === "add") displayTop.innerText = `${previousResult}+${secondNumber}`;
    if (operationType === "subtract") displayTop.innerText = `${previousResult}-${secondNumber}`;
    if (operationType === "multiply") displayTop.innerText = `${previousResult}*${secondNumber}`;
    if (operationType === "divide") displayTop.innerText = `${previousResult}/${secondNumber}`;
    if (operationType === "power") displayTop.innerText = `${previousResult}^${secondNumber}`;
    if (operationType === "squareRoot") displayTop.innerText = `\u221a${previousResult}`;
  } else if (isFirstCalculation) {
    displayTop.innerText = displayBottom.innerText;
  } else {
    if (operationType === "add") displayTop.innerText = `${firstNumber}+${secondNumber}`;
    if (operationType === "subtract") displayTop.innerText = `${firstNumber}-${secondNumber}`;
    if (operationType === "multiply") displayTop.innerText = `${firstNumber}*${secondNumber}`;
    if (operationType === "divide") displayTop.innerText = `${firstNumber}/${secondNumber}`;
    if (operationType === "power") displayTop.innerText = `${firstNumber}^${secondNumber}`;
    if (operationType === "squareRoot") displayTop.innerText = `\u221a${firstNumber}`;
  }
  displayBottom.innerText = `=${result}`;
}

function identifyInputs(id) {
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
    if (!isOperationActive && firstNumber.split("").indexOf(".") === -1) firstNumber += ".";
    if (isOperationActive && secondNumber.split("").indexOf(".") === -1) secondNumber += ".";
  }
  if (id === "plus") {
    operationType = "add";
    isOperationActive = true;
    isSameOperation = false;
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
  if (id === "power") {
    operationType = "power";
    isOperationActive = true;
    isSameOperation = false;
    secondNumber = "";
  }
  if (id === "squareRoot") {
    operationType = "squareRoot";
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
    case "power":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText += "^";
      break;
    case "squareRoot":
      if (isFirstButtonPress) {
        displayBottom.innerText = "";
        isFirstButtonPress = false;
      }
      displayBottom.innerText = "\u221a" + displayBottom.innerText;
      break;
    case "dot":
      if (!isOperationActive && firstNumber.split("").indexOf(".") === -1 && firstNumber !== "") displayBottom.innerText += ".";
      if (isOperationActive && secondNumber.split("").indexOf(".") === -1 && secondNumber !== "") displayBottom.innerText += ".";
      break;

    default:
      break;
  }
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

function erase() {
  displayBottom.innerText = displayBottom.innerText.slice(0, displayBottom.innerText.length - 1);

  if (displayBottom.innerText.length <= 1) {
    displayBottom.innerText = "0";
    isFirstButtonPress = true;
  }

  if (result !== null && result !== "") {
    // If deleting on the result after the calculation
    let arr = result.split("");
    arr.pop();
    result = arr.join("");
    reArrange();
  } else if (!isOperationActive && firstNumber !== "") {
    // If deleting on the first number
    let arr = firstNumber.split("");
    arr.pop();
    firstNumber = arr.join("");
  } else if (isOperationActive && secondNumber !== "") {
    // If deleting on the second number
    let arr = secondNumber.split("");
    arr.pop();
    secondNumber = arr.join("");
  } else if (isOperationActive && secondNumber === "") {
    // If deleting on the operator.
    operationType = "";
    isOperationActive = false;
  }
}

function reArrange() {
  result = result.toString();
  firstNumber = result;
  previousResult = result;
  isSameOperation = true;
  isOperationActive = false;
}
