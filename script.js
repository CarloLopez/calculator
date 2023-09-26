let firstNum = null;
let secondNum = null;
let operator = null;
let total = null;

// Calculates result based on operator pressed
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

// Checks data-type attribute of button pressed
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

// Performs calculation of two numbers and rounds to 4dp
// Updates calculator display to display result and its components
function calculate() {
    if (firstNum && secondNum && operator) {
        firstNum = Number(firstNum);
        secondNum = Number(secondNum);
        total = operate(firstNum, secondNum, operator);
        total = Math.floor(total * 10000) / 10000;
        
        workingDisplay.innerText += " " + secondNum + " =";
        mainDisplay.innerText = total === Infinity ? "ERROR" : total;

        firstNum = null;
        secondNum = null;
        firstNum = total;
    }
}

// Updates either first or second number based on operator presence
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

// Checks decimal validity to only allow one period in number
function decimalClicked(buttonVal, number) {
    if (buttonVal === ".") {
        if (number != null && number.includes(".")) {
            return true;
        }
    }
    return false;
}

// Sets operator on click and disallows simultaneous operators
function operatorClicked(buttonVal) {
    if (firstNum && !operator) {
        operator = buttonVal;
    } else if (operator && secondNum) {
        // If operator button pressed in place of equals button, 
        // automatically calculates total and expects second number with new operator
        calculate();
        operator = buttonVal;
    } else {
        return;
    }

    workingDisplay.innerText = mainDisplay.innerText + ` ${operator}`;
    mainDisplay.innerText = "";
}

// Clears all values or current number based on button pressed
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

// Sets operator to null after calculation to signal no operator chaining with multiple values (>2) 
function equalsClicked() {
    calculate();
    operator = null;
}

// Allows keyboard functionality
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

// Allows keyboard functionality where key pressed requires a shift key
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
    // Add mouseover/mouseout event listeners to dynamically change border colors on hover
    button.addEventListener("mouseout", element => element.target.style.borderColor = "#252629");
    switch(button.dataset.type) {
        case "digit":
            button.addEventListener("mouseover", element => element.target.style.borderColor = "white");
            break;
        case "func":
            button.addEventListener("mouseover", element => element.target.style.borderColor = "yellow");
            break;
        case "operator":
            button.addEventListener("mouseover", element => element.target.style.borderColor = "orange");
            break;
        case "equals":
            button.addEventListener("mouseover", element => element.target.style.borderColor = "green");
            break;
    }
})

document.addEventListener("keypress", key => {
    if (key.shiftKey) {
        shiftPressed(key.code);
    } else {
        keyPressed(key.code);
    }
}); 