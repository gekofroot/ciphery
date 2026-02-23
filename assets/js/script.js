
let settingsPanel = document.getElementById('settings-panel')
let themeSelection = document.getElementById('theme-selection')
let fmSelection = document.getElementById('fm-selection')
let innerField = document.getElementById('inner-field')
let displayField = document.getElementById('display-field')
let areaShader = document.getElementById('area-shader')
let inputArea = document.getElementById('input-area')
let inputAreaSecondary = document.getElementById('input-area-secondary')
let inputPairI = document.getElementsByClassName('input-pair-I')
let inputPairII = document.getElementsByClassName('input-pair-II')
let equalBinca = document.getElementById('equal-binca')
let productDisplays = document.getElementsByClassName('product-display')
let binaryProductDisplay = document.getElementById('binary-product-display')
let decimalProductDisplay = document.getElementById('decimal-product-display')
let switchCurrent = document.getElementById('switch-current')
let decimalPoint = document.getElementById('decimal-point')

let inputPairLength = 4
let rotationDegIncrement = 45
let currentRotationDegI = 0
let currentRotationDegII = 22.5
let currentValue = 0 
let currentDisplayStringValue = ''
let displayInit0 = 1
let currentExpressionArray = []
let expressionEvaluation = 0
let currentDisplayFocusString = 'decimal-product-display'
let currentDisplayFocus = decimalProductDisplay
let braceNumber = 0
let clearToggle = 0

let addNotTo = [
  '=', '1 / 0', 
  '<-', 'set.',
  '< >'
]

let bedmas = [
  '(', ')', 
  '^', '/',
  '*', '+',
  '-'
]

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

let specialCharacters = [
  '( )', '^', 
  '/', '*', 
  '+', '-',
  'sqrt', '=', 
  'C', '+/-', 
  '%', '1 / 0', 
  'pi', 'sin', 
  'cos', 'tan', 
  'log', '<', 
  '>', '<-', 
  'set.'
]

let withPrev = [
  '+/-'
]

let withCurrent = [
  'sqrt', '=', 'C', 
  '( )', '1 / 0', 
  'pi', 'sin', 
  'cos', 'tan',
  'log', '<-', 
  'set.'
]

let withNext = [
  '^', '/', 
  '*', '+', 
  '-', '%',
  '<', '>'
]

let braceL = '('
let braceR = ')'
let braces = [
  braceL, braceR
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

// element anim on load
setTimeout(() => {
  displayField.style.boxShadow = 'inset 0 5em 5em .1em var(--acnt-b), var(--bd) 0 0 .2em .1em'}, 300)
areaShaderCount = 100
setTimeout(() => {
  let areaShaderInterval = setInterval(() => {
    if (areaShaderCount < 0) {
      areaShader.style.display = 'none'
      clearInterval(areaShaderInterval)
    } else {
      areaShader.style.height = `${areaShaderCount}%`
      areaShaderCount -= 5
    }
  }, 10)
}, 100)

// input pair centers
let inputPairCenters = document.getElementsByClassName('input-pair-center')
for (let x = 0; x < inputPairCenters.length; x++) {
  inputPairCenters[x].children[0].style.transition = '.2s'
  inputPairCenters[x].children[0].style.borderBottom = '5px inset var(--acnt-b)'
  inputPairCenters[x].children[1].style.transition = '.2s'
  inputPairCenters[x].children[1].style.borderBottom = '5px inset var(--acnt-b)'
}

// input pairs I & II
for (let x = 0; x < inputPairLength; x++) {
  switchCurrent.style.transition = '.2s'
  switchCurrent.style.borderBottom = '5px inset var(--acnt-b)'
  inputPairI[x].children[0].style.transition = '1.1s'
  inputPairI[x].children[0].style.borderBottom = '5px inset var(--acnt-b)'
  inputPairI[x].children[1].style.transition = '1.1s'
  inputPairI[x].children[1].style.borderBottom = '5px inset var(--acnt-b)'
  inputPairII[x].children[0].style.transition = '.7s'
  inputPairII[x].children[0].style.borderBottom = '5px inset var(--acnt-b)'
  inputPairII[x].children[1].style.transition = '.7s'
  inputPairII[x].children[1].style.borderBottom = '5px inset var(--acnt-b)'
}

// inputs secondary
let inputsSecondary = inputAreaSecondary.children

// retrieve stored values
let storedFM = localStorage.getItem('stored-fm')
if (storedFM) {
  if (storedFM === 'Display') {
    inputFM('var(--acnt-d)', 'var(--txt)', 'var(--bd)', 'var(--acnt-b)', 'var(--bd)')
  } else if (storedFM === 'Accent') {
    inputFM('var(--clr)', 'var(--clr)', 'var(--clr)', 'var(--fm-guide)', 'var(--bd)')
  } else if (storedFM === 'Clear') {
    inputFM('var(--clr)', 'var(--clr)', 'var(--clr)', 'var(--clr)', 'var(--clr)')
  }
  fmSelection.value = storedFM
} else {
  fmSelection.value = 'Display'
  localStorage.setItem('stored-fm', 'Display')
} 

let storedTheme = localStorage.getItem('stored-theme')
if (storedTheme) {
  document.documentElement.setAttribute('data-theme', storedTheme)
  themeSelection.value = storedTheme
} else {
  document.documentElement.setAttribute('data-theme', 'Light')
  themeSelection.value = 'Light'
  localStorage.setItem('stored-theme', 'Light')
} 

let storedCurrentDisplayFocus = localStorage.getItem('stored-current-display-focus')
if (storedCurrentDisplayFocus) {
  clearFunction()
  currentDisplayFocusString = storedCurrentDisplayFocus
  if (currentDisplayFocusString === 'decimal-product-display') {
    currentDisplayFocus = decimalProductDisplay
    binaryProductDisplay.innerHTML = ''
    currentDisplayFocusString = 'decimal-product-display'
    updateSwitchInputValue('binary-product-display')
    displayTextArea(decimalProductDisplay, currentValue, 300)
  } else if (currentDisplayFocusString === 'binary-product-display') {
    currentDisplayFocus = binaryProductDisplay
    decimalProductDisplay.innerHTML = ''
    currentDisplayFocusString = 'binary-product-display'
    updateSwitchInputValue('decimal-product-display')
    displayTextArea(binaryProductDisplay, currentValue, 300)
  }
} else {
  currentDisplayFocus = decimalProductDisplay
  binaryProductDisplay.innerHTML = ''
  currentDisplayFocusString = 'decimal-product-display'
  localStorage.setItem('stored-current-display-focus', currentDisplayFocusString)
  displayTextArea(decimalProductDisplay, currentValue, 300)
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

// character functions
// subtract
function subtractFunction(inputX, inputExpressionEvaluation) {
  expressionEvaluation = inputExpressionEvaluation -= inputX
  return expressionEvaluation
}

// divide
function divideFunction(inputX, inputExpressionEvaluation) {
  expressionEvaluation = inputExpressionEvaluation /= inputX
  return expressionEvaluation
}

// exponent
function exponentFunction(inputX, inputExpressionEvaluation) {
  let expressionEvaluation = inputExpressionEvaluation **= inputX
  return expressionEvaluation
}

// square root
function squareRootFunction(inputX, inputExpressionEvaluation) {
  let multiplier = 1000
  expressionEvaluation = Math.sqrt(inputX) 
  for (let x = 0; x < currentExpressionArray.length; x++) {
    if (currentExpressionArray[x] === 'sqrt') {
      currentExpressionArray[x] = expressionEvaluation
    }
  }
  currentExpressionArray = currentExpressionArray.slice(-1)
  return expressionEvaluation
}

// multiply
function multiplyFunction(inputX, inputExpressionEvaluation) {
  expressionEvaluation = inputExpressionEvaluation *= inputX
  return expressionEvaluation
}

// add
function addFunction(inputX, inputExpressionEvaluation) {
  expressionEvaluation = inputExpressionEvaluation += (inputX)
  return expressionEvaluation
}

// display product
function displayProductFunction(inputCurrentExpressionArray) {

  // evaluate expression
  let inputNumbersArray = []
  let inputCharactersArray = []

  for (let y = 0; y < inputCurrentExpressionArray.length; y++) {
    
    // eval on equal press
    if (withCurrent.includes(inputCurrentExpressionArray[y])) {
    } else {

      // multiple evaluation
      inputCurrentExpressionArray.pop()
    }
  }

  // build input numbers & input characters array
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
	} else if (withPrev.includes(inputCharactersArray[x])) {
	  expressionEvaluation = characterFunctions[y](inputNumbersArray[x])
	} else {
	  expressionEvaluation = characterFunctions[y](inputNumbersArray[x], expressionEvaluation)
	  break
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

// remove selected value from array
function remove(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1))
}

function operatorOrderEval(inputOpEvalArray) {
  let orderedExpressionArray = []
  for (let bedmasX = 0; bedmasX < bedmas.length; bedmasX++) {
    if (inputOpEvalArray.includes(bedmas[bedmasX])) {

      // init operator eval array
      let operatorEvalArray = []

      // assign index values
      let popFirst = inputOpEvalArray.indexOf(bedmas[bedmasX]) - 1
      let popSecond = inputOpEvalArray.indexOf(bedmas[bedmasX])
      let popThird = inputOpEvalArray.indexOf(bedmas[bedmasX]) + 1

      // build sub expression array
      operatorEvalArray.push(inputOpEvalArray[popFirst])
      operatorEvalArray.push(inputOpEvalArray[popSecond])
      operatorEvalArray.push(inputOpEvalArray[popThird])

      // slice built expression from input array
      inputOpEvalArray = remove(inputOpEvalArray, popFirst)
      inputOpEvalArray = remove(inputOpEvalArray, popFirst)
      inputOpEvalArray = remove(inputOpEvalArray, popFirst)

      // evaluate operator eval expression
      let inputNumbersArray = []
      let inputCharactersArray = []
      for (let x = 0; x < operatorEvalArray.length; x++) {
	if (specialCharacters.includes(operatorEvalArray[x])) {
	  inputCharactersArray.push(operatorEvalArray[x])
	} else {
	  inputNumbersArray.push(operatorEvalArray[x])
	}
      }

      // set expression evaluation to first integer
      operatorExpression = inputNumbersArray[0]
      for (let x = 0; x < inputNumbersArray.length; x++) {
	for (let y = 0; y < specialCharacters.length; y++) {

	  // current character special
	  if (inputCharactersArray[x] === specialCharacters[y]) {

	    // execute character function
	    if (withNext.includes(inputCharactersArray[x])) {
	      operatorExpression = characterFunctions[y](inputNumbersArray[x + 1], inputNumbersArray[x])
	    } 
	  } 
	}
      }

      // insert evaluated expression at popfirst index
      inputOpEvalArray.splice(popFirst, 0, operatorExpression)
      inputArray = []
      inputArray = inputOpEvalArray
      orderedExpressionArray = inputOpEvalArray
      if (inputOpEvalArray[1] === '=') {
	expressionEvaluation = orderedExpressionArray
	break
      } else if (inputOpEvalArray[1] != '=') {
	operatorOrderEval(inputArray)
	inputOpEvalArray = []
      }
    }
  }
  return expressionEvaluation
}

function clearFunction() {
    
  // initialize values
  displayInit0 = 1
  currentValue = 0
  currentDisplayStringValue = ''
  currentExpressionArray = []
  expressionEvaluation = 0
  if (clearToggle === 0) {

    // clear current display area
    clearToggle = 1
    setTimeout(() => {
      setTimeout(() => {
	currentDisplayFocus.innerHTML = `${currentValue}`
      }, 50)
      setTimeout(() => {
	currentDisplayFocus.style.color = 'var(--txt)'
      }, 100)
      setTimeout(() => {
	currentDisplayFocus.style.textDecoration = `underline var(--acnt-b) .4em`
	currentDisplayFocus.style.animationName = `tu-pulse`
      }, 300)
    }, 50)
  } else if (clearToggle === 1) {

    // clear current display area
    binaryProductDisplay.innerHTML = ''
    decimalProductDisplay.innerHTML = ''
    clearToggle = 0
    setTimeout(() => {
      setTimeout(() => {
	currentDisplayFocus.innerHTML = `${currentValue}`
      }, 50)
      setTimeout(() => {
	currentDisplayFocus.style.color = 'var(--txt)'
      }, 100)
      setTimeout(() => {
	currentDisplayFocus.style.textDecoration = `underline var(--acnt-b) .4em`
	currentDisplayFocus.style.animationName = `tu-pulse`
      }, 300)
    }, 50)
  }
}

function braceFunction(inputExpressionArray) {
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

function piFunction() {
  expressionEvaluation = Math.PI
  for (let x = 0; x < currentExpressionArray.length; x++) {
    if (currentExpressionArray[x] === 'pi') {
      currentExpressionArray[x] = expressionEvaluation
    }
  }
  currentDisplayFocus.innerHTML = `${expressionEvaluation}`
  return expressionEvaluation
}

function sinFunction(inputX) {
  expressionEvaluation = Math.sin(inputX)
  for (let x = 0; x < currentExpressionArray.length; x++) {
    if (currentExpressionArray[x] === 'sin') {
      currentExpressionArray[x] = expressionEvaluation
    }
  }
  currentExpressionArray = currentExpressionArray.slice(-1)
  currentDisplayFocus.innerHTML = `${expressionEvaluation}`
  return expressionEvaluation
}

function cosFunction(inputX) {
  expressionEvaluation = Math.cos(inputX)
  for (let x = 0; x < currentExpressionArray.length; x++) {
    if (currentExpressionArray[x] === 'cos') {
      currentExpressionArray[x] = expressionEvaluation
    }
  }
  currentExpressionArray = currentExpressionArray.slice(-1)
  currentDisplayFocus.innerHTML = `${expressionEvaluation}`
  return expressionEvaluation
}

function tanFunction(inputX) {
  expressionEvaluation = Math.tan(inputX)
  for (let x = 0; x < currentExpressionArray.length; x++) {
    if (currentExpressionArray[x] === 'tan') {
      currentExpressionArray[x] = expressionEvaluation
    }
  }
  currentExpressionArray = currentExpressionArray.slice(-1)
  currentDisplayFocus.innerHTML = `${expressionEvaluation}`
  return expressionEvaluation
}

function logFunction(inputX) {
  expressionEvaluation = Math.log(inputX)
  for (let x = 0; x < currentExpressionArray.length; x++) {
    if (currentExpressionArray[x] === 'tan') {
      currentExpressionArray[x] = expressionEvaluation
    }
  }
  currentExpressionArray = currentExpressionArray.slice(-1)
  currentDisplayFocus.innerHTML = `${expressionEvaluation}`
  return expressionEvaluation
}

function modulusFunction(inputX, inputExpressionEvaluation) {
  expressionEvaluation = ''
  expressionEvaluation = inputExpressionEvaluation %= inputX
  currentDisplayFocus.innerHTML = `${expressionEvaluation}`
  currentExpressionArray = []
  return expressionEvaluation
}

function addPlusMinusFunction(inputX) {
  expressionEvaluation = -inputX
  
  // pop character
  for (let x = 0; x < currentExpressionArray.length; x++) {
    if (currentExpressionArray[x] === '+/-') {
      currentExpressionArray.shift()
      break
    }
  }

  // replace input with converted
  for (let x = 0; x < currentExpressionArray.length; x++) {
    if (currentExpressionArray[x] === inputX) {
      currentExpressionArray[x] = expressionEvaluation
      break
    }
  }
  return expressionEvaluation
}

function comparisonLtFunction(inputX, inputExpressionArray) {
  if (inputExpressionArray < inputX) {
    comparisonResult = 1
  } else {
    comparisonResult = 0
  }
  expressionEvaluation = 0
  expressionEvaluation = comparisonResult
  currentExpressionArray = []
  return expressionEvaluation
}

function comparisonGtFunction(inputX, inputExpressionArray) {
  if (inputExpressionArray > inputX) {
    comparisonResult = 1
  } else {
    comparisonResult = 0
  }
  expressionEvaluation = 0
  expressionEvaluation = comparisonResult
  currentExpressionArray = []
  return expressionEvaluation
}

function backspaceFunction(inputExpressionArray) {
  inputExpressionArray = []
  currentExpressionArray = []
  currentValue = currentDisplayStringValue.slice(0, -2)
  inputExpressionArray.push(currentDisplayStringValue.slice(0, -2))
  currentExpressionArray.push(currentDisplayStringValue.slice(0, -2))
  inputExpressionArray = inputExpressionArray.slice(-2)
  currentExpressionArray = currentExpressionArray.slice(-2)
  currentDisplayStringValue = currentDisplayStringValue.slice(0, -3)
  let currentString = String(inputExpressionArray[0])
  currentString = currentString.slice(0, -1)
  currentString = Number(currentString)
  inputExpressionArray[0] = currentString
  currentExpressionArray[0] = currentString


  for (let x = 0; x < inputExpressionArray.length; x++) {
    if (inputExpressionArray[x] != currentString) {
      inputExpressionArray.pop(inputExpressionArray[x])
      currentExpressionArray.pop(inputExpressionArray[x])
    }
  }
  inputExpressionArray.push(currentString)
  currentDisplayFocus.innerHTML = `${currentString}`
}

// settings panel toggle
let settingsPanelToggle = 0
function settingsFunction() {
  if (settingsPanelToggle === 0) {

    // display settings panel
    let settingsPanelCount = 0
    settingsPanel.style.display = 'flex'
    setTimeout(() => {
      let settingsPanelIntervalB = setInterval(() => {
	if (settingsPanelCount > 100) {
	  clearInterval(settingsPanelIntervalB)
	} else {
	  settingsPanel.style.height = `${settingsPanelCount}%`
	  settingsPanelCount += 2
	}
      }, 10)
    }, 100)
    settingsPanelToggle = 1
  }
   
  // clear current expression array
  currentExpressionArray = []
  //currentDisplayFocus.innerHTML = `${currentValue}`

}
settingsPanel.addEventListener('dblclick', () => {
  if (settingsPanelToggle === 1) {

    // fade settings panel
    let settingsPanelCount = 100
    setTimeout(() => {
      let settingsPanelIntervalB = setInterval(() => {
	if (settingsPanelCount < 0) {
	  settingsPanel.style.display = 'none'
	  clearInterval(settingsPanelIntervalB)
	} else {
	  settingsPanel.style.height = `${settingsPanelCount}%`
	  settingsPanelCount -= 2
	}
      }, 10)
    }, 100)
    settingsPanelToggle = 0
  }
})

let characterFunctions = [
  braceFunction, exponentFunction, 
  divideFunction, multiplyFunction, 
  addFunction, subtractFunction, 
  squareRootFunction, displayProductFunction, 
  clearFunction, addPlusMinusFunction, 
  modulusFunction, valueConversionFunction, 
  piFunction, sinFunction, 
  cosFunction, tanFunction, 
  logFunction, comparisonLtFunction, 
  comparisonGtFunction, backspaceFunction, 
  settingsFunction
]

// text initialization
function displayTextArea(inputDisplay, inputValue, inputTimeout) {
  inputDisplay.style.color = 'var(--clr)'
  inputDisplay.style.textDecoration = `underline var(--clr) .1em`
  setTimeout(() => {
    setTimeout(() => {
      inputDisplay.innerHTML = `${inputValue}`
    }, 50)
    
    setTimeout(() => {
      inputDisplay.style.color = 'var(--txt)'
    }, 100)
    setTimeout(() => {
      inputDisplay.style.textDecoration = `underline var(--acnt-b) .4em`
      inputDisplay.style.animationName = `tu-pulse`
    }, 300)
  }, inputTimeout)
}

innerField.addEventListener('click', () => {

  // input length pulse
  if (String(currentValue).length > 1) {
    currentDisplayFocus.style.animationName = 'unset'
  } else {
    currentDisplayFocus.style.animationName = 'tu-pulse'
  }
  if (currentDisplayFocusString === 'decimal-product-display') {

    // decimal display focus
    // set event target & target value
    let eventTarget = event.target
    eventTargetValue = eventTarget.value

    // update initial string value
    if (numerics.includes(eventTargetValue) || specialCharacters.includes(eventTargetValue)) {
      currentDisplayStringValue += String(eventTargetValue)
      currentDisplayFocus.innerHTML = `${currentDisplayStringValue}`
    }
  
    if (numerics.includes(eventTargetValue)) {

      // number input
      // convert input to number
      eventTargetNumber = Number(eventTargetValue)
      
      // update current value with event target number as string
      currentValue += String(eventTargetNumber)

      // convert current value to number
      currentValue = Number(currentValue)
    } else if (specialCharacters.includes(eventTargetValue)) {

      // special character pressed
      // update current expression array w/ current expression
      if (currentValue > 0) {
	
	// update current expression array w/ numerical inputs 
	currentExpressionArray.push(currentValue)
      }

      // update current expression array w/ event target value
      currentExpressionArray.push(eventTargetValue)

      // select slice index
      selectedSliceIndex = currentExpressionArray.length - 1

      // update current display string
      if (!addNotTo.includes(eventTargetValue)) {
	if (specialCharacters.includes(String(currentExpressionArray[selectedSliceIndex - 1])) && specialCharacters.includes(eventTargetValue)) {

	  // double operator input
	  // current input is last index value
	  // update display string value
	  currentExpressionArray = currentExpressionArray.slice(0, -2)
	  currentExpressionArray.push(eventTargetValue)
	  //currentExpressionArray.pop()

	  // update display string value
	  currentDisplayStringValue = currentDisplayStringValue.slice(0, -2)
	  currentDisplayStringValue += String(eventTargetValue)
	  currentDisplayFocus.innerHTML = `${currentDisplayStringValue}`
	}

      }

      // clear current string
      currentValue = ''
      
      // display event target value
      // continue if settings toggle
      /*
      if (eventTargetValue === 'set.') {
	currentDisplayFocus.innerHTML = `${}`
      } else {
	currentDisplayFocus.innerHTML = `${eventTargetValue}`
      }
      */
      //currentDisplayFocus.innerHTML = `${eventTargetValue}`

      // execute character function
      for (let x = 0; x < characterFunctions.length; x++) {
	if (eventTargetValue === '=') {
	  if (specialCharacters.includes(String(currentExpressionArray[selectedSliceIndex - 1]))) {
	    
	    // update display string value
	    //currentExpressionArray = currentExpressionArray.slice(0, -2)
	    //currentExpressionArray.push(eventTargetValue)

	    // update display string value
	    //currentDisplayStringValue = currentDisplayStringValue.slice(0, -2)
	    //currentDisplayStringValue += String(eventTargetValue)
	    currentDisplayFocus.innerHTML = `${currentDisplayStringValue}`
	  }

	  for (let cx = 0; cx < currentExpressionArray.length; cx++) {
	    if (withNext.includes(currentExpressionArray[cx])) {

	      // evaluate current expression array
	      // send through oop
	      // display product
	      displayProductFunction(operatorOrderEval(currentExpressionArray))
	      break
	    }
	    if (withCurrent.includes(currentExpressionArray[cx])) {
	      
	      // evaluate current expression array
	      // display product
	      displayProductFunction(currentExpressionArray)
	      break
	    }
	  }
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
	  //currentExpressionArray.pop(eventTargetValue)
	  if (braceNumber === 0) {
	    
	    // clear current string
	    //currentValue = ''

	    //eventTargetValue = braceL
	    //currentExpressionArray.push(eventTargetValue)
	    
	    // update current value
	    //currentValue += String(eventTargetValue)
	    braceNumber = 1
	    break
	  } else if (braceNumber === 1) {

	    // clear current string
	    //currentValue = ''

	    //eventTargetValue = braceR
	    //currentExpressionArray.push(eventTargetValue)
	    
	    // update current value
	    //currentValue += String(eventTargetValue)
	    braceNumber = 0

	    // clear on update
	    clearFunction()
	    break
	  }
	clearFunction()
	} else if (eventTargetValue === 'pi') {
	  piFunction()
	  break
	} else if (eventTargetValue === '<-') {
	  backspaceFunction(currentExpressionArray)
	  break
	} else if (eventTargetValue === 'set.') {
	  settingsFunction()
	  break
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
    
    // update current display string
    if (!addNotTo.includes(eventTargetValue)) {
      if (numericsBinary.includes(eventTargetValue) || specialCharacters.includes(eventTargetValue)) {
	
	// update current display innerHTML
	currentDisplayStringValue += String(eventTargetValue)
	currentDisplayFocus.innerHTML = `${currentDisplayStringValue}`
      }
    }
    if (numericsBinary.includes(eventTargetValue)) {

      // string input
      // update current value
      currentValue += String(eventTargetValue)
    } else if (specialCharacters.includes(eventTargetValue)) {

      // special character pressed
      // update current expression array w/ current expression
      if (currentValue > 0) {
	
	// update current expression array w/ numerical inputs 
	//currentExpressionArray.push(currentValue)
      }

      // update current expression array w/ event target value
      //currentExpressionArray.push(eventTargetValue)

      // clear current string
      currentValue = ''
      
      // display event target value
      //currentDisplayFocus.innerHTML = `${eventTargetValue}`

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
	  //currentExpressionArray.pop(eventTargetValue)
	  if (braceNumber === 0) {
	    
	    // left brace
	    // clear current string
	    //currentValue = ''
	    //eventTargetValue = braceL
	    //currentExpressionArray.push(eventTargetValue)
	    
	    // update current value
	    //currentValue += String(eventTargetValue)
	    braceNumber = 1
	    break
	  } else if (braceNumber === 1) {

	    // right brace
	    // clear current string
	    //currentValue = ''

	    // target value to current brace
	    //eventTargetValue = braceR
	    //currentExpressionArray.push(eventTargetValue)
	    
	    // update current value
	    //currentValue += String(eventTargetValue)
	    braceNumber = 0
	    
	    // clear on update
	    clearFunction()
	    break
	  }
	  clearFunction()
	} else if (eventTargetValue === 'pi') {
	  piFunction()
	  break
	} else if (eventTargetValue === '<-') {
	  backspaceFunction(currentExpressionArray)
	  break
	} else if (eventTargetValue === 'set.') {
	  settingsFunction()
	  break
	}
      }
    } else {
      
      // input unavailable
      if (specialCharacters.includes(eventTargetValue) || numerics.includes(eventTargetValue)) {
	// event target is an input
	switchCurrent.style.borderBottom = '.2s'
	switchCurrent.style.borderBottom = '5px inset var(--invalid-selection)'
	setTimeout(() => {
	  switchCurrent.style.borderBottom = '.1s'
	  switchCurrent.style.borderBottom = '2px inset var(--acnt-b)'
	}, 200)
      } 
    }
  }
})

// decimal point insertion
decimalPoint.addEventListener('click', () => {

  // set event target value
  let eventTarget = event.target
  eventTargetValue = eventTarget.value
  
  // update current value
  currentValue += eventTargetValue
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
    equalBinca.value = '0 / 1'
  } else if (currentDisplayInput === 'binary-product-display') {
    
    // update input value
    for (let x = 0; x < specialCharacters.length; x++) {
      if (specialCharacters[x] === '0 / 1') {
	specialCharacters[x] = '1 / 0'
      }
    }

    // update input display value
    equalBinca.value = '1 / 0'
  }
}

// type switch
switchCurrent.addEventListener('click', () => {
  clearFunction()
  if (currentDisplayFocusString === 'decimal-product-display') {

    // binary switch
    currentDisplayFocus = binaryProductDisplay
    decimalProductDisplay.innerHTML = ''
    currentDisplayFocusString = 'binary-product-display'
    localStorage.setItem('stored-current-display-focus', currentDisplayFocusString)

    // update input value
    updateSwitchInputValue('decimal-product-display')
    displayTextArea(binaryProductDisplay, currentValue, 50)
  } else if (currentDisplayFocusString === 'binary-product-display') {
    
    // decimal switch
    currentDisplayFocus = decimalProductDisplay
    binaryProductDisplay.innerHTML = ''
    currentDisplayFocusString = 'decimal-product-display'
    localStorage.setItem('stored-current-display-focus', currentDisplayFocusString)
    
    // update input value
    updateSwitchInputValue('binary-product-display')
    displayTextArea(decimalProductDisplay, currentValue, 50)
  }
})

// on display touch
decimalProductDisplay.addEventListener('click', () => {
  clearFunction()
  currentDisplayFocus = decimalProductDisplay
  currentDisplayFocusString = 'decimal-product-display'
  binaryProductDisplay.innerHTML = ''
  localStorage.setItem('stored-current-display-focus', currentDisplayFocusString)
  
  // update input value
  updateSwitchInputValue('binary-product-display')
  displayTextArea(decimalProductDisplay, currentValue, 50)
})

binaryProductDisplay.addEventListener('click', () => {
  clearFunction()
  currentDisplayFocus = binaryProductDisplay
  currentDisplayFocusString = 'binary-product-display'
  decimalProductDisplay.innerHTML = ''
  localStorage.setItem('stored-current-display-focus', currentDisplayFocusString)
  
  // update input value
  updateSwitchInputValue('decimal-product-display')
  displayTextArea(binaryProductDisplay, currentValue, 50)
})

themeSelection.addEventListener('change', () => {
  let selectionValue = themeSelection.value
  document.documentElement.setAttribute('data-theme', selectionValue)
  localStorage.setItem('stored-theme', selectionValue)
  themeSelection.value = selectionValue
})

function inputFM(inputBackground, inputColor, inputBorder, inputBorderBottom, inputBoxShadow) {

  // input pair centers
  for (let x = 0; x < inputPairCenters.length; x++) {
    inputPairCenters[x].children[0].style.background = `${inputBackground}`
    inputPairCenters[x].children[0].style.color = `${inputColor}`
    inputPairCenters[x].children[0].style.border = `1px solid ${inputBorder}`
    inputPairCenters[x].children[0].style.borderBottom = `5px inset ${inputBorderBottom}`
    inputPairCenters[x].children[0].style.boxShadow = `${inputBoxShadow} 0 0 .05em .1em, inset -.1em -.1em 1em ${inputBoxShadow}`
    inputPairCenters[x].children[1].style.background = `${inputBackground}`
    inputPairCenters[x].children[1].style.color = `${inputColor}`
    inputPairCenters[x].children[1].style.border = `1px solid ${inputBorder}`
    inputPairCenters[x].children[1].style.borderBottom = `5px inset ${inputBorderBottom}`
    inputPairCenters[x].children[1].style.boxShadow = `${inputBoxShadow} 0 0 .05em .1em, inset -.1em -.1em 1em ${inputBoxShadow}`
  }

  // input pairs I & II
  for (let x = 0; x < inputPairLength; x++) {
    inputPairI[x].children[0].style.background = `${inputBackground}`
    inputPairI[x].children[0].style.color = `${inputColor}`
    inputPairI[x].children[0].style.border = `1px solid ${inputBorder}`
    inputPairI[x].children[0].style.borderBottom = `5px inset ${inputBorderBottom}`
    inputPairI[x].children[0].style.boxShadow = `${inputBoxShadow} 0 0 .05em .1em, inset -.1em -.1em 1em ${inputBoxShadow}`
    inputPairI[x].children[1].style.background = `${inputBackground}`
    inputPairI[x].children[1].style.color = `${inputColor}`
    inputPairI[x].children[1].style.border = `1px solid ${inputBorder}`
    inputPairI[x].children[1].style.borderBottom = `5px inset ${inputBorderBottom}`
    inputPairI[x].children[1].style.boxShadow = `${inputBoxShadow} 0 0 .05em .1em, inset -.1em -.1em 1em ${inputBoxShadow}`
    inputPairII[x].children[0].style.background = `${inputBackground}`
    inputPairII[x].children[0].style.color = `${inputColor}`
    inputPairII[x].children[0].style.border = `1px solid ${inputBorder}`
    inputPairII[x].children[0].style.borderBottom = `5px inset ${inputBorderBottom}`
    inputPairII[x].children[0].style.boxShadow = `${inputBoxShadow} 0 0 .05em .1em, inset -.1em -.1em 1em ${inputBoxShadow}`
    inputPairII[x].children[1].style.background = `${inputBackground}`
    inputPairII[x].children[1].style.color = `${inputColor}`
    inputPairII[x].children[1].style.border = `1px solid ${inputBorder}`
    inputPairII[x].children[1].style.borderBottom = `5px inset ${inputBorderBottom}`
    inputPairII[x].children[1].style.boxShadow = `${inputBoxShadow} 0 0 .05em .1em, inset -.1em -.1em 1em ${inputBoxShadow}`
  }

  // inputs secondary
  for (let x = 0; x < inputsSecondary.length; x++) {
    inputsSecondary[x].style.background = `${inputBackground}`
    inputsSecondary[x].style.color = `${inputColor}`
    inputsSecondary[x].style.border = `1px solid ${inputBorder}`
    inputsSecondary[x].style.borderBottom = `2px inset ${inputBorderBottom}`
    inputsSecondary[x].style.boxShadow = `${inputBoxShadow} 0 0 .05em .1em, inset -.1em -.1em 1em ${inputBoxShadow}`
  }

  // inputs edge
  switchCurrent.style.color = `${inputColor}`
  switchCurrent.style.border = `2px outset ${inputBorder}`
  switchCurrent.style.borderBottom = `5px inset ${inputBorderBottom}`
  switchCurrent.style.boxShadow = `${inputBoxShadow} 0 0 .05em .1em, inset -.1em -.1em 1em ${inputBoxShadow}`
}

// adjust values to media queries
fmSelection.addEventListener('change', () => {
  let selectionValue = fmSelection.value

  if (selectionValue === 'Display') {
    inputFM('var(--acnt-d)', 'var(--txt)', 'var(--bd)', 'var(--acnt-b)', 'var(--bd)')
  } else if (selectionValue === 'Accent') {
    inputFM('var(--clr)', 'var(--clr)', 'var(--clr)', 'var(--fm-guide)', 'var(--bd)')
  } else if (selectionValue === 'Clear') {
    inputFM('var(--clr)', 'var(--clr)', 'var(--clr)', 'var(--clr)', 'var(--clr)')
  }

  fmSelection.value = selectionValue
  localStorage.setItem('stored-fm', selectionValue)
})

