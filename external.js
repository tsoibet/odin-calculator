function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return showErrMsg();
    }
    return Math.round(a / b * 1000) / 1000;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return showErrMsg();
    }
}

function showErrMsg() {
    return "ERROR";
}

const displayPanel = document.querySelector("#displayPanel");
let displayValue = displayPanel.textContent;
let operatorClicked = "";
let storedValue = 0;
let firstNumBtn = true;

function displayInput(input) {
    if (operatorClicked && firstNumBtn) {
        displayPanel.textContent = 0;
        displayValue = displayPanel.textContent;
        firstNumBtn = false;
    }
    if (displayPanel.textContent == 0) {
        displayPanel.textContent = input;
    } else if (displayPanel.textContent.length === 12) {
        return;
    } else {
        displayPanel.textContent += input;
    }
    displayValue = displayPanel.textContent;
}

const numBtns = document.querySelectorAll(".numBtn");
numBtns.forEach( numBtn => { 
    numBtn.addEventListener("click", () => {
        displayInput(numBtn.textContent);
    });
});

const operatorBtns = document.querySelectorAll(".operatorBtn");
operatorBtns.forEach( operatorBtn => { 
    operatorBtn.addEventListener("click", () => {
        clickOperator(operatorBtn.textContent, displayValue);
    });
});

function clickOperator(operator, a) {
    operatorClicked = operator;
    storedValue = a;
    firstNumBtn = true;
}

const equalBtn = document.querySelector("#equalBtn");
equalBtn.addEventListener("click", () => {
    displayResult(operate(operatorClicked, storedValue, displayValue));
    operatorClicked = "";
    storedValue = 0;
});

function displayResult(result) {
    displayPanel.textContent = result;
    displayValue = result;
}

function clear() {
    displayPanel.textContent = 0;
    displayValue = displayPanel.textContent;
    operatorClicked = "";
    storedValue = 0;
}

const clearBtn = document.querySelector("#clearBtn");
clearBtn.addEventListener("click", clear);