var btn = document.querySelectorAll("button");
var lowerScreenDisplay = document.querySelector('#answer_text');
var upperScreenDisplay = document.querySelector('#upper_screen');
var values='';

for (let i = 0; i<btn.length;i++){
    btn[i].addEventListener('click',(e)=>{
        let btnId = extractBtnId(e.target.id);
        switch (btnId){
            case ("="):
                let strNumbers = splitValues(values);
                let isUserInputCorrect = true;
                for (let i of strNumbers){
                    if (i==""){
                        displayOnLowerScreen("Operation error") 
                        isUserInputCorrect = false
                    }
                }
                if (isUserInputCorrect == true){
                    displayOnLowerScreen("")
                    let operators = getOperators(values);
                    let intNum = convertToIntArr(strNumbers);
                    let bodmasOperator = bodmas(operators);
                    //console.log(operators);
                    console.log(bodmasOperator);
                    //console.log(strNumbers);
                    //console.log(operators);
                    console.log(intNum);
                    let answer = operateCal(intNum,bodmasOperator);
                    console.log("answer: " + answer);
                    displayOnLowerScreen(answer);

            }
                break;
            case("AC"):
                values = "";
                displayOnUpperScreen("");
                displayOnLowerScreen("");
                break;
            case ("DEL"):
                var prevValues = values;
                values ='';
                for (let i=0; i < prevValues.length-1; i++){
                    values = values + prevValues[i];
                }
                displayOnUpperScreen(values);
                break;
            default:
                values = values + btnId;
                displayOnUpperScreen(values);
        }
    });
}


// Function to evaluate the expression given
function operateCal(num,operator){
    let ans;
    let indexTrack = {};
    if (operator['4-'] != null){
        for (let x of operator['4-']){
            console.log(x);
            let j = parseInt(x)+1;
            num[j] = -1 * num[j];
            //console.log('########' + j)
            //console.log('########' + num[j])
        }
    }
    for (let key in operator){
        if (operator[key]!=null){
            for (let i of operator[key]){
                switch (key){
                    case "3+":
                        ans = num[i] + num[i+1];
                        //console.log("add "+ans);
                        break;
                    case "4-":
                        ans = num[i] + num[i+1];
                        //console.log("sub " +ans);
                        break;
                    case "2x":
                        ans = num[i] * num[i+1];
                        //console.log("multiply "+ans);
                        break;
                    case "1/":
                        ans = num[i] / num[i+1];
                        //console.log("divide "+ans);
                        break;
                }; 
                let c = i+1;
                if(indexTrack[i] == null && indexTrack[c] == null){
                    num[i] = ans;
                    num[i+1] = ans;
                } else{
                    for (let p of Object.keys(indexTrack)){
                        num[p] = ans;
                    }
                }
                indexTrack[i] = true;
                indexTrack[c] = true;
                //console.log('indexTrack'+indexTrack[i])
                //console.log("NEW NUM:" + num)
            }
        }
    }
    return ans;
}

// Create an object giving the index of each operator
function bodmas(operators){
    let newSet = {
        '1/' : [],
        '2x' : [],
        '3+' : [],
        '4-' : [],
    };
    for (let i = 0; i < operators.length; i++){
        switch (operators[i]){
            case '/':
                newSet['1/'].push(i);
                break;
            case 'x':
                newSet['2x'].push(i);    
                break;
            case '+':
                newSet['3+'].push(i);
                break;
            case '-':
                newSet['4-'].push(i);
                break;
        }
    }
    return newSet;
}

// version 1
function operateCal_version1(num,operators){
    let ans;
    ans = num[0];
    for (let i = 0; i < operators.length; i++){
        switch (operators[i]){
            case "+":
                ans = ans + num[i+1];
                break;
            case "-":
                ans = ans - num[i+1];
                break;
            case "x":
                ans = ans * num[i+1];
                break;
            case "/":
                ans = ans / num[i+1];
                break;
        }
    }
    return ans;
}


// Function to convert the string of numbers into float data types
function convertToIntArr(strNumbers){
    let numbers = [];
    let index = 0;
    for (let i of strNumbers){
        numbers[index] = parseFloat(i);
        index = index +1; 
    }
    return numbers
}

// Function to get all the numbers. Return an array of the numbers between operators in string
function splitValues(values){
    return values.split(/[-+/x]/); 
}

// Function to get operators between numbers
function getOperators(values){
    let operators = [];
    let index = 0;
    for (let i of values){
        if (i=='+' || i=='-' || i=='x' || i=='/'){
            operators[index] = i;
            index = index +1;
        }
    }
    return operators;
}

// Fucntion to get values of the button based on its ID
function extractBtnId(btnId){
    return btnId.substring(3);
}

// Function to display on lower screen
function displayOnLowerScreen(values){
    lowerScreenDisplay.textContent = values;
}

// Function to display on upper screen
function displayOnUpperScreen(values){
    upperScreenDisplay.textContent = values;
}