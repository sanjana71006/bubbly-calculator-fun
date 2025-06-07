
import { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceInputProps {
  onResult: (expression: string) => void;
}

const VoiceInput = ({ onResult }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        
        // Convert spoken words to math symbols
        const mathExpression = transcript
          .replace(/plus/g, '+')
          .replace(/minus/g, '-')
          .replace(/times/g, '*')
          .replace(/multiplied by/g, '*')
          .replace(/divided by/g, '/')
          .replace(/equals/g, '=');
        
        onResult(mathExpression);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <button
        onClick={startListening}
        disabled={isListening}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300",
          isListening 
            ? "bg-red-500/80 text-white animate-pulse" 
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
    </div>
  );
};

function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default VoiceInput;
