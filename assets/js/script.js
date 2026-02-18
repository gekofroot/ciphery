
let inputArea = document.getElementById('input-area')
let inputPairI = document.getElementsByClassName('input-pair-I')
let inputPairII = document.getElementsByClassName('input-pair-II')
let inputEqualBinca = document.getElementById('input-equal-binca')
let binaryProductDisplay = document.getElementById('binary-product-display')
let decimalProductDisplay = document.getElementById('decimal-product-display')
let decimalPoint = document.getElementById('decimal-point')
let switchCurrent = document.getElementById('switch-current')

let inputPairLength = 4
let rotationDegIncrement = 45
let currentRotationDegI = 0
let currentRotationDegII = 22.5
let currentValue = 0
let displayInit0 = 1
let currentExpressionArray = []
let expressionEvaluation = 0
let expressionEvaluationB = 0
let currentDisplayFocusString = 'decimal-product-display'
let currentDisplayFocus = decimalProductDisplay
let bracketNumber = 0
let clearToggle = 0

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
  '( )', '1 / 0'
]

let withNext = [
  '-', '/', 
  '^', '*', 
  '+'
]

let withCurrent = [
  'sqrt', '=', 'C', 
  '( )', '1 / 0'
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
    currentDisplayFocusString = 'decimal-product-display'
    updateSwitchInputValue('binary-product-display')
  } else if (currentDisplayFocusString === 'binary-product-display') {
    currentDisplayFocus = binaryProductDisplay
    decimalProductDisplay.innerHTML = ``
    binaryProductDisplay.innerHTML = `${currentValue}`
    currentDisplayFocusString = 'binary-product-display'
    updateSwitchInputValue('decimal-product-display')
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
  decimalPoint.style.transition = '.2s'
  decimalPoint.style.borderBottom = '7px inset var(--acnt-b)'
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
  decimalPoint.style.transition = '.1s'
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
  let multiplier = 1000
  expressionEvaluation = Math.sqrt(inputX) 
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

      // current character special
      if (inputCharactersArray[x] === specialCharacters[y]) {

	// execute character function
	if (withNext.includes(inputCharactersArray[x])) {
	  expressionEvaluation = characterFunctions[y](inputNumbersArray[x + 1], expressionEvaluation)
	} else {
	  expressionEvaluation = characterFunctions[y](inputNumbersArray[x], expressionEvaluation)
	}
      } 
    }
  }

  // update display
  if (expressionEvaluation === undefined || expressionEvaluation === 'NaN') {
    clearFunction()
  } else {
    currentDisplayFocus.innerHTML = `${expressionEvaluation}`
  }
  
  // initialize input expression array
  inputCurrentExpressionArray = []
  return expressionEvaluation
}

// clear
function clearFunction() {
    
  // initialize values
  currentValue = 0
  displayInit0 = 1
  expressionEvaluation = 0
  currentExpressionArray = []
  if (clearToggle === 0) {

    // clear current display area
    currentDisplayFocus.innerHTML = `${currentValue}`
    clearToggle = 1
  } else if (clearToggle === 1) {

    // clear current display area
    binaryProductDisplay.innerHTML = ``
    decimalProductDisplay.innerHTML = ``
    currentDisplayFocus.innerHTML = `${currentValue}`
    clearToggle = 0
  }
}

function bracketFunction() {
}

// value conversion
function valueConversionFunction(inputX) {
  
  // evaluate initial input
  let currentExpression = displayProductFunction(inputX)
  if (currentDisplayFocusString === 'decimal-product-display') {
    
    // current display focus is decimal
    let theDivisor = currentExpression
    let theDividend = 0
    let theQuotient = 0
    let theRemainder = 0
    let convertedToBinary = ''

    // build binary from input
    while (theDivisor > 0) {
      theRemainder = theDivisor / 2
      let currentRemainder = String(theRemainder % 2)
      if (currentRemainder.includes('.')) {
	convertedToBinary += '1'
      } else {
	convertedToBinary += '0'
      }

      // update the divisor
      theDivisor = Math.floor(theRemainder)
    }

    // build converted value array
    convertedToBinaryArray = []
    expressionEvaluation = ''
    for (let x = 0; x < convertedToBinary.length; x++) {
      convertedToBinaryArray.push(convertedToBinary[x])
    }

    // reverse converted value 
    convertedToBinaryArray.reverse()

    // build expression evaluation
    for (let x = 0; x < convertedToBinaryArray.length; x++) {
      expressionEvaluation += convertedToBinaryArray[x]
    }

    // convert to number
    expressionEvaluation = Number(expressionEvaluation)
    binaryProductDisplay.innerHTML = `${expressionEvaluation}`
    return expressionEvaluation
  } else if (currentDisplayFocusString === 'binary-product-display') {

    // current display focus is binary
    let convertedToDecimal = 0
    let currentProduct = 0
    let convertedToDecimalArray = []

    // current expression to string
    currentExpression = String(currentExpression)
    for (let x = 0; x < currentExpression.length; x++) {
      convertedToDecimalArray.push(currentExpression[x])
    }
    convertedToDecimalArray.reverse()
    currentExpression = ''
    for (let x = 0; x < convertedToDecimalArray.length; x++) {
      currentExpression += convertedToDecimalArray[x]
    }

    // convert to sring
    currentExpression = String(currentExpression)
    let inputValueLength = String(currentExpression).length
    
    for (let x = 0; x < inputValueLength; x++) {
      currentProduct = currentExpression[x] * 2 ** x
      convertedToDecimal += currentProduct
    }

    expressionEvaluation = convertedToDecimal
    decimalProductDisplay.innerHTML = `${expressionEvaluation}`
    return expressionEvaluation
  }
}

let characterFunctions = [
  subtractFunction, divideFunction, 
  exponentFunction, squareRootFunction, 
  multiplyFunction, addFunction, 
  displayProductFunction, clearFunction,
  bracketFunction, valueConversionFunction
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
      
      // clear current display
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
      currentValue = ''
      
      // display event target value
      currentDisplayFocus.innerHTML = `${eventTargetValue}`

      // execute character function
      for (let x = 0; x < characterFunctions.length; x++) {
	if (eventTargetValue === '=') {

	  // display product
	  displayProductFunction(currentExpressionArray)
	  break
	} else if (eventTargetValue === 'C') {

	  // clear values
	  clearFunction()
	  break
	} else if (eventTargetValue === '1 / 0' || eventTargetValue === '0 / 1') {

	  // convert current value 
          valueConversionFunction(currentExpressionArray)
	  break
	} else if (eventTargetValue === '( )') {

	  // pop target value from expression array
	  currentExpressionArray.pop(eventTargetValue)
	  if (bracketNumber === 0) {
	    
	    // clear current string
	    currentValue = ''

	    eventTargetValue = bracketL
	    //currentExpressionArray.push(eventTargetValue)
	    
	    // clear current display
	    currentDisplayFocus.innerHTML = ``
	    currentValue += String(eventTargetValue)
	    currentDisplayFocus.innerHTML += `${currentValue}`
	    bracketNumber = 1
	    break
	  } else if (bracketNumber === 1) {

	    // clear current string
	    currentValue = ''

	    eventTargetValue = bracketR
	    //currentExpressionArray.push(eventTargetValue)
	    
	    // clear current display
	    currentDisplayFocus.innerHTML = ``
	    currentValue += String(eventTargetValue)
	    currentDisplayFocus.innerHTML += `${currentValue}`
	    bracketNumber = 0
	    break
	  }
	clearFunction()
	}
      }
    }
  } else if (currentDisplayFocusString === 'binary-product-display') {

    // is display init
    if (displayInit0 === 1) {
      
      // clear current string
      currentValue = ''
      displayInit0 = 0
    }

    // binary display focus
    // set event target value
    let eventTarget = event.target
    eventTargetValue = eventTarget.value
    if (numericsBinary.includes(eventTargetValue)) {

      // string input
      // clear current display value
      currentDisplayFocus.innerHTML = ``
      currentValue += String(eventTargetValue)
      //currentValue = Number(currentValue)
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
      currentValue = ''
      
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
	} else if (eventTargetValue === '1 / 0' || eventTargetValue === '0 / 1') {

	  // convert current value
          valueConversionFunction(currentExpressionArray)
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
	    
	    // clear current display
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
	    
	    // clear current display
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
      if (specialCharacters.includes(eventTargetValue) || numerics.includes(eventTargetValue)) {
	// event target is an input
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

// decimal point insertion
decimalPoint.addEventListener('click', () => {

  // set event target value
  let eventTarget = event.target
  eventTargetValue = eventTarget.value
  
  // clear current display
  currentDisplayFocus.innerHTML = ``
  currentValue += eventTargetValue
  currentDisplayFocus.innerHTML += `${currentValue}`
})

function updateSwitchInputValue(currentDisplayInput) {
  if (currentDisplayInput === 'decimal-product-display') {
    
    // update input value
    for (let x = 0; x < specialCharacters.length; x++) {
      if (specialCharacters[x] === '1 / 0') {
	specialCharacters[x] = '0 / 1'
      }
    }

    // update input display value
    inputEqualBinca.value = '0 / 1'
  } else if (currentDisplayInput === 'binary-product-display') {
    
    // update input value
    for (let x = 0; x < specialCharacters.length; x++) {
      if (specialCharacters[x] === '0 / 1') {
	specialCharacters[x] = '1 / 0'
      }
    }

    // update input display value
    inputEqualBinca.value = '1 / 0'
  }
}

// type switch
switchCurrent.addEventListener('click', () => {
  clearFunction()
  if (currentDisplayFocusString === 'decimal-product-display') {

    // binary switch
    currentDisplayFocus = binaryProductDisplay
    decimalProductDisplay.innerHTML = ``
    binaryProductDisplay.innerHTML = `${currentValue}`
    currentDisplayFocusString = 'binary-product-display'
    localStorage.setItem('stored-current-display-focus', currentDisplayFocusString)

    // update input value
    updateSwitchInputValue('decimal-product-display')
  } else if (currentDisplayFocusString === 'binary-product-display') {
    
    // decimal switch
    currentDisplayFocus = decimalProductDisplay
    binaryProductDisplay.innerHTML = ``
    decimalProductDisplay.innerHTML = `${currentValue}`
    currentDisplayFocusString = 'decimal-product-display'
    localStorage.setItem('stored-current-display-focus', currentDisplayFocusString)
    
    // update input value
    updateSwitchInputValue('binary-product-display')
  }
})

decimalProductDisplay.addEventListener('click', () => {
  clearFunction()
  currentDisplayFocus = decimalProductDisplay
  currentDisplayFocusString = 'decimal-product-display'
  binaryProductDisplay.innerHTML = ``
  decimalProductDisplay.innerHTML = `${currentValue}`
  localStorage.setItem('stored-current-display-focus', currentDisplayFocusString)
  
  // update input value
  updateSwitchInputValue('binary-product-display')
})

binaryProductDisplay.addEventListener('click', () => {
  clearFunction()
  currentDisplayFocus = binaryProductDisplay
  currentDisplayFocusString = 'binary-product-display'
  decimalProductDisplay.innerHTML = ``
  binaryProductDisplay.innerHTML = `${currentValue}`
  localStorage.setItem('stored-current-display-focus', currentDisplayFocusString)
  
  // update input value
  updateSwitchInputValue('decimal-product-display')
})

