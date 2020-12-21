let runningTotal = 0;

const display = document.querySelector('div .output');
const numpad = document.getElementById('numpad');
numpad.addEventListener('click', handleInput);

let clickedNumber = 0;
let inputNumber = 0;
let index = 1;
let operation = {
	num1: '',
	operator: '',
	num2: ''
};

function handleInput(e) {
	if (e.target.classList.contains('number')) {
		let input = e.target.textContent;
		pushInputToDisplay(input);
	}

	if (e.target.classList.contains('operator')) {
		operator = e.target.dataset.operator;
		if (operator != 'equals') {
			//store operator
			operator = e.target.dataset.operator;
			operation.operator = operator;
			console.log('operator: ' + operation.operator);
			//CHANGE INDEX
			index += 1;
			return;
		}
		performOperation(operation);
	}
}

function pushInputToDisplay(input) {
	if (index === 1) {
		operation.num1 += input;
		console.log(operation.num1);
	}
	if (index === 2) {
		operation.num2 += input;
		console.log(operation.num2);
	}
	display.textContent = operation['num' + index];
}

function performOperation(operation) {
	if (operation.operator === 'plus') {
		display.textContent = parseInt(operation.num1) + parseInt(operation.num2);
	}
}
