let buttons = document.querySelectorAll("#buttonsContainer > button");
let displayTop = document.querySelector("#displayTop");
let displayBot = document.querySelector("#displayBot");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log(e.target.id);
    displayInput(e);
  });
});

function displayInput(e) {
  let id = e.target.id;
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
    case "dot":
      displayBot.innerText += ".";
      break;
    case "backtick":
      displayBot.innerText += "/";
      break;
    case "equals":
      displayBot.innerText += "=";
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
function clear() {}
function erase() {}
