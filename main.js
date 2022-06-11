const buttons = document.querySelectorAll("#buttonsContainer > button");
const digitButtons = document.querySelectorAll("#buttonsContainer > .digit")
const displayTop = document.querySelector("#displayTop");
const displayBottom = document.querySelector("#displayBot");

// state of calculator
let firstNumber = "";
let secondNumber = "";
let operationType = "";
let result = "";
let isOperationActive = false;
let isSameOperation = false;
let isFirstCalculation = true;
let isFirstButtonPress = true;
let previousResult = null;

digitButtons.forEach(button => {
  button.addEventListener("click", e => inputDigit(e.target.innerText))
})

function inputDigit(digitText) {
  updateDisplayWithDigit(digitText)
  appendDigitToActiveOperand(digitText)
}

function updateDisplayWithDigit(digitText) {
  if (isFirstButtonPress) {
    displayBottom.innerText = "";
    isFirstButtonPress = false;
  }
  displayBottom.innerText += digitText;
}

function appendDigitToActiveOperand(digitText) {
  if (!isOperationActive) {
    firstNumber += digitText;
  } else {
    secondNumber += digitText;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let button = e.target;
    let id = button.id;
    if (displayIsOverflowed() && isNotClearAndDeleteButton(button)) return;

    if (isFirstButtonPress && (isOperatorButton(button) || id == "dot")) {
      clear();
      return;
    }

    if (isOperationActive && isOperatorButton(button)) {
      if (secondNumber === "") return;
      calculate();
      displayResult();
      reArrange();
      displayInputs(id);
      setupInputsForCalculation(id);
      return;
    }

    // If displayInputs() and setupInputsForCalculation() have their places switched, the dot will not show
    // on the display when the button is pressed
    displayInputs(id);
    setupInputsForCalculation(id);
    if (id === "delete") erase();
    if (id === "clear") clear();
    if (id === "equals") {
      if (parseFloat(secondNumber) === 0 && operationType === "divide") {
        clear();
        throw alert("You cant divide with 0 :)");
      }
      if ((secondNumber === "" || operationType === "") && operationType !== "squareRoot") {
        clear();
        return;
      }
      calculate();
      displayResult();
      reArrange();
    }
  });
});

function displayIsOverflowed() {
  return displayBottom.innerText.length === 29
}

function isNotClearAndDeleteButton(button) {
  return button.id !== "delete" && button.id !== "clear"
}

function isOperatorButton(button) {
  return (button.id === "plus" || button.id === "minus" || button.id === "star" || button.id === "backtick" || button.id === "power" || button.id === "squareRoot" || button.id === "equals")
}

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
    setTopDisplay(previousResult, secondNumber)
  } else if (isFirstCalculation) {
    displayTop.innerText = displayBottom.innerText;
  } else {
    setTopDisplay(firstNumber, secondNumber)
  }
  displayBottom.innerText = `${result}`;
}

function setTopDisplay(firstNumber, secondNumber) {
  if (operationType === "add") displayTop.innerText = `${firstNumber}+${secondNumber}`;
  if (operationType === "subtract") displayTop.innerText = `${firstNumber}-${secondNumber}`;
  if (operationType === "multiply") displayTop.innerText = `${firstNumber}*${secondNumber}`;
  if (operationType === "divide") displayTop.innerText = `${firstNumber}/${secondNumber}`;
  if (operationType === "power") displayTop.innerText = `${firstNumber}^${secondNumber}`;
  if (operationType === "squareRoot") displayTop.innerText = `\u221a${firstNumber}`;
}

function setupInputsForCalculation(id) {
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
  displayBottom.innerText = "";

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
  if (displayBottom.innerText.split("").indexOf("\u221a") !== -1) {
    // If deleting square root operator
    let temp = displayBottom.innerText.split("");
    temp.splice(0, 1);
    displayBottom.innerText = temp.join("");
    operationType = "";
    isOperationActive = false;
    return;
  } else {
    // Default if its any other operation other than sqrt
    displayBottom.innerText = displayBottom.innerText.slice(0, displayBottom.innerText.length - 1);
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
