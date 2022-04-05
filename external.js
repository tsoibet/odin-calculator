const displayPanel = document.querySelector("#displayPanel");
let displayValue = displayPanel.textContent;
let operatorClicked = "";
let storedValue = "";
let isFirstNumBtn = true;
let errMsg = "ERROR";
let infMsg = "∞ INFINITY ∞";

const numBtns = document.querySelectorAll(".numBtn");
numBtns.forEach( numBtn => { 
    numBtn.addEventListener("click", () => {
        displayInput(numBtn.textContent);
    });
});

function displayInput(input) {
    if (displayPanel.textContent === errMsg || displayPanel.textContent === infMsg) {
        return;
    }
    if (operatorClicked && isFirstNumBtn) {
        displayPanel.textContent = 0;
        displayValue = displayPanel.textContent;
        isFirstNumBtn = false;
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

const operatorBtns = document.querySelectorAll(".operatorBtn");
operatorBtns.forEach( operatorBtn => { 
    operatorBtn.addEventListener("click", () => {
        clickOperator(operatorBtn.textContent, displayValue);
    });
});

function clickOperator(operator, a) {
    if (operatorClicked && storedValue) {
        displayResult(operate(operatorClicked, storedValue, displayValue));
        operatorClicked = operator;
        storedValue = displayValue;
        isFirstNumBtn = true;
    }
    else {
        operatorClicked = operator;
        storedValue = a;
        isFirstNumBtn = true;
    }
}

const equalBtn = document.querySelector("#equalBtn");
equalBtn.addEventListener("click", () => {
    if (!operatorClicked) return;
    displayResult(operate(operatorClicked, storedValue, displayValue));
    operatorClicked = "";
    storedValue = "";
});

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
        return infMsg;
    }
    return a / b;
}

function operate(operator, a, b) {
    if (isNaN(a) || isNaN(b)) {
        return showErrMsg();
    }
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
    return errMsg;
}

function displayResult(result) {
    if (result.toString().length > 12) {
        result = errMsg;
    } else {
        result = Math.round(result * 100) / 100;
    }
    displayPanel.textContent = result;
    displayValue = result;
}

const clearBtn = document.querySelector("#clearBtn");
clearBtn.addEventListener("click", clear);

function clear() {
    displayPanel.textContent = 0;
    displayValue = displayPanel.textContent;
    operatorClicked = "";
    storedValue = "";
}
