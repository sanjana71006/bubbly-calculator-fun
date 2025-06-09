import { useState, useEffect } from 'react';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButton from './CalculatorButton';
import VoiceInput from './VoiceInput';
import CalculationHistory from './CalculationHistory';
import AIRobot from './AIRobot';
import { calculateResult } from '@/utils/calculatorEngine';
import { ttsService } from '@/utils/textToSpeech';
import { checkSpecialResult, getSpecialResultMessage } from '@/utils/specialResults';

interface CalculationEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
  isSpecial?: boolean;
}

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<CalculationEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);
  const [isVoiceListening, setIsVoiceListening] = useState(false);

  const addToHistory = (expression: string, result: string) => {
    const numResult = parseFloat(result);
    const isSpecial = !isNaN(numResult) && checkSpecialResult(numResult);
    
    const entry: CalculationEntry = {
      id: Date.now().toString(),
      expression,
      result,
      timestamp: new Date(),
      isSpecial
    };
    
    setHistory(prev => [entry, ...prev]);
    
    // Speak the result
    const message = isSpecial 
      ? `${result}. ${getSpecialResultMessage(numResult)}`
      : `The result is ${result}`;
    
    ttsService.speak(message);
    
    // Show confetti for special results
    if (isSpecial) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const inputNumber = (num: string) => {
    trackActivity();
    setError(null);
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperator = (nextOperator: string) => {
    trackActivity();
    setError(null);
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      try {
        const currentValue = previousValue || 0;
        const newValue = calculateResult(currentValue, inputValue, operator);
        
        setDisplay(String(newValue));
        setPreviousValue(newValue);
        
        // Add to history
        const expression = `${currentValue} ${operator} ${inputValue}`;
        addToHistory(expression, String(newValue));
      } catch (error) {
        setError('Error in calculation');
        setDisplay('Error');
        return;
      }
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = () => {
    trackActivity();
    setError(null);
    const inputValue = parseFloat(display);

    if (previousValue !== null && operator) {
      try {
        const newValue = calculateResult(previousValue, inputValue, operator);
        const expression = `${previousValue} ${operator} ${inputValue}`;
        
        setDisplay(String(newValue));
        addToHistory(expression, String(newValue));
        
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
      } catch (error) {
        setError('Error in calculation');
        setDisplay('Error');
      }
    }
  };

  const clear = () => {
    trackActivity();
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setError(null);
  };

  const handleVoiceInput = (expression: string) => {
    setError(null);
    setIsCalculating(true);
    
    // Simulate calculation delay for robot animation
    setTimeout(() => {
      try {
        // Simple evaluation for voice input
        const result = eval(expression.replace(/[^0-9+\-*/().]/g, ''));
        setDisplay(String(result));
        addToHistory(expression, String(result));
        setWaitingForOperand(true);
      } catch (error) {
        setError('Invalid voice expression');
        setDisplay('Error');
      } finally {
        setIsCalculating(false);
      }
    }, 1000);
  };

  const handleVoiceError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const toggleSpeech = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
    if (!isSpeechEnabled) {
      ttsService.speak("Voice output enabled");
    }
  };

  const showHelpDialog = () => {
    setShowHelp(true);
    if (isSpeechEnabled) {
      ttsService.speak("Try saying: What is 12 times 5? Or: Calculate 456 plus 123");
    }
  };

  const handleVoiceListeningChange = (listening: boolean) => {
    setIsVoiceListening(listening);
    if (listening) {
      setIsTyping(false);
      setIsIdle(false);
      if (idleTimer) {
        clearTimeout(idleTimer);
      }
    }
  };

  const trackActivity = () => {
    setIsTyping(true);
    setIsIdle(false);
    
    if (idleTimer) {
      clearTimeout(idleTimer);
    }
    
    const timer = setTimeout(() => {
      setIsTyping(false);
      setIsIdle(true);
      
      // Reset idle state after showing message
      setTimeout(() => setIsIdle(false), 3000);
    }, 2000);
    
    setIdleTimer(timer);
  };

  return (
    <div className="flex gap-6 w-full max-w-6xl relative">
      {/* AI Robot Assistant */}
      <AIRobot
        isListening={isVoiceListening}
        isCalculating={isCalculating}
        lastResult={history[0]?.result}
        isSpecialResult={history[0]?.isSpecial}
        isSpeechEnabled={isSpeechEnabled}
        onToggleSpeech={toggleSpeech}
        onHelp={showHelpDialog}
        isTyping={isTyping}
        isIdle={isIdle}
      />

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowHelp(false)}>
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 max-w-md mx-4 border border-white/30">
            <h3 className="text-xl font-bold text-white mb-4 text-center">🤖 Voice Calculator Help</h3>
            <div className="text-white/90 space-y-2 text-sm">
              <p><strong>🤖 Meet your Calculator Robot Companion!</strong></p>
              <p>Your friendly assistant will watch over your calculations, think along with you, and cheer when you find results!</p>
              <br />
              <p><strong>Voice Commands:</strong></p>
              <p>• "What is 12 times 5?"</p>
              <p>• "Calculate 456 plus 123"</p>
              <p>• "25 divided by 5"</p>
              <p>• "100 minus 30"</p>
              <br />
              <p><strong>Robot Behaviors:</strong></p>
              <p>• Bounces gently when you type</p>
              <p>• Thinks and rotates during calculations</p>
              <p>• Celebrates your results!</p>
              <p>• Wanders around when idle</p>
            </div>
            <button 
              onClick={() => setShowHelp(false)}
              className="w-full mt-4 bg-purple-500/80 hover:bg-purple-500 text-white py-2 rounded-lg transition-colors"
            >
              Got it! 👍
            </button>
          </div>
        </div>
      )}

      {/* Calculator */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full hover:bg-white/15 transition-all duration-300 relative ml-32">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-bounce text-4xl absolute top-4 left-4">🎉</div>
            <div className="animate-bounce animation-delay-200 text-4xl absolute top-4 right-4">🎊</div>
            <div className="animate-bounce animation-delay-400 text-4xl absolute bottom-4 left-4">✨</div>
            <div className="animate-bounce animation-delay-600 text-4xl absolute bottom-4 right-4">🌟</div>
          </div>
        )}

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
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-300/50 rounded-lg text-red-200 text-center animate-fade-in">
            {error}
          </div>
        )}
        
        <VoiceInput 
          onResult={handleVoiceInput} 
          onError={handleVoiceError} 
          onListeningChange={handleVoiceListeningChange}
        />

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

      {/* History Panel */}
      <div className="flex-1 min-w-0">
        <CalculationHistory entries={history} onClearHistory={clearHistory} />
      </div>
    </div>
  );
};

export default Calculator;
