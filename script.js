let firstNum = null;
let secondNum = null;
let operator = null;
let total = null;

function resetVariables() {
    firstNum = null;
    secondNum = null;
    operator = null;
}

function operate(firstNum, secondNum, operator) {
    switch(operator) {
        case "+":
            return firstNum + secondNum;
        case "-":
            return firstNum - secondNum;
        case "*":
            return firstNum * secondNum;
        case "/":
            return firstNum / secondNum;
        case "^":
            let total = 1;
            for (let i = 0; i < secondNum; i++) {
                total *= firstNum;
            }
            return total;
    }
}

function buttonClicked(button) {
    switch(button.dataset.type) {
        case "digit":
            digitClicked(button.innerText);
            break;
        case "operator":
            if (firstNum && !operator) {
                operator = button.innerText;
                workingDisplay.innerText = mainDisplay.innerText + ` ${operator}`;
                mainDisplay.innerText = "";
            }
            break;
        case "func":
            mainDisplay.innerText = "";
            if (button.innerText === "AC") {
                resetVariables();
                total = null;
                workingDisplay.innerText = "";
            } else if (operator) {
                secondNum = null;
            } else {
                firstNum = null;
            }
            break;
        case "equals":
            if (firstNum && secondNum && operator) {
                firstNum = Number(firstNum);
                secondNum = Number(secondNum);
                total = operate(firstNum, secondNum, operator);
                total = Math.floor(total * 10000) / 10000;
                
                workingDisplay.innerText += " " + secondNum + " =";
                mainDisplay.innerText = total === Infinity ? "Error: Zero Divisor" : total;

                resetVariables();
                firstNum = total;
            }
            break;
    }
}

function digitClicked(buttonVal) {
    let decimalCheck = false;

    if (!operator && !total) {
        decimalCheck = decimalClicked(buttonVal, firstNum);
        if (decimalCheck) {
            return;
        }
        firstNum = firstNum ? firstNum + buttonVal : buttonVal;
    } else if (operator) {
        decimalCheck = decimalClicked(buttonVal, secondNum);
        if (decimalCheck) {
            return;
        }
        secondNum = secondNum ? secondNum + buttonVal : buttonVal;
    } else {
        mainDisplay.innerText = "";
        firstNum = buttonVal;
        total = null;
    }
    mainDisplay.innerText += buttonVal;
}

function decimalClicked(buttonVal, number) {
    if (buttonVal === ".") {
        if (number != null && number.includes(".")) {
            return true;
        }
    }

    return false;
}

const mainDisplay = document.querySelector(".main-display");
const workingDisplay = document.querySelector(".working-display");

const buttons = document.querySelectorAll(".button");
buttons.forEach(button => {
    button.addEventListener("click", button => buttonClicked(button.target));
})