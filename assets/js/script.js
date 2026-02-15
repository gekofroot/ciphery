
let inputArea = document.getElementById('input-area')
let inputPairI = document.getElementsByClassName('input-pair-I')
let inputPairII = document.getElementsByClassName('input-pair-II')
let inputEqualBinca = document.getElementById('input-equal-binca')
let binaryProductDisplay = document.getElementById('binary-product-display')
let decimalProductDisplay = document.getElementById('decimal-product-display')
let switchCurrent = document.getElementById('switch-current')

let inputPairLength = 4
let rotationDegIncrement = 45
let currentRotationDegI = 0
let currentRotationDegII = 22.5
let currentValue = 0
let currentExpressionArray = []
let expressionEvaluation = 0
let expressionEvaluationB = 0
let currentDisplayFocusString = 'decimal-product-display'
let currentDisplayFocus = decimalProductDisplay
let bracketNumber = 0

let numerics = [
  '0', '1',
  '2', '3', 
  '4', '5', 
  '6', '7', 
  '8', '9'
]

let numericsBinary = [
  '0', '1'
]

let numericsDecimal = [
  '0', '1', '2', 
  '3', '4', '5', 
  '6', '7', '8', 
  '9', '0'
]

let specialCharacters = [
  '-', '/', 
  '^', 'sqrt', 
  '*', '+', 
  '=', 'C', 
  '( )', '1 / 0', '0 / 1'
]

let bracketL = '('
let bracketR = ')'
let brackets = [
  bracketL, bracketR
]

// retrive stored values
let storedCurrentDisplayFocus = localStorage.getItem('stored-current-display-focus')

if (storedCurrentDisplayFocus) {
  clearFunction()
  currentDisplayFocusString = storedCurrentDisplayFocus
  if (currentDisplayFocusString === 'decimal-product-display') {
    currentDisplayFocus = decimalProductDisplay
    binaryProductDisplay.innerHTML = ``
    decimalProductDisplay.innerHTML = `${currentValue}`
  } else if (currentDisplayFocusString === 'binary-product-display') {
    currentDisplayFocus = binaryProductDisplay
    decimalProductDisplay.innerHTML = ``
    binaryProductDisplay.innerHTML = `${currentValue}`
  }
} else {
  currentDisplayFocus = decimalProductDisplay
  binaryProductDisplay.innerHTML = ``
  decimalProductDisplay.innerHTML = `${currentValue}`
  currentDisplayFocusString = 'decimal-product-display'
  localStorage.setItem('stored-current-display-focus', currentDisplayFocusString)
}

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

// element anim on load
// product displays
binaryProductDisplay.style.borderBottom = '7px inset var(--acnt-b)'
decimalProductDisplay.style.borderBottom = '7px inset var(--acnt-b)'

// input pair centers
let inputPairCenters = document.getElementsByClassName('input-pair-center')
for (let x = 0; x < inputPairCenters.length; x++) {
  inputPairCenters[x].children[0].style.transition = '.2s'
  inputPairCenters[x].children[0].style.borderBottom = '7px inset var(--bd)'
  inputPairCenters[x].children[1].style.transition = '.2s'
  inputPairCenters[x].children[1].style.borderBottom = '7px inset var(--bd)'
}

// input pairs I & II
for (let x = 0; x < inputPairLength; x++) {
  switchCurrent.style.transition = '.2s'
  switchCurrent.style.borderBottom = '7px inset var(--acnt-b)'
  inputPairI[x].children[0].style.transition = '1.1s'
  inputPairI[x].children[0].style.borderBottom = '7px inset var(--bd)'
  inputPairI[x].children[1].style.transition = '1.1s'
  inputPairI[x].children[1].style.borderBottom = '7px inset var(--bd)'
  inputPairII[x].children[0].style.transition = '.7s'
  inputPairII[x].children[0].style.borderBottom = '7px inset var(--bd)'
  inputPairII[x].children[1].style.transition = '.7s'
  inputPairII[x].children[1].style.borderBottom = '7px inset var(--bd)'
}

// initialize element transition values
setTimeout(() => {
  switchCurrent.style.transition = '.1s'
  for (let x = 0; x < inputPairCenters.length; x++) {
    inputPairCenters[x].children[0].transition = '.1s'
  }
  for (let x = 0; x < inputPairLength; x++) {
    inputPairI[x].children[0].style.transition = '.1s'
    inputPairI[x].children[1].style.transition = '.1s'
    inputPairII[x].children[0].style.transition = '.1s'
    inputPairII[x].children[1].style.transition = '.1s'
    currentRotationDegI += rotationDegIncrement
  }
}, 1100)

// initiate display values
currentDisplayFocus.innerHTML = `${currentValue}`

// character functions
// subtract
function subtractFunction(inputX, inputExpressionEvaluation) {
  let returnValue = inputExpressionEvaluation -= inputX
  expressionEvaluation = returnValue
  return expressionEvaluation
}

// divide
function divideFunction(inputX, inputExpressionEvaluation) {
  let returnValue = inputExpressionEvaluation /= inputX
  expressionEvaluation = returnValue
  return expressionEvaluation
}

// exponent
function exponentFunction(inputX, inputExpressionEvaluation) {
  let returnValue = inputExpressionEvaluation **= inputX
  expressionEvaluation = returnValue
  return expressionEvaluation
}

// square root
function squareRootFunction(inputX, inputExpressionEvaluation) {
  expressionEvaluation = 0
  return expressionEvaluation
}

// multiply
function multiplyFunction(inputX, inputExpressionEvaluation) {
  let returnValue = inputExpressionEvaluation *= inputX
  expressionEvaluation = returnValue
  return expressionEvaluation
}

// add
function addFunction(inputX, inputExpressionEvaluation) {
  let returnValue = inputExpressionEvaluation += inputX
  expressionEvaluation = returnValue
  return expressionEvaluation
}

// display product
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
    currentDisplayFocus.innerHTML = `${expressionEvaluation}`
  }
  
  // initialize input expression array
  inputCurrentExpressionArray = []
}

// clear
function clearFunction() {

  // initialize values
  currentValue = 0
  expressionEvaluation = 0
  currentExpressionArray = []

  // clear display area
  currentDisplayFocus.innerHTML = `${currentValue}`
}

let characterFunctions = [
  subtractFunction, divideFunction, 
  exponentFunction, squareRootFunction, 
  multiplyFunction, addFunction, 
  displayProductFunction, clearFunction
]

inputArea.addEventListener('click', () => {
  if (currentDisplayFocusString === 'decimal-product-display') {

    // decimal display focus
    // set event target & target value
    let eventTarget = event.target
    eventTargetValue = eventTarget.value
    if (numerics.includes(eventTargetValue)) {

      // number input
      // convert input to number
      eventTargetNumber = Number(eventTargetValue)
      
      // update current display value
      currentDisplayFocus.innerHTML = ``
      currentValue += String(eventTargetNumber)
      currentValue = Number(currentValue)
      currentDisplayFocus.innerHTML += `${currentValue}`
    } else if (specialCharacters.includes(eventTargetValue)) {

      // special character pressed
      // update current expression array w/ current expression
      if (currentValue > 0) {
	
	// update current expression array w/ numerical inputs 
	currentExpressionArray.push(currentValue)
      }

      // update current expression array w/ event target value
      currentExpressionArray.push(eventTargetValue)
      
      // clear current string
      currentValue = 0
      
      // display event target value
      currentDisplayFocus.innerHTML = `${eventTargetValue}`

      // execute character function
      for (let x = 0; x < characterFunctions.length; x++) {
	if (eventTargetValue === '=') {
	  displayProductFunction(currentExpressionArray)
	  break
	} else if (eventTargetValue === 'C') {
	  clearFunction()
	  break
	} else if (eventTargetValue === '1 / 0') {
	  decimalToBinary()
	  inputEqualBinca.value = '0 / 1'
	  break
	} else if (eventTargetValue === '0 / 1') {
	  decimalToBinary()
	  inputEqualBinca.value = '1 / 0'
	  break
	} else if (eventTargetValue === '( )') {

	  // pop target value from expression array
	  currentExpressionArray.pop(eventTargetValue)
	  if (bracketNumber === 0) {
	    
	    // clear current string
	    currentValue = ''

	    eventTargetValue = bracketL
	    //currentExpressionArray.push(eventTargetValue)
	    
	    // update current display value
	    currentDisplayFocus.innerHTML = ``
	    currentValue += String(eventTargetValue)
	    currentDisplayFocus.innerHTML += `${currentValue}`
	    
	    // clear current string
	    currentValue = ''
	    bracketNumber = 1
	    break
	  } else if (bracketNumber === 1) {

	    // clear current string
	    currentValue = ''

	    eventTargetValue = bracketR
	    //currentExpressionArray.push(eventTargetValue)
	    
	    // update current display value
	    currentDisplayFocus.innerHTML = ``
	    currentValue += String(eventTargetValue)
	    currentDisplayFocus.innerHTML += `${currentValue}`
	    
	    // clear current string
	    currentValue = ''
	    bracketNumber = 0
	    break
	  }
	clearFunction()
	}
      }
    }
  } else if (currentDisplayFocusString === 'binary-product-display') {

    // binary display focus
    // set event target & target value
    let eventTarget = event.target
    eventTargetValue = eventTarget.value
    if (numericsBinary.includes(eventTargetValue)) {
      
      // number input
      // convert input to number
      eventTargetNumber = Number(eventTargetValue)
      
      // update current display value
      currentDisplayFocus.innerHTML = ``
      currentValue += String(eventTargetNumber)
      currentValue = Number(currentValue)
      currentDisplayFocus.innerHTML += `${currentValue}`
    } else if (specialCharacters.includes(eventTargetValue)) {

      // special character pressed
      // update current expression array w/ current expression
      if (currentValue > 0) {
	
	// update current expression array w/ numerical inputs 
	currentExpressionArray.push(currentValue)
      }

      // update current expression array w/ event target value
      currentExpressionArray.push(eventTargetValue)

      // clear current string
      currentValue = 0
      
      // display event target value
      currentDisplayFocus.innerHTML = `${eventTargetValue}`

      // execute character function
      for (let x = 0; x < characterFunctions.length; x++) {
	if (eventTargetValue === '=') {
	  displayProductFunction(currentExpressionArray)
	  break
	} else if (eventTargetValue === 'C') {
	  clearFunction()
	  break
	} else if (eventTargetValue === '1 / 0') {
	  decimalToBinary()
	  inputEqualBinca.value = '0 / 1'
	  break
	} else if (eventTargetValue === '0 / 1') {
	  binaryToDecimal()
	  inputEqualBinca.value = '1 / 0'
	  break
	} else if (eventTargetValue === '( )') {

	  // pop target value from expression array
	  currentExpressionArray.pop(eventTargetValue)
	  if (bracketNumber === 0) {
	    
	    // left bracket
	    // clear current string
	    currentValue = ''

	    eventTargetValue = bracketL
	    currentExpressionArray.push(eventTargetValue)
	    
	    // update current display value
	    currentDisplayFocus.innerHTML = ``
	    currentValue += String(eventTargetValue)
	    currentDisplayFocus.innerHTML += `${currentValue}`
	    bracketNumber = 1
	    break
	  } else if (bracketNumber === 1) {

	    // right bracket
	    // clear current string
	    currentValue = ''

	    // target value to current bracket
	    eventTargetValue = bracketR
	    currentExpressionArray.push(eventTargetValue)
	    
	    // update current display value
	    currentDisplayFocus.innerHTML = ``
	    currentValue += String(eventTargetValue)
	    currentDisplayFocus.innerHTML += `${currentValue}`
	    bracketNumber = 0
	    break
	  }
	  clearFunction()
	}
      }
    } else {

      // input unavailable
      binaryProductDisplay.style.transition = '.7s'
      binaryProductDisplay.style.borderBottom = '7px inset var(--invalid-selection)'
      switchCurrent.style.borderBottom = '.7s'
      switchCurrent.style.borderBottom = '7px inset var(--invalid-selection)'
      setTimeout(() => {
	binaryProductDisplay.style.transition = '.2s'
	binaryProductDisplay.style.borderBottom = '7px inset var(--acnt-b)'
	switchCurrent.style.borderBottom = '.1s'
	switchCurrent.style.borderBottom = '7px inset var(--acnt-b)'
      }, 500)
    }
  }
})

// convert decimal to binary
function decimalToBinary(inputNumber) {
  let returnValue = 0
  expressionEvaluationB = returnValue
  return expressionEvaluation
}

// convert binary to decimal
function binaryToDecimal(inputNumber) {
  let returnValue = 1
  expressionEvaluationB = returnValue
  return expressionEvaluation
}

// type switch
switchCurrent.addEventListener('click', () => {
  clearFunction()
  if (currentDisplayFocusString === 'decimal-product-display') {
    currentDisplayFocus = binaryProductDisplay
    decimalProductDisplay.innerHTML = ``
    binaryProductDisplay.innerHTML = `${currentValue}`
    currentDisplayFocusString = 'binary-product-display'
    localStorage.setItem('stored-current-display-focus', currentDisplayFocusString)
  } else if (currentDisplayFocusString === 'binary-product-display') {
    currentDisplayFocus = decimalProductDisplay
    binaryProductDisplay.innerHTML = ``
    decimalProductDisplay.innerHTML = `${currentValue}`
    currentDisplayFocusString = 'decimal-product-display'
    localStorage.setItem('stored-current-display-focus', currentDisplayFocusString)
  }
})

decimalProductDisplay.addEventListener('click', () => {
  clearFunction()
  currentDisplayFocus = decimalProductDisplay
  currentDisplayFocusString = 'decimal-product-display'
  binaryProductDisplay.innerHTML = ``
  decimalProductDisplay.innerHTML = `${currentValue}`
})

binaryProductDisplay.addEventListener('click', () => {
  clearFunction()
  currentDisplayFocus = binaryProductDisplay
  currentDisplayFocusString = 'binary-product-display'
  decimalProductDisplay.innerHTML = ``
  binaryProductDisplay.innerHTML = `${currentValue}`
})

