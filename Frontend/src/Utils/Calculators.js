class AdvancedCalculator {
    constructor() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.shouldResetScreen = false;
        this.memory = 0;
        this.history = [];
        this.isRadians = true;
        this.init();
    }

    init() {
        this.updateDisplay();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // This would typically be connected to UI buttons
        // For demonstration, we'll create a simple interface
        console.log('Calculator initialized. Use methods like add(), subtract(), etc.');
    }

    // Basic operations
    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        if (b === 0) throw new Error('Division by zero');
        return a / b;
    }

    // Advanced mathematical functions
    squareRoot(x) {
        if (x < 0) throw new Error('Square root of negative number');
        return Math.sqrt(x);
    }

    power(base, exponent) {
        return Math.pow(base, exponent);
    }

    factorial(n) {
        if (n < 0) throw new Error('Factorial of negative number');
        if (n === 0 || n === 1) return 1;
        
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // Trigonometric functions
    sin(x) {
        return Math.sin(this.isRadians ? x : this.degreesToRadians(x));
    }

    cos(x) {
        return Math.cos(this.isRadians ? x : this.degreesToRadians(x));
    }

    tan(x) {
        return Math.tan(this.isRadians ? x : this.degreesToRadians(x));
    }

    asin(x) {
        const result = Math.asin(x);
        return this.isRadians ? result : this.radiansToDegrees(result);
    }

    acos(x) {
        const result = Math.acos(x);
        return this.isRadians ? result : this.radiansToDegrees(result);
    }

    atan(x) {
        const result = Math.atan(x);
        return this.isRadians ? result : this.radiansToDegrees(result);
    }

    // Logarithmic functions
    log(x) {
        if (x <= 0) throw new Error('Logarithm of non-positive number');
        return Math.log10(x);
    }

    ln(x) {
        if (x <= 0) throw new Error('Natural log of non-positive number');
        return Math.log(x);
    }

    // Conversion functions
    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    radiansToDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    // Memory functions
    memoryStore(value) {
        this.memory = parseFloat(value) || 0;
        this.addToHistory(`Memory stored: ${this.memory}`);
    }

    memoryRecall() {
        this.addToHistory(`Memory recalled: ${this.memory}`);
        return this.memory;
    }

    memoryAdd(value) {
        this.memory += parseFloat(value) || 0;
        this.addToHistory(`Memory added: ${value}, Total: ${this.memory}`);
    }

    memorySubtract(value) {
        this.memory -= parseFloat(value) || 0;
        this.addToHistory(`Memory subtracted: ${value}, Total: ${this.memory}`);
    }

    memoryClear() {
        this.memory = 0;
        this.addToHistory('Memory cleared');
    }

    // History management
    addToHistory(entry) {
        this.history.push({
            timestamp: new Date(),
            operation: entry,
            result: this.currentInput
        });
        
        // Keep only last 100 entries
        if (this.history.length > 100) {
            this.history.shift();
        }
    }

    clearHistory() {
        this.history = [];
    }

    getHistory() {
        return this.history;
    }

    // Number system conversions
    decimalToBinary(decimal) {
        return (decimal >>> 0).toString(2);
    }

    binaryToDecimal(binary) {
        return parseInt(binary, 2);
    }

    decimalToHex(decimal) {
        return decimal.toString(16).toUpperCase();
    }

    hexToDecimal(hex) {
        return parseInt(hex, 16);
    }

    // Statistical functions
    mean(numbers) {
        if (!Array.isArray(numbers) || numbers.length === 0) {
            throw new Error('Input must be a non-empty array');
        }
        return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    }

    median(numbers) {
        if (!Array.isArray(numbers) || numbers.length === 0) {
            throw new Error('Input must be a non-empty array');
        }
        
        const sorted = [...numbers].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        
        return sorted.length % 2 !== 0 
            ? sorted[mid] 
            : (sorted[mid - 1] + sorted[mid]) / 2;
    }

    standardDeviation(numbers) {
        const avg = this.mean(numbers);
        const squareDiffs = numbers.map(num => Math.pow(num - avg, 2));
        return Math.sqrt(this.mean(squareDiffs));
    }

    // Financial functions
    calculateCompoundInterest(principal, rate, time, compoundsPerYear = 1) {
        return principal * Math.pow(1 + (rate / compoundsPerYear), compoundsPerYear * time);
    }

    calculateLoanPayment(principal, annualRate, years) {
        const monthlyRate = annualRate / 12 / 100;
        const numberOfPayments = years * 12;
        return principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
               (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    // Utility methods
    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentInput = '';
            this.shouldResetScreen = false;
        }
        
        if (number === '.' && this.currentInput.includes('.')) return;
        
        this.currentInput = this.currentInput === '0' && number !== '.' 
            ? number 
            : this.currentInput + number;
        
        this.updateDisplay();
    }

    chooseOperation(op) {
        if (this.currentInput === '') return;
        
        if (this.previousInput !== '') {
            this.compute();
        }
        
        this.operation = op;
        this.previousInput = this.currentInput;
        this.currentInput = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = this.add(prev, current);
                break;
            case '-':
                computation = this.subtract(prev, current);
                break;
            case '*':
                computation = this.multiply(prev, current);
                break;
            case '/':
                computation = this.divide(prev, current);
                break;
            case '^':
                computation = this.power(prev, current);
                break;
            default:
                return;
        }
        
        this.addToHistory(`${this.previousInput} ${this.operation} ${this.currentInput} = ${computation}`);
        this.currentInput = computation.toString();
        this.operation = null;
        this.previousInput = '';
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.updateDisplay();
    }

    delete() {
        this.currentInput = this.currentInput.slice(0, -1) || '0';
        this.updateDisplay();
    }

    updateDisplay() {
        // This would update the UI display
        console.log('Display:', this.currentInput);
    }

    // Advanced utility methods
    evaluateExpression(expression) {
        try {
            // Using Function constructor for safe evaluation
            const result = new Function('return ' + expression)();
            this.addToHistory(`Expression: ${expression} = ${result}`);
            return result;
        } catch (error) {
            throw new Error('Invalid expression');
        }
    }

    // Constants
    get PI() {
        return Math.PI;
    }

    get E() {
        return Math.E;
    }

    // Settings
    toggleAngleMode() {
        this.isRadians = !this.isRadians;
        return this.isRadians ? 'radians' : 'degrees';
    }

    // Serialization
    saveState() {
        return JSON.stringify({
            currentInput: this.currentInput,
            memory: this.memory,
            isRadians: this.isRadians,
            history: this.history
        });
    }

    loadState(state) {
        try {
            const data = JSON.parse(state);
            this.currentInput = data.currentInput || '0';
            this.memory = data.memory || 0;
            this.isRadians = data.isRadians !== undefined ? data.isRadians : true;
            this.history = data.history || [];
            this.updateDisplay();
            return true;
        } catch (error) {
            return false;
        }
    }
}

// Example usage and demonstration
const calculator = new AdvancedCalculator();

// Basic operations
console.log('5 + 3 =', calculator.add(5, 3));
console.log('10 - 4 =', calculator.subtract(10, 4));
console.log('6 * 7 =', calculator.multiply(6, 7));
console.log('15 / 3 =', calculator.divide(15, 3));

// Advanced functions
console.log('√25 =', calculator.squareRoot(25));
console.log('2^8 =', calculator.power(2, 8));
console.log('5! =', calculator.factorial(5));
console.log('sin(π/2) =', calculator.sin(Math.PI / 2));

// Memory functions
calculator.memoryStore(42);
console.log('Memory recall:', calculator.memoryRecall());
calculator.memoryAdd(8);
console.log('Memory after adding 8:', calculator.memoryRecall());

// Number conversions
console.log('255 in binary:', calculator.decimalToBinary(255));
console.log('Binary 11111111 in decimal:', calculator.binaryToDecimal('11111111'));

// Statistical functions
const numbers = [1, 2, 3, 4, 5];
console.log('Mean of [1,2,3,4,5]:', calculator.mean(numbers));
console.log('Median:', calculator.median(numbers));
console.log('Standard deviation:', calculator.standardDeviation(numbers));

// Export for use in browsers or Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedCalculator;
} else {
    window.AdvancedCalculator = AdvancedCalculator;
}