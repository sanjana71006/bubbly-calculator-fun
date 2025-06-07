
import { useState, useEffect } from 'react';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButton from './CalculatorButton';
import VoiceInput from './VoiceInput';
import { calculateResult } from '@/utils/calculatorEngine';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      const newValue = calculateResult(currentValue, inputValue, operator);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operator) {
      const newValue = calculateResult(previousValue, inputValue, operator);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleVoiceInput = (expression: string) => {
    try {
      // Simple voice expression parser
      const result = eval(expression.replace(/[^0-9+\-*/().]/g, ''));
      setDisplay(String(result));
      setWaitingForOperand(true);
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full hover:bg-white/15 transition-all duration-300">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          🧮 Voice Calc
        </h1>
        <div className="flex justify-center gap-2 text-2xl">
          <span>🧠</span>
          <span>✨</span>
          <span>📐</span>
        </div>
      </div>

      <CalculatorDisplay value={display} />
      
      <VoiceInput onResult={handleVoiceInput} />

      <div className="grid grid-cols-4 gap-3 mt-6">
        <CalculatorButton onClick={clear} className="col-span-2 bg-red-500/80 hover:bg-red-500">
          Clear
        </CalculatorButton>
        <CalculatorButton onClick={() => inputOperator('/')} className="bg-orange-500/80 hover:bg-orange-500">
          ÷
        </CalculatorButton>
        <CalculatorButton onClick={() => inputOperator('*')} className="bg-orange-500/80 hover:bg-orange-500">
          ×
        </CalculatorButton>

        <CalculatorButton onClick={() => inputNumber('7')}>7</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('8')}>8</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('9')}>9</CalculatorButton>
        <CalculatorButton onClick={() => inputOperator('-')} className="bg-orange-500/80 hover:bg-orange-500">
          −
        </CalculatorButton>

        <CalculatorButton onClick={() => inputNumber('4')}>4</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('5')}>5</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('6')}>6</CalculatorButton>
        <CalculatorButton onClick={() => inputOperator('+')} className="bg-orange-500/80 hover:bg-orange-500">
          +
        </CalculatorButton>

        <CalculatorButton onClick={() => inputNumber('1')}>1</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('2')}>2</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('3')}>3</CalculatorButton>
        <CalculatorButton onClick={calculate} className="row-span-2 bg-green-500/80 hover:bg-green-500">
          =
        </CalculatorButton>

        <CalculatorButton onClick={() => inputNumber('0')} className="col-span-2">
          0
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('.')}>.</CalculatorButton>
      </div>
    </div>
  );
};

export default Calculator;
