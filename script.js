let firstNum = null;
let secondNum = null;
let operator = null;
let total = null;

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
    let buttonType = button.dataset.type;
    let buttonValue = button.innerText;

    switch(buttonType) {
        case "digit":
            digitClicked(buttonValue);
            break;
        case "operator":
            operatorClicked(buttonValue);
            break;
        case "func":
            funcClicked(buttonValue);
            break;
        case "equals":
            equalsClicked();
            break;
    }
}

function calculate() {
    if (firstNum && secondNum && operator) {
        firstNum = Number(firstNum);
        secondNum = Number(secondNum);
        total = operate(firstNum, secondNum, operator);
        total = Math.floor(total * 10000) / 10000;
        
        workingDisplay.innerText += " " + secondNum;
        mainDisplay.innerText = total === Infinity ? "ERROR" : total;

        firstNum = null;
        secondNum = null;
        firstNum = total;
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

function operatorClicked(buttonVal) {
    if (firstNum && !operator) {
        operator = buttonVal;
    } else if (operator && secondNum) {
        calculate();
        operator = buttonVal;
    } else {
        return;
    }

    workingDisplay.innerText = mainDisplay.innerText + ` ${operator}`;
    mainDisplay.innerText = "";
}

function funcClicked(buttonVal) {
    mainDisplay.innerText = "";
    if ((buttonVal) === "AC") {
        firstNum = null;
        secondNum = null;   
        total = null;
        workingDisplay.innerText = "";
    } else if (operator) {
        secondNum = null;
    } else {
        firstNum = null;
    }
}

function equalsClicked() {
    calculate();
    workingDisplay.innerText += " =";
    operator = null;
}

function keyPressed(code) {
    if (code.includes("Digit")) {
        digitClicked(code[5]);
    } else if (code === "KeyC") {
        funcClicked("c");
    } else {
        switch(code) {
            case "Period":
                digitClicked(".");
                break;
            case "Slash":
                operatorClicked("/");
                break;
            case "Minus":
                operatorClicked("-");
                break;
            case "Equal":
                equalsClicked();
                break;
            case "Enter":
                equalsClicked();
                break;
        }
    }
}

function shiftPressed(code) {
    switch(code) {
        case "KeyC":
            funcClicked("AC");
            break;
        case "Digit6":
            operatorClicked("^");
            break;
        case "Digit8":
            operatorClicked("*");
            break;
        case "Equal":
            operatorClicked("+");
            break;
    }
}

const mainDisplay = document.querySelector(".main-display");
const workingDisplay = document.querySelector(".working-display");

const buttons = document.querySelectorAll(".button");
buttons.forEach(button => {
    button.addEventListener("click", button => buttonClicked(button.target));
})

document.addEventListener("keypress", key => {
    if (key.shiftKey) {
        shiftPressed(key.code);
    } else {
        keyPressed(key.code);
    }
}); 

// TODO: Comment