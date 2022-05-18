let valueOfCurrent = "";
let valueOfPrevious = "";
let haveDot = false;
let operationSign;
const numberBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".math");
const acBtn = document.querySelector(".delete-all");
const delBtn = document.querySelector(".delete-last");
const equalsBtn = document.querySelector(".equal");
let currentDisplayDiv = document.querySelector(".current-value");
let previousDisplayDiv = document.querySelector(".previous-value");

window.onload = () => {
  currentDisplayDiv.innerText = "0";
};
// Integrating keyboard input
window.addEventListener("keydown", (e) => {
  // allow only numbers and dot
  if (e.key / 2 || e.key === "0" || e.key === ".") {
    appendNumber(e.key);
    updateDisplay();
  }
  // operation sign symbols
  else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    let keyValue = e.key;
    if (keyValue == "/") {
      keyValue = "÷"; //converting '/' symbol to '÷'
    } else if (keyValue == "*") {
      keyValue = "x"; //converting '*' symbol to 'x'
    }
    operator();
    operationSign = keyValue;
    updateDisplay();
  } else if (e.key === "=" || e.key === "Enter") {
    equal();
    // updateDisplay();
  } else if (e.key === "Backspace") {
    deleteLast();
    updateDisplay();
  }
});
// Equal button
equalsBtn.addEventListener("click", () => {
  equal();
  // updateDisplay();
});

// AC button
acBtn.addEventListener("click", () => {
  resetView();
  updateDisplay();
  window.onload();
});

// DEL button
delBtn.addEventListener("click", () => {
  deleteLast();
  updateDisplay();
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
    operator();
    operationSign = e.target.innerText;
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
function equal() {
  if (valueOfCurrent === ".") return;
  doMath();
  updateDisplay();
}
// delete last character
function deleteLast() {
  valueOfCurrent = valueOfCurrent.toString().slice(0, -1);
  updateDisplay();
  if (valueOfCurrent === "") window.onload();
}
//operation sign
function operator() {
  if (valueOfCurrent === "") return;
  if (valueOfPrevious !== "") doMath();
  valueOfPrevious = valueOfCurrent;
  valueOfCurrent = "";
}
