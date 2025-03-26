const defaultResult = 0;
let currentResult = defaultResult;

function add() {
  currentResult = currentResult + parseInt(userInput.value);
  // alternatively you can use "+" in front of the variable:
  // Note: it will do the decision if it is float or int based on the user input
  // currentResult = currentResult + +userInput.value;
  outputResult(currentResult, '');
}

addBtn.addEventListener('click', add);
