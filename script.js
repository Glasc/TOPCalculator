const display = document.querySelector('#display');

const ac = document.querySelector('#ac');
const backspace = document.querySelector('#backspace');
const divide = document.querySelector('#slash');
const multiply = document.querySelector('#multiply');
const sum = document.querySelector('#sum');
const substract = document.querySelector('#substract');
const dot = document.querySelector('#dot');
const equal = document.querySelector('#equal');

let btnNumber = document.querySelectorAll('.btn-number');
let btnOperator = document.querySelectorAll('.btn-operator');

let values = {
  n1: null,
  n2: null,
  operator: null
}
let operatorPressed = false;

const appendDisplayValue = str => {
  display.textContent += str;
}
const setDisplayValue = str => {
  display.textContent = str;
}

const operate = (operator, number1, number2) => {
  if (operator === '+') {
    return parseFloat(number1) + parseFloat(number2);
  } else if (operator === '-') {
    setDisplayValue('');
    return parseFloat(number1) - parseFloat(number2);
  } else if (operator === '*') {
    return parseFloat(number1) * parseFloat(number2);
  } else if (operator === '/') {
    if (number2 === 0) {
      display.innerHTML = `ERROR`;
    } else return parseFloat(number1) / parseFloat(number2);
  }
}

const addListeners = () => {
  // numbers
  btnNumber = [...btnNumber];
  btnNumber.forEach(btn => btn.addEventListener('click', e => {

    if (display.textContent === 'El pueblo...') {
      values.n1 = null;
      values.n2 = null;
      setDisplayValue('')
      operatorPressed = false;
    }

    if (operatorPressed) {
      appendDisplayValue(btn.textContent);
      values.n2 = display.textContent;
    } else {
      appendDisplayValue(btn.textContent);
      values.n1 = display.textContent;
    }

  }))
  // operators
  btnOperator = [...btnOperator];
  btnOperator.forEach(btn => btn.addEventListener('click', e => {
    const setOperatorValues = (operator) => {
      values.n1 = display.textContent;
      setDisplayValue('');
      operatorPressed = true;
      values.operator = `${operator}`;
    }
    if (e.target === sum) {
      setOperatorValues('+')
    } else if (e.target === multiply) {
      setOperatorValues('*')
    } else if (e.target === divide) {
      setOperatorValues('/')
    } else if (e.target === substract) {
      setOperatorValues('-')
    } else if (e.target === backspace) {
      let txt = display.textContent;
      txt = txt.slice(0, -1);
      setDisplayValue(txt);
    } else if (e.target === ac) {
      values.n1 = null;
      values.n2 = null;
      setDisplayValue('')
      operatorPressed = false;
    } else if (e.target === equal) {
      if (values.n1 !== null && values.n2 !== null) {
        let result = (operate(values.operator, values.n1, values.n2));
        if (result.length > 15) {
          setDisplayValue('El pueblo...')
        } else {
          setDisplayValue(result);
          if (display.textContent.includes('.')) {
            result = result.toFixed(9);
            setDisplayValue(result);
          }
          values.n1 = result;
          values.n2 = null;
        }
      }
    }
  }))
  // dot 
  dot.addEventListener('click', e => {
    if (!display.textContent.includes('.')) {
      appendDisplayValue('.')
    }
  })
}

addListeners();