const task3Element = document.getElementById('task-3');


function alertFunctionNoParameter() {
    alert('Testing alertFunction, it works!');
    return
 } 

 function alertFunctionWithParameter(parameter) {
    alert(parameter);
    return
 }
 
 function brandNewFunction(param1, param2, param3) {
    const concatenatedText = `${param1} ${param2} ${param3}`;
    return concatenatedText
 }



task3Element.addEventListener('click', alertFunctionNoParameter)
let concatenatedString = brandNewFunction('parameter1', 'parameter2', 'parameter3');
alert(concatenatedString);

// or alternatively:
// alert(brandNewFunction('parameter1', 'parameter2', 'parameter3'));