let valueOfCurrent = "";
let valueOfPrevious = "";
let lastOperation = "";
let haveDot = false;
let result = null;
let operationSign;
const numberBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".math");
const acBtn = document.querySelectorAll(".delete-all");
const delBtn = document.querySelectorAll(".delete-last");
const equalsBtn = document.querySelectorAll(".equal");
let currentDisplayDiv = document.querySelector(".current-value");
let previousDisplayDiv = document.querySelector(".previous-value");

numberBtn.forEach((number) => {
  number.addEventListener("click", (e) => {
    appendNumber(e.target.innerText);
    updateDisplay();
  });
});

operatorBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (valueOfCurrent === "") return;
    if (valueOfPrevious !== "") {
      doMath();
    }
    operationSign = e.target.innerText;
    appendNumber(` ${operationSign} `);
    valueOfPrevious = valueOfCurrent;
    valueOfCurrent = "";
    updateDisplay();
  });
});

// the math
function doMath() {
  const previous = parseFloat(valueOfPrevious);
  const current = parseFloat(valueOfCurrent);
  let compute;
  if (isNaN(previous) && isNaN(current)) return;
  switch (operationSign) {
    case "-":
      compute = previous - current;
      break;
    case "+":
      compute = previous + current;
      break;
    case "*":
      compute = previous * current;
      break;
    case "÷":
      compute = previous / current;
      break;
    default:
      return;
  }
  valueOfCurrent = compute;
  valueOfPrevious = "";
  operationSign = undefined;
}

function appendNumber(number) {
  if (valueOfCurrent.includes(".") && number === ".") return;
  valueOfCurrent = valueOfCurrent.toString() + number.toString();
}
//clear the div displays
function resetView() {
  valueOfCurrent = "";
  valueOfPrevious = "";
  operationSign = undefined;
}
function updateDisplay() {
  currentDisplayDiv.innerHTML = valueOfCurrent;
  previousDisplayDiv.innerText = valueOfPrevious;
}
equalsBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    doMath();
    updateDisplay();
  });
});
acBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    resetView();
    updateDisplay();
  });
});
delBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    valueOfCurrent = valueOfCurrent.toString().slice(0, -1);
    updateDisplay();
  });
});
