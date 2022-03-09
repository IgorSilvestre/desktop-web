class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = ''
    }

    ac () {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    
    del () {
    this.currentOperand = this.currentOperand.slice(0, -1)
    }
    
    appendNumber (clickedNumber) {
        if (clickedNumber === '.' && this.currentOperand.includes('.')) return
        this.currentOperand += clickedNumber.toString()
    }
    
    chooseOperation (operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand + ' ' + this.operation
        this.currentOperand = ''
    }
    
    compute () {
        let result
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = previous + current
                break
            case '-':
                result = previous - current
                break
            case 'x':
                result = previous * current
                break
            case '÷':
                result = previous / current
                break
            default:
                return
        }
        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }
    
    updateDisplay () {
        this.currentOperandText.innerText = this.currentOperand
        this.previousOperandText.innerText = this.previousOperand
    }

    changeSign () {
        if (this.currentOperand.includes('-')) {
            this.currentOperand = this.currentOperand.slice(1)
        }
        else{
            this.currentOperand = '-' + this.currentOperand
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operandButtons = document.querySelectorAll('[data-operand]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const changeSignButton = document.querySelector('[data-changeSign]')
const previousOperandText = document.querySelector('[data-previous-operand')
const currentOperandText = document.querySelector('[data-current-operand')

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operandButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
clearButton.addEventListener('click', () => {
    calculator.ac()
    calculator.updateDisplay()
})
equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', () => {
    console.log('ok')
    calculator.del()
    calculator.updateDisplay()
})
changeSignButton.addEventListener('click', () => {
    calculator.changeSign()
    calculator.updateDisplay()
})
