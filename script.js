let runningTotal = false;

const display = document.querySelector('div .output');
const numpad = document.getElementById('numpad');
numpad.addEventListener('click', handleInput);
const decimal = document.getElementById('decimal');
let isDecimalActive = true;

let index = 1;
let operation = {
	num1: '',
	operator: '',
	num2: ''
};

pushInputToDisplay('0');

function handleInput(e) {
	if (e.target.classList.contains('number')) {
		let input = e.target.textContent;
		pushInputToDisplay(input);
	}
	if (e.target.classList.contains('decimal') && isDecimalActive) {
		let input = e.target.textContent;
		pushInputToDisplay(input);
		isDecimalActive = !isDecimalActive;
	}

	if (e.target.classList.contains('operator')) {
		let operator = e.target.dataset.operator;
		index === 1 ? (index += 1) : index;
		isDecimalActive = !isDecimalActive;
		storeOperation(operator);
	}
	if (e.target.classList.contains('equals')) {
		performOperation(operation);
		operation.num1 = display.textContent;
		operation.operator = '';
		operation.num2 = '';
		index = 1;
	}
	if (e.target.classList.contains('clear-btn')) {
		clearCalculator();
	}
}

function pushInputToDisplay(input) {
	if (index === 1) {
		if (display.textContent != 0) {
			console.log('you need to reset to zero first');
			display.textContent = '';
			operation.num1 = '';
		}
		if (input === '.' || operation.num1.toString().includes('.')) {
			operation.num1 += input;
		} else {
			operation.num1 += input;
			operation.num1 = parseInt(operation.num1, 10);
		}
		console.log(operation.num1);
	}
	if (index === 2) {
		operation.num2 += input;
		console.log(operation.num2);
	}
	display.textContent = operation['num' + index];
}

function storeOperation(operator) {
	if (index === 1) {
		operation.operator = operator;
		console.log('operator: ' + operation.operator);
	}
	if (index === 2) {
		//if times or divide dont do operation yet
		// need to to order of operations first
		//alter num2
		//then return to enter new number
		console.log(operation);
		performOperation(operation);
		operation.num1 = display.textContent;
		operation.operator = operator;
		operation.num2 = '';
		console.log(operation);
		return;
	}
	operation['num' + index] != '' ? (index += 1) : (index = index);
}

function performOperation(operation) {
	if (operation.operator === 'plus') {
		display.textContent = parseFloat((parseFloat(operation.num1) + parseFloat(operation.num2)).toFixed(3));
	}
	if (operation.operator === 'minus') {
		display.textContent = parseFloat((parseFloat(operation.num1) - parseFloat(operation.num2)).toFixed(3));
	}
	if (operation.operator === 'times') {
		display.textContent = parseFloat((parseFloat(operation.num1) * parseFloat(operation.num2)).toFixed(3));
	}
	if (operation.operator === 'divide') {
		display.textContent = parseFloat((parseInt(operation.num1) / parseInt(operation.num2)).toFixed(3));
	}
}

function clearCalculator() {
	console.log('clear');
	index = 1;
	operation = {
		num1: '',
		operator: '',
		num2: ''
	};
	pushInputToDisplay('0');
}
