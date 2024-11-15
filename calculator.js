const numbers = document.querySelectorAll("[dataNumber]")
const previousOperandElement = document.querySelector("[previous-operand]")
const currentOperandElement = document.querySelector("[current-operand]")
const equalsButton = document.querySelector("[data-equal]")
const clearButton = document.querySelector("[data-clear]")
const deleteBtn = document.querySelector("[data-delete]")
const operationBtn = document.querySelectorAll("[dataOperation]")

// NOTE: THE CALCULATOR CLASS
//---------------------------
class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement
        this.currentOperandElement = currentOperandElement
        this.clear()
    }

    clear() {
        this.previousOperand = ""
        this.currentOperand = ""
        this.operation = undefined // at the start no operation is selected
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendInput(number) {
        if (number === "." && this.currentOperand.includes(".")) {
            return
        }
        // appending to the currentOperand after converting the number to a string.
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    operationSelect(operation) {
        if (this.currentOperand === "") {
            return
        }
        if (this.previousOperand !== "") {
            this.compute()
        }

        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute() {
        let result
        let prevOperand = parseFloat(this.previousOperand)
        let currOperand = parseFloat(this.currentOperand)

        if (isNaN(prevOperand) || isNaN(currOperand)) {
            return
        }

        switch (this.operation) {
            case "+":
                result = prevOperand + currOperand
                break
            case "-":
                result = prevOperand - currOperand
                break
            case "x":
                result = prevOperand * currOperand
                break
            case "/":
                result = prevOperand / currOperand
                break
        }

        this.currentOperand = result
        this.previousOperand = ""
        this.operation = undefined
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandElement.innerText = this.previousOperand
        }
    }
}

// Creating our calculator
const calculator = new Calculator(previousOperandElement, currentOperandElement)

numbers.forEach((numBtn) => {
    numBtn.addEventListener("click", () => {
        calculator.appendInput(numBtn.innerText)
        calculator.updateDisplay()
    })
})

operationBtn.forEach((operator) => {
    operator.addEventListener("click", () => {
        calculator.operationSelect(operator.innerText)
        calculator.updateDisplay()
    })
})

// Adding event listner to the equal, clear, and delete buttons respectively
equalsButton.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})


// NOTE: MULTIPLE THEME SUPPORT
//-----------------------------
const defaultTheme = document.getElementById("defaultTheme")
const theme1 = document.getElementById("theme-1")
const theme2 = document.getElementById("theme-2")
const themeIndicator = document.getElementById("theme-indicator")
const themeArray = [defaultTheme, theme1, theme2]
const linkElement = document.querySelector(".theme")


// Check and apply stored theme on page load
function setTheme() {
    themeArray.forEach((item) => {
        item.addEventListener("click", () => {
            let selectedTheme;
            switch (item) {
                case defaultTheme:
                    selectedTheme = 'default.css'
                    themeIndicator.style.left = "0px"
                    break
                case theme1:
                    selectedTheme = 'theme-1.css'
                    themeIndicator.style.left = "22px"
                    break
                case theme2:
                    selectedTheme = 'theme-2.css'
                    themeIndicator.style.left = "44px"
                    break
            }

            linkElement.setAttribute('href', selectedTheme);
            localStorage.setItem('theme', selectedTheme);
            console.log('theme set to: ', localStorage.getItem('theme'))
        })
    })


}

window.addEventListener('DOMContentLoaded', () => {
    setTheme()
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        linkElement.setAttribute('href', storedTheme);
        themeIndicator.style.left =
            storedTheme === 'default.css' ? "0px" :
                storedTheme === 'theme-1.css' ? "22px" : "44px";
    }
})
