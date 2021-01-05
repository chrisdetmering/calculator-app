let numberOne = null; 
let numberTwo = null; 
let operator = null; 


const display = document.querySelector('div .output');


document.querySelectorAll(".number").forEach(numberButton => { 
	numberButton.addEventListener('click', e => { 
		const number = e.target.textContent;

		if (display.textContent.length === 5) { 
			alert('Max 5 character input')
			return; 
		} 



		if (numberOne && !operator) { 
			numberOne += number; 
			display.textContent = numberOne; 
			return;  
		}

		if (numberTwo && operator) { 
			numberTwo += number; 
			display.textContent = numberTwo; 
			return; 
		}


		if (!numberOne) { 
			numberOne = number
			display.textContent = numberOne; 
			return; 
		}

		if (!numberTwo) { 
			numberTwo = number
			display.textContent = numberTwo
			return; 
		}


	
	})
} )






document.querySelector(".decimal").addEventListener("click", e => { 
	if (!numberOne) return; 

	if (!operator && !numberTwo && !display.textContent.includes(".")) { 
		numberOne += '.'
		display.textContent = numberOne
		return; 
	}
	
	if (!display.textContent.includes(".")) { 
		numberTwo += '.'
		display.textContent = numberTwo
	}
})





document.querySelector('.equals').addEventListener("click", e => { 
	if (numberOne && numberTwo) { 
		display.textContent = operator(numberOne, numberTwo); 
	}
	
	
})


const resetCalculator = () => {
	numberOne = null; 
	numberTwo = null; 
	operator = null; 
	display.textContent = "0"; 
}



document.querySelector(".clear-btn").addEventListener("click", () => { 
	resetCalculator();
})




const plus = (num1, num2) => { 
	return parseFloat((parseFloat(num1) + parseFloat(num2)).toFixed(3));
}

const minus = (num1, num2) => { 
	return parseFloat((parseFloat(num1) - parseFloat(num2)).toFixed(3));
}

const times = (num1, num2) => { 
	return parseFloat((parseFloat(num1) * parseFloat(num2)).toFixed(3));
}


const divide = (num1, num2) => { 
	return parseFloat((parseFloat(num1) / parseFloat(num2)).toFixed(3));

}

const mapOperations = {
	"+": plus,
	"-": minus, 
	"x": times,
	"/": divide,
};


document.querySelectorAll("div.operator").forEach(operatorButton => { 
	operatorButton.addEventListener("click", e => { 
		if (!numberOne) return; 
			let currentOperator = e.target.textContent;

			operator = mapOperations[currentOperator]; 
			display.textContent = currentOperator; 
	})
})






