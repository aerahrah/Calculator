let displayText = [];
let value = 0;
let mode = "";
let firstNum;
let secondNum;

const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const displayType = document.querySelector(".typed-answer");
const equal = document.querySelector(".equal");
const answerDisplay = document.querySelector(".calculated-answer");
const del = document.querySelector(".delete");
const clear = document.querySelector(".reset");
const dot = document.querySelector(".dot");
const sqrt = document.querySelector(".squareroot");

sqrt.addEventListener("click", () => {
    if (firstNum != undefined) {
        displaySqrt();
    } else {
        if (mode == "") {
            answerDisplay.textContent = Math.sqrt(displayText[0]).toFixed(2);
        } else {
            let str = displayText.join("").split(mode);
            firstNum = str[0];
            secondNum = str[1];
            if (secondNum != undefined) {
                if (firstNum != undefined) {
                    modeOperator(mode);
                    displaySqrt();
                }
            }
            else {
                answerDisplay.textContent = Math.sqrt(displayText[0]).toFixed(2);
            }
        }
    }

});
let displaySqrt = () => {
    displayText = [];
    displayType.textContent = firstNum;
    firstNum = Math.sqrt(firstNum).toFixed(2);
    displayText.push(firstNum);
    answerDisplay.textContent = firstNum;
}
del.addEventListener("click", () => {
    displayText.pop();
    displayType.textContent = displayText.join("");
});
equal.addEventListener("click", () => {
    operator();
    displayText = [];
    mode = "";
});

clear.addEventListener("click", () => {
    displayText = [];
    displayType.textContent = "";
    answerDisplay.textContent = "";
});
dot.addEventListener("click", () => {
    console.log(mode);
    if (mode != "") {
        let str = displayText.join("").split(mode);
        firstNum = str[0];
        secondNum = str[1];
        if (firstNum.includes(".") && secondNum.includes(".")) {
            return;
        } else {
            if (secondNum.includes(".")) return;
            else {
                displayText.push(dot.textContent);
                displayType.textContent = displayText.join("");
            }
        }
    } else {
        let str = displayText.join("");
        if (str.includes(".")) {
            return
        } else {
            displayText.push(dot.textContent);
            displayType.textContent = displayText.join("");
        }
    }
});
digits.forEach(element => {
    element.addEventListener("click", () => {
        displayText.push(element.textContent);
        displayType.textContent = displayText.join("");
    });
});

operators.forEach(element => {
    element.addEventListener("click", () => {
        let str = displayText.join("");
        if (str.includes("+") || str.includes("-") || str.includes("x") || str.includes("÷")) {
            if (str.includes("+", str.length - 1) || str.includes("-", str.length - 1) || str.includes("x", str.length - 1) || str.includes("÷", str.length - 1)) {
                displayText.pop();
                mode = element.textContent;
                displayText.push(element.textContent);
                displayType.textContent = displayText.join("");
            } else {
                displayText.pop();
            }

        } else {
            if (displayText.length === 0) {
                if (firstNum === undefined && displayType.textContent == "") {
                    displayText.push(0);
                } else if (firstNum == undefined) {
                    displayText.push(displayType.textContent);

                } else displayText.push(answerDisplay.textContent);
            }
            mode = element.textContent;
            displayText.push(element.textContent);
            displayType.textContent = displayText.join("");
        }
    });
});

let operator = () => {
    let str = displayText.join("").split(mode);
    if (str.length <= 1 && str.length >= 0) {
        if (firstNum == undefined) answerDisplay.textContent = displayType.textContent;
        else if (secondNum == "" || displayText == 0) answerDisplay.textContent = firstNum;
    } else {
        firstNum = str[0];
        secondNum = str[1];
        if (secondNum == "") answerDisplay.textContent = firstNum;
        else {
            modeOperator(mode);
            if (Number.isInteger(firstNum)) answerDisplay.textContent = firstNum;
            else answerDisplay.textContent = firstNum.toFixed(2);
        }
    }
};
let modeOperator = (mode) => {
    if (mode == "x") firstNum = Number(firstNum) * Number(secondNum);
    else if (mode == "÷") firstNum = Number(firstNum) / Number(secondNum);
    else if (mode == "+") firstNum = Number(firstNum) + Number(secondNum);
    else if (mode == "-") firstNum = Number(firstNum) - Number(secondNum);
};
