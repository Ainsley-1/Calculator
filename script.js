const buttonvalues = [
    "AC", "+/-", "%", "÷",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".",  "=",
];

const rightSymbols = ["+", "*", "÷", "-", "=",];
const topSymbols = ["AC", "+/-", "%",];

const display = document.getElementById("display");

// A+B, A*B, A-B, A/B
let A = 0;
let operator = "null";
let B = null;
let calculationString = ""; // Added to track the full calculation

function clearAll() {
    A = 0;
    operator = "null";
    B = null;
    calculationString = ""; // Clear the calculation string
}

for (let i = 0; i < buttonvalues.length; i++) {
    let value = buttonvalues[i];
    let button = document.createElement("button");
    button.innerText = value;

    // Styling buttons colors
    if (value == "0") {
        button.style.width = "200px";
        button.style.gridColumn = "span 2";
    }
    
    if (rightSymbols.includes(value)) {
        button.style.backgroundColor = "#ff9500";
    }
    else if (topSymbols.includes(value)) {
        button.style.backgroundColor = "#d4d4d2";
        button.style.color = "#1c1c1c"
    }

    // Process button clicks
    button.addEventListener("click", function() {
        if (rightSymbols.includes(value)) {
            if (value == "=") {
                if (A != null && operator != "null") {
                    B = display.value.split(' ').pop(); // Get the last number after operator
                    let numA = Number(A);
                    let numB = Number(B);

                    let result;
                    if (operator == "÷") {
                        result = numA / numB;
                    } 
                    else if (operator == "*") {
                        result = numA * numB;
                    }
                    else if (operator == "-") {
                        result = numA - numB;
                    }
                    else if (operator == "+") {
                        result = numA + numB;
                    } 
                    
                    display.value = result;
                    calculationString = ""; // Reset calculation string
                    clearAll();
                }
            }
            else {
                operator = value;
                A = display.value.split(' ').length > 1 ? 
                    display.value.split(' ')[0] : 
                    display.value;
                calculationString = `${A} ${operator} `;
                display.value = calculationString;
            }
        }
        else if (topSymbols.includes(value)) {
            if (value == "AC") {
                clearAll();
                display.value = "0";
                calculationString = "";
            }
            else if (value == "+/-") {
                if (display.value != "" && display.value != "0") {
                    if (display.value[0] == "-") {
                        display.value = display.value.slice(1);
                    } 
                    else {
                        display.value = "-" + display.value;
                    }
                }
            }
            else if (value == "%") {
                display.value = Number(display.value) / 100;
            }
        }
        else { // numbers or .
            if (operator != "null" && calculationString && 
                display.value == calculationString) {
                // If we're entering B after operator, clear the display but keep calculation string
                display.value = calculationString + value;
            }
            else if (value == ".") {
                if (display.value != "" && !display.value.includes(".")) {
                    display.value += value;
                }
                else if (display.value == "") {
                    display.value = "0" + value;
                }
            }
            else if (display.value == "0") {
                display.value = value;
            } 
            else {
                display.value += value;
            }
        }
    });

    // Add buttons to calculator
    document.getElementById("buttons").appendChild(button);
}
