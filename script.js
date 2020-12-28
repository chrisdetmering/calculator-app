//need to show error on operator press that makes display text > 9
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
	// console.log('Type: ' + inputType);
	// console.log('Input: ' + input);

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
		isDecimalActive = true;
	}
	if (inputType === 'equals') {
		if (operation.highOperator != '') {
			operation.num2 = performOperation[operation.highOperator](operation.num2, operation.num3).toString();
			display.textContent = performOperation[operation.operator](operation.num1, operation.num2).toString();
		}
		display.textContent = performOperation[operation.operator](operation.num1, operation.num2);
		if (display.textContent.length > 9) {
			display.textContent = 'Error';
		}
		resetCalculator(inputType);
	}
	if (inputType === 'clear-btn') {
		resetCalculator(inputType);
	}
}

function displayInput(input) {
	let maxInputLength = operation['num' + inputIndex].includes('.') ? 10 : 9;
	if (operation['num' + inputIndex].length > maxInputLength) {
		return;
	}
	if (input === '.' || operation['num' + inputIndex].includes('.')) {
		operation['num' + inputIndex] += input;
	} else {
		operation['num' + inputIndex] += input;
		operation['num' + inputIndex] = parseInt(operation['num' + inputIndex], 10);
		operation['num' + inputIndex] = operation['num' + inputIndex].toString();
	}
	// if (inputIndex === 1) {
	// if (input === '.' || operation.num1.includes('.')) {
	// 	operation.num1 += input;
	// } else {
	// 	operation.num1 += input;
	// 	operation.num1 = parseInt(operation.num1, 10);
	// 	operation.num1 = operation.num1.toString();
	// }
	// }
	// if (inputIndex === 2) {
	// 	if (input === '.' || operation.num2.toString().includes('.')) {
	// 		operation.num2 += input;
	// 	} else {
	// 		operation.num2 += input;
	// 		operation.num2 = parseInt(operation.num2, 10);
	// 		operation.num2 = operation.num2.toString();
	// 	}
	// }
	// if (inputIndex === 3) {
	// 	if (input === '.' || operation.num3.toString().includes('.')) {
	// 		operation.num3 += input;
	// 	} else {
	// 		operation.num3 += input;
	// 		operation.num3 = parseInt(operation.num3, 10);
	// 		operation.num3 = operation.num3.toString();
	// 	}
	// }

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
	}
	// if ((inputIndex === 3 && input === 'times') || (inputIndex === 3 && input === 'divide')) {
	// 	storeOperation(input);
	// 	return;
	// }
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
	if (inputType === 'equals') {
		operation.num1 = display.textContent != 'Error' ? display.textContent : '0';
	}
}
