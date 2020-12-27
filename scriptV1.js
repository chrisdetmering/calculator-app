//Need to add comma seporators
// need to limit number of displayed digits
//make sure eveyrthing resets on clear button

let runningTotal = false;

const display = document.querySelector('div .output');
const numpad = document.getElementById('numpad');
numpad.addEventListener('click', handleInput);
const decimal = document.getElementById('decimal');
let isDecimalActive = true;
let isNewOperation = false;

let index = 1;
let operation = {
	num1: '0',
	operator: '',
	num2: '0',
	num3: '0',
	highOperator: ''
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
		if (index === 3) {
			higherOperation(operation.num2, operation.num3);
			operation.num3 = '0';
			index = 2;
		}
		index === 1 ? (index += 1) : index;
		isDecimalActive = true;
		isNewOperation = true;
		storeOperation(operator);
	}
	if (e.target.classList.contains('equals')) {
		if (index === 3) {
			higherOperation(operation.num2, operation.num3);
		}
		performOperation(operation);
		operation.num1 = display.textContent;
		operation.operator = '';
		operation.num2 = '0';
		operation.num3 = '0';
		index = 1;
		isNewOperation = !isNewOperation;
		operation.highOperator = '';
	}
	if (e.target.classList.contains('clear-btn')) {
		clearCalculator();
	}
}

function pushInputToDisplay(input) {
	///NEED TO MAKE INDEX 2 LIKE INDEX 2
	if (index === 1) {
		if (isNewOperation) {
			console.log('you need to reset to zero first');
			display.textContent = '0';
			operation.num1 = '0';
			isNewOperation = !isNewOperation;
		}
		if (input === '.' || operation.num1.toString().includes('.')) {
			operation.num1 += input;
		} else {
			operation.num1 += input;
			operation.num1 = parseInt(operation.num1, 10);
			operation.num1 = operation.num1.toString();
		}
		console.log(operation.num1);
	}
	if (index === 2) {
		if (input === '.' || operation.num2.toString().includes('.')) {
			operation.num2 += input;
		} else {
			operation.num2 += input;
			operation.num2 = parseInt(operation.num2, 10);
			operation.num2 = operation.num2.toString();
		}
		console.log(operation.num2);
	}
	if (index === 3) {
		// operation.num3 += input;
		// operation.num3 = operation.num3.toString();
		if (input === '.' || operation.num3.toString().includes('.')) {
			operation.num3 += input;
		} else {
			operation.num3 += input;
			operation.num3 = parseInt(operation.num3, 10);
			operation.num3 = operation.num3.toString();
		}
		//higherOperation(operation.num2, operation.num3);
	}
	// display.textContent = operation['num' + index];
	formatDisplayNumber(operation['num' + index]);
	//index === 3 ? (index -= 1) : index;
	//operation.num3 = '';
	//operation.highOperator = '';
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
		if ((operation.operator != '' && operator === 'times') || (operation.operator != '' && operator === 'divide')) {
			console.log('do this operation first: ' + operator);
			operation.highOperator = operator;
			index = 3;
			return;
		} else {
			console.log(operation);
			performOperation(operation);
			operation.num1 = display.textContent;
			operation.operator = operator;
			operation.num2 = '0';
			console.log(operation);
			return;
		}
	}
	operation['num' + index] != '' ? (index += 1) : (index = index);
}

function higherOperation(num2, num3) {
	if (operation.highOperator === 'times') {
		operation.num2 = parseFloat((parseFloat(num2) * parseFloat(num3)).toFixed(3));
		//performOperation(operation);
		//formatDisplayNumber(display.textContent);
	}
	if (operation.highOperator === 'divide') {
		operation.num2 = parseFloat((parseInt(num2) / parseInt(num3)).toFixed(3));
		//performOperation(operation);
		//formatDisplayNumber(display.textContent);
	}
}

function performOperation(operation) {
	if (operation.operator === 'plus') {
		//need to remove commas before operation
		display.textContent = parseFloat((parseFloat(operation.num1) + parseFloat(operation.num2)).toFixed(3));
		formatDisplayNumber(display.textContent);
	}
	if (operation.operator === 'minus') {
		display.textContent = parseFloat((parseFloat(operation.num1) - parseFloat(operation.num2)).toFixed(3));
		formatDisplayNumber(display.textContent);
	}
	if (operation.operator === 'times') {
		display.textContent = parseFloat((parseFloat(operation.num1) * parseFloat(operation.num2)).toFixed(3));
		formatDisplayNumber(display.textContent);
	}
	if (operation.operator === 'divide') {
		display.textContent = parseFloat((parseInt(operation.num1) / parseInt(operation.num2)).toFixed(3));
		formatDisplayNumber(display.textContent);
	}
}

function clearCalculator() {
	console.log('clear');
	index = 1;
	isDecimalActive = true;
	isNewOperation = true;
	operation = {
		num1: '0',
		operator: '',
		num2: '0',
		num3: '0'
	};
	pushInputToDisplay('0');
}

function formatDisplayNumber(number) {
	console.log('format display');
	display.textContent = number;
	// if (number.length > 3) {
	// 	number = number[0] + ',' + number.substr(1, 3);
	// 	display.textContent = number;
	// } else {
	// 	display.textContent = number;
	// }
}
