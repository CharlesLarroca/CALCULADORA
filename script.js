"use strict";

const $display = document.querySelector("#display");
const $numbers = document.querySelectorAll("[id*=num]");
const $operators = document.querySelectorAll("[id*=op]");
const $result = document.querySelector('#result')
const $clearDisplay = document.querySelector('#clear-display')
const $clearCalc = document.querySelector('#clear-calc')
const $backspace = document.querySelector('#backspace')
const $inverter = document.querySelector('#inverter')
const $decimal = document.querySelector('#decimal')

let newNumber = true;
let operator;
let numberPrev;

const pendOperation = () => operator !== undefined

const calc = () => {
  if(pendOperation()){
    const numberActual = parseFloat($display.textContent.replace(',','.')) 
    newNumber = true
    const result = eval(`${numberPrev}${operator}${numberActual}`)
    updateDisplay(result)
  }
}

const updateDisplay = (text) => {
  if (newNumber) {
    $display.textContent = text.toLocaleString('BR');
    newNumber = false;
  } else {
    $display.textContent += text.toLocaleString('BR');
  }
};

const insertNumber = (e) => updateDisplay(e.target.textContent);

const selectOperator = (e) => {
  if (!newNumber) {
    calc()
    newNumber = true;
    const op = e.target.textContent;
    operator = op;
    numberPrev = parseFloat($display.textContent.replace(',','.'));
  }
};

$numbers.forEach((number) => number.addEventListener("click", insertNumber));
$operators.forEach((operator) =>
  operator.addEventListener("click", selectOperator)
);

const activeResult = () =>{
  calc()
  operator = undefined
}

$result.addEventListener('click', activeResult)

const clearDisplay = () => {
  $display.textContent = ''
}

$clearDisplay.addEventListener('click', clearDisplay)

const clearCalc = () => {
  clearDisplay()
  operator = undefined
  newNumber = true
  numberPrev = undefined
}

$clearCalc.addEventListener('click', clearCalc)

const backspace = () => {
  $display.textContent = $display.textContent.slice(0, -1)
}

$backspace.addEventListener('click', backspace)

const inverter = () => {
  newNumber = true
  updateDisplay(parseFloat($display.textContent) * -1)
}

$inverter.addEventListener('click', inverter)

const decimalExist = () => $display.textContent.indexOf(',') !== -1
const valueExist = () => $display.textContent.length > 0

const decimal = () => {
  if(!decimalExist()){
    if(valueExist()){
      updateDisplay(',')
    } else {
      updateDisplay('0,')
    }
  }
}

$decimal.addEventListener('click', decimal)

const mapKeys = {
  '0':'num0',
  '1':'num1',
  '2':'num2',
  '3':'num3',
  '4':'num4',
  '5':'num5',
  '6':'num6',
  '7':'num7',
  '8':'num8',
  '9':'num9',
  '/':'op-div',
  '*':'op-mult',
  '+':'op-add',
  '-':'op-sub',
  '=':'result',
  'Enter':'result',
  'Backspace':'backspace',
  'c':'clear-display',
  'Escape':'clear-calc',
  ',':'decimal'
}

const mapKeyboard = (e) => {
  const key = e.key
  console.log(key)

  const allowedKey = () => Object.keys(mapKeys).indexOf(key) !== -1

  if(allowedKey()) document.getElementById(mapKeys[key]).click()
}

document.addEventListener('keydown', mapKeyboard)