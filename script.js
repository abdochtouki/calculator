document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    const display = document.getElementById('result');
    let currentOperand = '';
    let previousOperand = '';
    let operation = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            handleButtonPress(value);
        });
    });

    function handleButtonPress(value) {
        if (!isNaN(value) || value === '.') {
            handleNumber(value);
        } else if (value === 'C') {
            clear();
        } else if (value === '+/-') {
            toggleSign();
        } else if (value === '%') {
            handlePercent();
        } else if (value === '=') {
            calculate();
        } else {
            handleOperator(value);
        }
        updateDisplay();
    }

    function handleNumber(number) {
        if (currentOperand.includes('.') && number === '.') return;
        currentOperand += number;
    }

    function handleOperator(operator) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            calculate();
        }
        operation = operator;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        currentOperand = result;
        operation = null;
        previousOperand = '';
    }

    function clear() {
        currentOperand = '';
        previousOperand = '';
        operation = null;
    }

    function toggleSign() {
        currentOperand = (parseFloat(currentOperand) * -1).toString();
    }

    function handlePercent() {
        currentOperand = (parseFloat(currentOperand) / 100).toString();
    }

    function updateDisplay() {
        display.innerText = currentOperand;
    }
});
