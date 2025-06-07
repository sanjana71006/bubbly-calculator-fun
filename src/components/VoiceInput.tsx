
import { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import VoiceWaveform from './VoiceWaveform';
import { parseVoiceExpression, isValidMathExpression } from '@/utils/voiceExpressionParser';
import { cn } from '@/lib/utils';

interface VoiceInputProps {
  onResult: (expression: string) => void;
  onError: (message: string) => void;
  onListeningChange?: (isListening: boolean) => void;
}

const VoiceInput = ({ onResult, onError, onListeningChange }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        onListeningChange?.(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Voice input received:', transcript);
        
        const mathExpression = parseVoiceExpression(transcript);
        console.log('Parsed expression:', mathExpression);
        
        if (isValidMathExpression(mathExpression)) {
          onResult(mathExpression);
        } else {
          onError(`🛑 Sorry, I didn't understand "${transcript}". Try saying something like "What is 5 plus 3?"`);
        }
        
        setIsListening(false);
        onListeningChange?.(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        onError('🎤 Voice recognition error. Please try again!');
        setIsListening(false);
        onListeningChange?.(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        onListeningChange?.(false);
      };

      recognition.start();
    } else {
      onError('🛑 Voice recognition not supported in this browser!');
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 mb-4">
      <div className="flex gap-3">
        <button
          onClick={startListening}
          disabled={isListening}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300",
            isListening 
              ? "bg-red-500/80 text-white animate-pulse scale-105" 
              : "bg-white/20 text-white hover:bg-white/30 hover:scale-105"
          )}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5" />
              <span>Listening... 🎤</span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              <span>Speak Math 🗣️</span>
            </>
          )}
        </button>

        <button
          onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
          className={cn(
            "p-2 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300",
            isSpeechEnabled 
              ? "bg-green-500/80 text-white hover:bg-green-500" 
              : "bg-gray-500/80 text-white hover:bg-gray-500"
          )}
          title={isSpeechEnabled ? "Voice output enabled" : "Voice output disabled"}
        >
          {isSpeechEnabled ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      </div>

      <VoiceWaveform isListening={isListening} />
      
      {isListening && (
        <div className="text-center text-purple-200 text-sm animate-fade-in">
          <p>🎯 Try saying: "What is 12 times 5?"</p>
          <p>💡 Or: "Calculate 456 plus 123"</p>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
