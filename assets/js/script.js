
let inputArea = document.getElementById('input-area')
let inputPairI = document.getElementsByClassName('input-pair-I')
let inputPairII = document.getElementsByClassName('input-pair-II')
let binaryProductDisplay = document.getElementById('binary-product-display')
let decimalProductDisplay = document.getElementById('decimal-product-display')

let inputPairLength = 4
let rotationDegIncrement = 45
let currentRotationDegI = 0
let currentRotationDegII = 22.5
let currentValue = 0
let currentExpressionArray = []
let expressionEvaluation = 0
let minusPressed = 0
let dividePressed = 0
let exponentPressed = 0
let squareRootPressed = 0
let multiplyPressed = 0
let addPressed = 0
let displayProductPressed = 0
let clearPressed = 0

let numerics = [
  '0', '1',
  '2', '3', 
  '4', '5', 
  '6', '7', 
  '8', '9'
]

let specialCharacters = [
  '-', '/', 
  '^', 'sqrt', 
  '*', '+', 
  '=', 'C'
]

let specialCharacterPressed = [
  minusPressed, dividePressed, 
  exponentPressed, squareRootPressed, 
  multiplyPressed, addPressed, 
  displayProductPressed, clearPressed
]

let characterFunctions = [
  subtractFunction, divideFunction, 
  exponentFunction, squareRootFunction, 
  multiplyFunction, addFunction, 
  displayProductFunction, clearFunction
]


// establish input area
// input pair I
for (let x = 0; x < inputPairLength; x++) {
  inputPairI[x].style.transform = `rotate(${currentRotationDegI}deg)`
  inputPairI[x].children[0].style.transform = `rotate(-${currentRotationDegI}deg)`
  inputPairI[x].children[1].style.transform = `rotate(-${currentRotationDegI}deg)`
  currentRotationDegI += rotationDegIncrement
}

// input pair II
for (let x = 0; x < inputPairLength; x++) {
  inputPairII[x].style.transform = `rotate(${currentRotationDegII}deg)`
  inputPairII[x].children[0].style.transform = `rotate(-${currentRotationDegII}deg)`
  inputPairII[x].children[1].style.transform = `rotate(-${currentRotationDegII}deg)`
  currentRotationDegII += rotationDegIncrement
}

// initiate display value
decimalProductDisplay.innerHTML = `${currentValue}`

function subtractFunction(inputX, inputExpressionEvaluation) {
  let returnValue = inputExpressionEvaluation -= inputX
  expressionEvaluation = returnValue
  return expressionEvaluation
}

function divideFunction(inputX, inputExpressionEvaluation) {
  let returnValue = inputExpressionEvaluation /= inputX
  expressionEvaluation = returnValue
  return expressionEvaluation
}

function exponentFunction(inputX, inputExpressionEvaluation) {
  let returnValue = inputExpressionEvaluation **= inputX
  expressionEvaluation = returnValue
  return expressionEvaluation
}

function squareRootFunction(inputX, inputExpressionEvaluation) {
  expressionEvaluation = 0
  return expressionEvaluation
}

function multiplyFunction(inputX, inputExpressionEvaluation) {
  let returnValue = inputExpressionEvaluation *= inputX
  expressionEvaluation = returnValue
  return expressionEvaluation
}

function addFunction(inputX, inputExpressionEvaluation) {
  let returnValue = inputExpressionEvaluation += inputX
  expressionEvaluation = returnValue
  return expressionEvaluation
}

function displayProductFunction(inputCurrentExpressionArray) {

  // evaluate expression
  let inputNumbersArray = []
  let inputCharactersArray = []
  inputCurrentExpressionArray.pop()
  for (let x = 0; x < inputCurrentExpressionArray.length; x++) {
    if (specialCharacters.includes(inputCurrentExpressionArray[x])) {
      inputCharactersArray.push(inputCurrentExpressionArray[x])
    } else {
      inputNumbersArray.push(inputCurrentExpressionArray[x])
    }
  }

  // set expression evaluation to first integer
  expressionEvaluation = inputNumbersArray[0]
  for (let x = 0; x < inputNumbersArray.length; x++) {
    for (let y = 0; y < specialCharacters.length; y++) {
      if (inputCharactersArray[x] === specialCharacters[y]) {

	// execute character function
	expressionEvaluation = characterFunctions[y](inputNumbersArray[x + 1], expressionEvaluation)
      } 
    }
  }

  // update display
  if (expressionEvaluation === undefined) {
    clearFunction()
  } else {
    decimalProductDisplay.innerHTML = `${expressionEvaluation}`
  }
  
  // initialize input expression array
  inputCurrentExpressionArray = []
}

function clearFunction() {

  // initialize values
  currentValue = 0
  expressionEvaluation = 0
  currentExpressionArray = []

  // clear display area
  decimalProductDisplay.innerHTML = `${currentValue}`
}

inputArea.addEventListener('click', () => {
  let eventTarget = event.target
  eventTargetValue = eventTarget.value
  if (numerics.includes(eventTargetValue)) {

    // convert input to number
    eventTargetNumber = Number(eventTargetValue)
    
    // number selected
    decimalProductDisplay.innerHTML = ''
    currentValue += String(eventTargetNumber)
    currentValue = Number(currentValue)
    decimalProductDisplay.innerHTML += `${currentValue}`
  }
  if (specialCharacters.includes(eventTargetValue)) {

    // update current expression array w/ current expression
    if (currentValue > 0) {
      currentExpressionArray.push(currentValue)
    } 
    
    // clear current string
    currentValue = 0
    
    // update current expression arrray w/ event target value
    currentExpressionArray.push(eventTargetValue)

    // display event target value
    decimalProductDisplay.innerHTML = `${eventTargetValue}`

    // flag pressed
    for (let x = 0; x < specialCharacterPressed.length; x++) {
      if (eventTargetValue === specialCharacters[x]) {
	specialCharacterPressed[x] = 1
      }
    }

    // execute character function
    for (let x = 0; x < specialCharacterPressed.length; x++) {
      if (eventTargetValue === '=') {
	displayProductFunction(currentExpressionArray)
	break
      } else if (eventTargetValue === 'C') {
	clearFunction()
      } 
    }
  }
})

