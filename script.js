let operation = {
	num1: '0',
	operator: '',
	num2: '0',
	num3: '0',
	highOperator: ''
};

let inputIndex = 1;
let isDecimalActive = true;
let isValidInputLength = true;

const display = document.querySelector('div .output');
display.textContent = operation.num1;
const numpad = document.getElementById('numpad');
numpad.addEventListener('click', handleInput);

function handleInput(e) {
	let inputType = e.target.classList[0];
	let input = e.target.textContent;

	if (inputType === 'number') {
		displayInput(input);
		console.log(input);
	}
	if (inputType === 'decimal' && isDecimalActive) {
		displayInput(input);
		isDecimalActive = false;
	}
	if (inputType === 'operator') {
		orderOperators(input);
		let maxInputLength = display.textContent.includes('.') ? 11 : 10;
		if (display.textContent.length > maxInputLength) {
			display.textContent = 'Error';
			resetCalculator('error');
		}
		isDecimalActive = true;
	}
	if (inputType === 'equals') {
		if (operation.highOperator != '') {
			operation.num2 = performOperation[operation.highOperator](operation.num2, operation.num3).toString();
			display.textContent = performOperation[operation.operator](operation.num1, operation.num2).toString();
		}
		display.textContent = performOperation[operation.operator](operation.num1, operation.num2);
		let maxInputLength = display.textContent.includes('.') ? 11 : 10;
		if (display.textContent.length > maxInputLength) {
			display.textContent = 'Error';
		}
		resetCalculator(inputType);
	}
	if (inputType === 'clear-btn') {
		resetCalculator(inputType);
	}
}

function displayInput(input) {
	let maxInputLength = operation['num' + inputIndex].includes('.') ? 11 : 10;
	if (operation['num' + inputIndex].length >= maxInputLength) {
		return;
	}
	if (input === '.' || operation['num' + inputIndex].includes('.')) {
		operation['num' + inputIndex] += input;
	} else {
		operation['num' + inputIndex] += input;
		operation['num' + inputIndex] = parseInt(operation['num' + inputIndex], 10).toString();
	}
	//Display Input
	display.textContent = operation['num' + inputIndex];
	console.log('Current Input: ' + operation['num' + inputIndex]);
}

function orderOperators(input) {
	inputIndex += 1;
	if (inputIndex === 3 && input != 'times' && (inputIndex === 3 && input != 'divide')) {
		operation.num1 = performOperation[operation.operator](operation.num1, operation.num2).toString();
		operation.num2 = '0';
		display.textContent = operation.num1;
		inputIndex = 2;
	} else if (
		(inputIndex === 3 && operation.operator === 'times') ||
		(inputIndex === 3 && operation.operator === 'divide')
	) {
		operation.num1 = performOperation[operation.operator](operation.num1, operation.num2).toString();
		operation.num2 = '0';
		display.textContent = operation.num1;
		inputIndex = 2;
	}
	if (inputIndex === 4) {
		operation.num2 = performOperation[operation.highOperator](operation.num2, operation.num3).toString();
		operation.num1 = performOperation[operation.operator](operation.num1, operation.num2).toString();
		operation.num2 = '0';
		operation.num3 = '0';
		operation.highOperator = '';
		display.textContent = operation.num1;
		inputIndex = 2;
	}
	storeOperation(input);
}

function storeOperation(operator) {
	if (inputIndex === 1 || inputIndex === 2) {
		operation.operator = operator;
		console.log(operation.operator);
	}
	if (inputIndex === 3) {
		operation.highOperator = operator;
	}
}

let performOperation = {
	plus: function(num1, num2) {
		return parseFloat((parseFloat(num1) + parseFloat(num2)).toFixed(3));
	},
	minus: function(num1, num2) {
		return parseFloat((parseFloat(num1) - parseFloat(num2)).toFixed(3));
	},
	times: function(num1, num2) {
		return parseFloat((parseFloat(num1) * parseFloat(num2)).toFixed(3));
	},
	divide: function(num1, num2) {
		return parseFloat((parseFloat(num1) / parseFloat(num2)).toFixed(3));
	}
};

function resetCalculator(inputType) {
	operation = {
		num1: '0',
		operator: '',
		num2: '0',
		num3: '0',
		highOperator: ''
	};
	inputIndex = 1;
	isDecimalActive = true;
	if (inputType === 'clear-btn') {
		display.textContent = operation.num1;
	}
	if (inputType === 'equals' || inputType === 'error') {
		operation.num1 = display.textContent != 'Error' ? display.textContent : '0';
	}
}
