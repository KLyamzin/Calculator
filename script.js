let valueOfCurrent = "";
let valueOfPrevious = "";
let lastOperation = "";
let haveDot = false;
let operationSign;
const numberBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".math");
const acBtn = document.querySelector(".delete-all");
const delBtn = document.querySelector(".delete-last");
const equalsBtn = document.querySelector(".equal");
let currentDisplayDiv = document.querySelector(".current-value");
let previousDisplayDiv = document.querySelector(".previous-value");
// const numberDataKey = document.querySelectorAll(".number");
// const operatorDataKey = document.querySelectorAll("[data-operator]");

window.onload = () => {
  currentDisplayDiv.innerText = "0";
};
// integrating keyboard input
window.addEventListener("keypress", (e) => {
  // allow only numbers and dot
  if (e.key / 2 || e.key === "0" || e.key === ".") {
    appendNumber(e.key);
    updateDisplay();
  }
  // sign symbols
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    let keyValue = e.key;
    if (keyValue === "/") {
      keyValue = "÷"; //converting '/' symbol to '÷'
    }
    if (valueOfCurrent === "") return;
    if (valueOfPrevious !== "") {
      doMath();
    }
    operationSign = keyValue;
    valueOfPrevious = valueOfCurrent;
    valueOfCurrent = "";
    updateDisplay();
  }
});

// get input from number buttons
numberBtn.forEach((number) => {
  number.addEventListener("click", (e) => {
    appendNumber(e.target.innerText);
    updateDisplay();
  });
});
// get input from operation buttons
operatorBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (valueOfCurrent === "") return;
    if (valueOfPrevious !== "") {
      doMath();
    }
    operationSign = e.target.innerText;
    valueOfPrevious = valueOfCurrent;
    valueOfCurrent = "";
    updateDisplay();
  });
});

// do the math
function doMath() {
  const previous = parseFloat(valueOfPrevious);
  const current = parseFloat(valueOfCurrent);
  let compute;
  if (isNaN(previous) && isNaN(current)) return;
  if (valueOfCurrent === "" || valueOfCurrent === ".") return;
  if (operationSign === "÷") {
    if (valueOfCurrent / 2 == 0) return;
  }

  switch (operationSign) {
    case "-":
      compute = previous - current;
      break;
    case "+":
      compute = previous + current;
      break;
    case "x":
      compute = previous * current;
      break;
    case "÷":
      if (current === "0") {
        return;
      }
      compute = previous / current;
      break;
    default:
      return;
  }

  valueOfCurrent = Math.round(compute * Math.pow(10, 5)) / Math.pow(10, 5);
  valueOfPrevious = "";
  operationSign = undefined;
  //   }
}
// stitch the input together
function appendNumber(number) {
  if (valueOfCurrent.length <= 14) {
    if (valueOfCurrent.includes(".") && number === ".") return;
    valueOfCurrent = valueOfCurrent.toString() + number.toString();
  }
}
//clear the div displays
function resetView() {
  valueOfCurrent = "";
  valueOfPrevious = "";
  operationSign = null;
  onload();
}
// update the screen with values
function updateDisplay() {
  currentDisplayDiv.innerHTML = valueOfCurrent;
  if (operationSign != null) {
    previousDisplayDiv.innerText = `${valueOfPrevious} ${operationSign}`;
  } else {
    previousDisplayDiv.innerText = "";
  }
}
// equals button
equalsBtn.addEventListener("click", () => {
  if (valueOfCurrent === ".") return;
  doMath();
  updateDisplay();
});
// AC button
acBtn.addEventListener("click", () => {
  resetView();
  updateDisplay();
  window.onload();
});
// DEL button
delBtn.addEventListener("click", () => {
  valueOfCurrent = valueOfCurrent.toString().slice(0, -1);
  updateDisplay();
  if (valueOfCurrent === "") window.onload();
});
