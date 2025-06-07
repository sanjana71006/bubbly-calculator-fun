
// Core calculator logic - this simulates the C++ calculation engine
export const calculateResult = (num1: number, num2: number, operator: string): number => {
  console.log(`Calculating: ${num1} ${operator} ${num2}`);
  
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      if (num2 === 0) {
        throw new Error('Division by zero');
      }
      return num1 / num2;
    default:
      throw new Error('Invalid operator');
  }
};

// Additional mathematical functions
export const calculateAdvanced = {
  sqrt: (num: number): number => Math.sqrt(num),
  square: (num: number): number => num * num,
  percentage: (num: number, percent: number): number => (num * percent) / 100,
  factorial: (num: number): number => {
    if (num < 0) return 0;
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  }
};
