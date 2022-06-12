const displayTop = document.querySelector("#displayTop");
const displayBottom = document.querySelector("#displayBot");

const calculatorState = {
  firstNumber: "",
  secondNumber: "",
  activeOperation: "",
  result: "",
  isOperationActive: false,
  isSameOperation: false,
  isFirstCalculation: true,
  isFirstButtonPress: true,
  previousResult: null
}

setClickListenersForButtons()
resetCalculatorState()

function setClickListenersForButtons() {
  const digitButtons = document.querySelectorAll("#buttonsContainer > .digit")
  const dotButton = document.querySelector("#buttonsContainer > #dot")
  const operatorButtons = document.querySelectorAll("#buttonsContainer > .operator")
  const equalsButton = document.querySelector("#buttonsContainer > #equals")
  const deleteButton = document.querySelector("#buttonsContainer > #delete")
  const clearButton = document.querySelector("#buttonsContainer > #clear")

  digitButtons.forEach(button => {
    button.addEventListener("click", e => inputDigit(e.target.innerText))
  })

  dotButton.addEventListener("click", e => inputDot())

  operatorButtons.forEach(button => {
    button.addEventListener("click", e => setOperation(e.target))
  })

  equalsButton.addEventListener("click", e => applyEquals())

  deleteButton.addEventListener("click", e => erase())

  clearButton.addEventListener("click", e => clear())
}

function resetCalculatorState() {
  calculatorState.firstNumber = "";
  calculatorState.secondNumber = "";
  calculatorState.activeOperation = "";
  calculatorState.result = "";
  calculatorState.isOperationActive = false;
  calculatorState.isSameOperation = false;
  calculatorState.isFirstCalculation = true;
  calculatorState.isFirstButtonPress = true;
  calculatorState.previousResult = null;
}

function inputDigit(digitText) {
  if(displayIsOverflowed()) {
    return
  }
  updateDisplayWithDigit(digitText)
  appendDigitToActiveOperand(digitText)
}

function updateDisplayWithDigit(digitText) {
  if (calculatorState.isFirstButtonPress) {
    displayBottom.innerText = "";
    calculatorState.isFirstButtonPress = false;
  }
  displayBottom.innerText += digitText;
}

function appendDigitToActiveOperand(digitText) {
  if (!calculatorState.isOperationActive) {
    calculatorState.firstNumber += digitText;
  } else {
    calculatorState.secondNumber += digitText;
  }
}

function inputDot() {
  if(displayIsOverflowed()) {
    return
  }

  updateDisplayWithDot()
  appendDotToActiveOperand()
}

function updateDisplayWithDot() {
  if (!calculatorState.isOperationActive && calculatorState.firstNumber.split("").indexOf(".") === -1 && calculatorState.firstNumber !== "") displayBottom.innerText += ".";
  if (calculatorState.isOperationActive && calculatorState.secondNumber.split("").indexOf(".") === -1 && calculatorState.secondNumber !== "") displayBottom.innerText += ".";
}

function appendDotToActiveOperand() {
  if (!calculatorState.isOperationActive && calculatorState.firstNumber.split("").indexOf(".") === -1) calculatorState.firstNumber += ".";
  if (calculatorState.isOperationActive && calculatorState.secondNumber.split("").indexOf(".") === -1) calculatorState.secondNumber += ".";
}

function setOperation(operatorButton) {
  if(displayIsOverflowed()) {
    return
  }

  if(calculatorState.isFirstButtonPress) {
    clear()
    return
  }

  if(calculatorState.isOperationActive) {
    if (calculatorState.secondNumber === "") {
      return
    } 
    calculate()
    displayResult()
    reArrange()
    updateDisplayWithOperatorSymbol(operatorButton)
    updateActiveOperation(operatorButton.id)
    return
  }

  updateDisplayWithOperatorSymbol(operatorButton)
  updateActiveOperation(operatorButton.id);
}

function updateDisplayWithOperatorSymbol(operatorButton) {
  if (calculatorState.isFirstButtonPress) {
    displayBottom.innerText = "";
    calculatorState.isFirstButtonPress = false;
  }
  if(operatorButton.id == "squareRoot") {
    displayBottom.innerText = "\u221a" + displayBottom.innerText;
  } else {
    displayBottom.innerText += operatorButton.dataset.operatorSymbol;
  }
}

function applyEquals() {
  if(displayIsOverflowed()) {
    return
  }
  if (parseFloat(calculatorState.secondNumber) === 0 && calculatorState.activeOperation === "divide") {
    clear()
    throw alert("You cant divide with 0 :)")
  }
  if ((calculatorState.secondNumber === "" || calculatorState.activeOperation === "") && calculatorState.activeOperation !== "squareRoot") {
    clear()
    return
  }
  calculate()
  displayResult()
  reArrange()
}

function displayIsOverflowed() {
  return displayBottom.innerText.length === 29
}

function calculate() {
  if (calculatorState.activeOperation === "add") calculatorState.result = parseFloat(calculatorState.firstNumber) + parseFloat(calculatorState.secondNumber);
  if (calculatorState.activeOperation === "subtract") calculatorState.result = parseFloat(calculatorState.firstNumber) - parseFloat(calculatorState.secondNumber);
  if (calculatorState.activeOperation === "multiply") calculatorState.result = parseFloat(calculatorState.firstNumber) * parseFloat(calculatorState.secondNumber);
  if (calculatorState.activeOperation=== "divide") calculatorState.result = parseFloat(calculatorState.firstNumber) / parseFloat(calculatorState.secondNumberr);
  if (calculatorState.activeOperation === "power") calculatorState.result = Math.pow(parseFloat(calculatorState.firstNumber), parseFloat(calculatorState.secondNumber));
  if (calculatorState.activeOperation === "squareRoot") calculatorState.result = Math.sqrt(parseFloat(calculatorState.firstNumber));
  calculatorState.isFirstCalculation = false;
}

function displayResult() {
  if (calculatorState.isSameOperation) {
    setTopDisplay(calculatorState.previousResult, calculatorState.secondNumber)
  } else if (calculatorState.isFirstCalculation) {
    displayTop.innerText = displayBottom.innerText;
  } else {
    setTopDisplay(calculatorState.firstNumber, calculatorState.secondNumber)
  }
  displayBottom.innerText = `${calculatorState.result}`;
}

function setTopDisplay(firstNumber, secondNumber) {
  if (calculatorState.activeOperation === "add") displayTop.innerText = `${firstNumber}+${secondNumber}`;
  if (calculatorState.activeOperation === "subtract") displayTop.innerText = `${firstNumber}-${secondNumber}`;
  if (calculatorState.activeOperation === "multiply") displayTop.innerText = `${firstNumber}*${secondNumber}`;
  if (calculatorState.activeOperation === "divide") displayTop.innerText = `${firstNumber}/${secondNumber}`;
  if (calculatorState.activeOperation === "power") displayTop.innerText = `${firstNumber}^${secondNumber}`;
  if (calculatorState.activeOperation === "squareRoot") displayTop.innerText = `\u221a${firstNumber}`;
}

function updateActiveOperation(operationText) {
  calculatorState.activeOperation = operationText
  calculatorState.isOperationActive = true;
  calculatorState.isSameOperation = false;
  calculatorState.secondNumber = "";
}

function clear() {
  displayTop.innerText = "";
  displayBottom.innerText = "";
  resetCalculatorState()
}

function erase() {
  if (displayBottom.innerText.split("").indexOf("\u221a") !== -1) {
    // If deleting square root operator
    let temp = displayBottom.innerText.split("");
    temp.splice(0, 1);
    displayBottom.innerText = temp.join("");
    calculatorState.activeOperation = "";
    calculatorState.isOperationActive = false;
    return;
  } else {
    // Default if its any other operation other than sqrt
    displayBottom.innerText = displayBottom.innerText.slice(0, displayBottom.innerText.length - 1);
  }

  if (calculatorState.result !== null && calculatorState.result !== "") {
    // If deleting on the result after the calculation
    let arr = calculatorState.result.split("");
    arr.pop();
    calculatorState.result = arr.join("");
    reArrange();
  } else if (!calculatorState.isOperationActive && calculatorState.firstNumber !== "") {
    // If deleting on the first number
    let arr = calculatorState.firstNumber.split("");
    arr.pop();
    calculatorState.firstNumber = arr.join("");
  } else if (calculatorState.isOperationActive && calculatorState.secondNumber !== "") {
    // If deleting on the second number
    let arr = calculatorState.secondNumber.split("");
    arr.pop();
    calculatorState.secondNumber = arr.join("");
  } else if (calculatorState.isOperationActive && calculatorState.secondNumber === "") {
    // If deleting on the operator.
    calculatorState.activeOperation = "";
    calculatorState.isOperationActive = false;
  }
}

function reArrange() {
  calculatorState.result = calculatorState.result.toString();
  calculatorState.firstNumber = calculatorState.result;
  calculatorState.previousResult = calculatorState.result;
  calculatorState.isSameOperation = true;
  calculatorState.isOperationActive = false;
}
