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

function clearAll() {
    A =0;
    operator = "null";
    B = null;
}

for (let i=0; i < buttonvalues.length; i++) {


    //<button>AC</button>
    let value = buttonvalues [i];
    let button = document.createElement("button");
    button.innerText = value;


    //styling buttons colors
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


    //process button clicks
    button.addEventListener("click", function(){
      if (rightSymbols.includes(value)) {
           if(value == "=") {
              if(A !=null) {
                B = display.value;
                let numA = Number(A);
                let numB = Number(B);

                if (operator == "÷") {
                    display.value = numA/numB;
                } 
                
                else if (operator == "*") {
                    display.value = numA * numB
                }

                else if ( operator == "-") {
                    display.value = numA-numB;
                }

                else if (operator == "+") {
                    display.value = numA+numB;
                } 
                clearAll ();
              }
           }

           else {
             operator = value;
             A = display.value;
             display.value= "";
           }
        }

      else if  (topSymbols.includes(value)) {
           if (value == "AC") {
                 clearAll();
                 display.value = "";
           }

           else if (value == "+/-") {
             if (display.value != "" && display.value != "0") {
                if (display.value[0] == "-") {  // remove -
                    display.value = display.value.slice(1);
              } 
              
              else {  // add -
            display.value = "-" + display.value;
        }
    }
}
           
           else if (value == "%") {
               display.value = Number(display.value)/100;
           }
      }


      else { // numbers or .
        if (value == ".") {
            if (display.value !="" && !display.value.includes(".")) {
                display.value += value;
            }
        }

              else if (display.value == "0") {
                  display.value = value;
              } 
            
              else {
                 display.value += value;
              }

      };

    });
      

    //add buttons to calculator
    document.getElementById("buttons").appendChild(button);

}
