const input = document.querySelector('.calculator-input');
const resultsBlock = document.querySelector('.calculator-result');
const buttonResult = document.querySelector('.calculator-button');
const buttonReset = document.querySelector('.calculator-reset');

const arabicNumerals = /^\d+$/;
const romanNumerals = /^[A-Z]+$/;
const unnecessarySymbols = /[,.]/;
const calculationSigns = /[+-/*]/;
const numberRoman = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100
} 
const keysNumberRoman = Object.keys(numberRoman);    
let lastSymbol = '';
let newString = '';

function changeFirstNumberber (item, additionalElement){
    switch(item){
        case '1':
            item =  keysNumberRoman[2];
            break;
        case '2':
            item =  keysNumberRoman[2] + keysNumberRoman[2];
            break;
        case '3':
            item = keysNumberRoman[2] + keysNumberRoman[2] + keysNumberRoman[2];
            break;
        case '4':
            item =  keysNumberRoman[2] + keysNumberRoman[3];
            break;
        case '5':
            item =  keysNumberRoman[3];
            break;
        case '6':
            item =  keysNumberRoman[3] + keysNumberRoman[2];
            break;
        case '7':
            item = keysNumberRoman[3] + keysNumberRoman[2] + keysNumberRoman[2];
            break;
        case '8':
            item =  keysNumberRoman[3] + keysNumberRoman[2] + keysNumberRoman[2] + keysNumberRoman[2];
            break;
        case '9':
            item = keysNumberRoman[2] + keysNumberRoman[4];
            break;
    }
    result = item + changeSecondNumberber(additionalElement);
    return result;
}
function changeSecondNumberber (item){
    switch(item){
        case '1':
            item =  keysNumberRoman[0];
            break;
        case '2':
            item =  keysNumberRoman[0] + keysNumberRoman[0];
            break;
        case '3':
            item = keysNumberRoman[0] + keysNumberRoman[0] + keysNumberRoman[0];
            break;
        case '4':
            item =  keysNumberRoman[0] + keysNumberRoman[1];
            break;
        case '5':
            item =  keysNumberRoman[1];
            break;
        case '6':
            item =  keysNumberRoman[1] + keysNumberRoman[0];
            break;
        case '7':
            item = keysNumberRoman[1] + keysNumberRoman[0] + keysNumberRoman[0];
            break;
        case '8':
            item =  keysNumberRoman[1] + keysNumberRoman[0] + keysNumberRoman[0] + keysNumberRoman[0];
            break;
        case '9':
            item = keysNumberRoman[0] + keysNumberRoman[2];
            break;
        case '0':
            item ='';
            break;
    }
    return item;
}

function calculate (expression){
    let numberConvertedFirst = 0;
    let numberConvertedSecond = 0;
    let result = 0;
    let newExpression = expression.split(' ');
    let expressionArray = Array.from(newExpression); 
    let firstNumber = Number(expressionArray[0]);
    let sumbol = expressionArray[1];  
    let secondNumber = Number(expressionArray[2]);

    if(
        arabicNumerals.test(newExpression[0]) && romanNumerals.test(newExpression[2]) || 
        romanNumerals.test(newExpression[0]) && arabicNumerals.test(newExpression[2]) || 
        firstNumber > 10 || secondNumber > 10 || firstNumber <= 0 || secondNumber <= 0 || 
        unnecessarySymbols.test(newExpression[0]) || unnecessarySymbols.test(newExpression[2]) || 
        expressionArray[3] || 
        numberRoman[newExpression[0]] > 10 || numberRoman[newExpression[2]] > 10
        ){
        throw new Error ("Ошибка");
    } else if(arabicNumerals.test(newExpression[0]) && arabicNumerals.test(newExpression[2])){
        switch(sumbol){
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case '/':
                result = Math.floor(firstNumber / secondNumber);
                break;
            case '*':
                result = firstNumber * secondNumber;
                break;
        }
        return result;
    } else if (romanNumerals.test(newExpression[0]) && romanNumerals.test(newExpression[2])) {
        let separatedfirstNumberber = newExpression[0].split('');
        let separatedsecondNumberber = newExpression[2].split('');;

        for(let i = 0; i < separatedfirstNumberber.length; i++){
            numberConvertedFirst = numberConvertedFirst + numberRoman[separatedfirstNumberber[i]];
        }
        for(let i = 0; i < separatedsecondNumberber.length; i++){
            numberConvertedSecond = numberConvertedSecond + numberRoman[separatedsecondNumberber[i]];
        }

        if(separatedfirstNumberber[1] === 'V'){
            numberConvertedFirst = numberConvertedFirst - 2;
        } else if(separatedfirstNumberber[1] === 'X'){
            numberConvertedFirst = numberConvertedFirst - 2;
        }

        if(separatedsecondNumberber[1] === 'V'){
            numberConvertedSecond = numberConvertedSecond - 2;
        } else if(separatedsecondNumberber[1] === 'X'){
            numberConvertedSecond = numberConvertedSecond - 2;
        }

        switch(sumbol){
            case '+':
                result = numberConvertedFirst + numberConvertedSecond;
                break;
            case '-':
                result = numberConvertedFirst - numberConvertedSecond;
                if(result <= 0){
                    result = ' ';
                } else {
                    result;
                }
                break;
            case '/':
                result = Math.floor(numberConvertedFirst / numberConvertedSecond);
                break;
            case '*':
                result = numberConvertedFirst * numberConvertedSecond;
                break;
        }
        let resultArray = Array.from(result.toString()); 

        if(resultArray.length == 1){
            return changeSecondNumberber(resultArray[0]);
        } else if(resultArray.length == 2){
            return changeFirstNumberber(resultArray[0], resultArray[1]);
        } else if(resultArray.length == 3 && result === 100){
            return resultArray = keysNumberRoman[4];
        } else {
            throw new Error ("Ошибка");
        }
        return resultArray.join('');
    }
}

input.addEventListener('keyup', function(evt){
    if(evt.keyCode === 106 || evt.keyCode === 107 || evt.keyCode === 109 || evt.keyCode === 111){
        lastSymbol = input.value.slice(-1);
        newString = input.value.replace(lastSymbol,'');
        input.value = newString + " " + input.value.slice(-1) + " "
    }
})
input.addEventListener('keydown', function(evt){
    if(evt.keyCode === 13){
        resultsBlock.textContent = calculate(input.value);
    } else if(evt.keyCode === 8){
        input.value = '';
        resultsBlock.textContent = '';
    }
});
buttonResult.addEventListener('click', function(){
    resultsBlock.textContent = calculate(input.value);
});
buttonReset.addEventListener('click', function(){
    input.value = '';
    resultsBlock.textContent = '';
})