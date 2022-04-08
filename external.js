const displayPanel = document.querySelector("#displayPanel");
let displayValue = displayPanel.textContent;
let operatorClicked = "";
let storedValue = "";
let isDotClicked = false;
let isFirstNumBtn = true;
let errMsg = "ERROR";
let infMsg = "∞ INFINITY ∞";

window.addEventListener("keydown", (event) => {
    if (!isNaN(Number(event.key))) {
        displayInput(event.key);
    } else {
        switch (event.key) {
            case ".":
                displayInput(event.key);
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                clickOperator(event.key, displayValue);
                break;
            case "Enter":
                clickEqual();
                break;
            case "Clear":
            case "Escape":
                clear();
                break;
            default:
                return;
        }
    }
});

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
    if (isDotClicked && input === ".") {
        return;
    }
    if (operatorClicked && isFirstNumBtn) {
        if (input !== ".") {
            displayPanel.textContent = 0;
            displayValue = displayPanel.textContent;
        }
        isFirstNumBtn = false;
    }
    if (displayPanel.textContent === "0" && input !== ".") {
        displayPanel.textContent = input;
    } else if (displayPanel.textContent.length === 12) {
        return;
    } else {
        displayPanel.textContent += input;
    }
    displayValue = displayPanel.textContent;
    if (displayPanel.textContent.includes(".")) {
        isDotClicked = true;
    } else {
        isDotClicked = false;
    }
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
equalBtn.addEventListener("click", clickEqual);

function clickEqual() {
    if (!operatorClicked) return;
    displayResult(operate(operatorClicked, storedValue, displayValue));
    operatorClicked = "";
    storedValue = "";
}

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
    if (result === errMsg || result === infMsg)
    {
        displayPanel.textContent = result;
        displayValue = result;
        return;
    }
    result = result.toFixed(2);
    if (result.toString().length > 12) {
        result = errMsg;
    } else if (Number.isInteger(+result)) {
        result = parseInt(result);
    }
    displayPanel.textContent = result;
    displayValue = result;
    if (displayPanel.textContent.includes(".")) {
        isDotClicked = true;
    } else {
        isDotClicked = false;
    }
}

const clearBtn = document.querySelector("#clearBtn");
clearBtn.addEventListener("click", clear);

function clear() {
    displayPanel.textContent = 0;
    displayValue = displayPanel.textContent;
    operatorClicked = "";
    storedValue = "";
    isDotClicked = false;
}
