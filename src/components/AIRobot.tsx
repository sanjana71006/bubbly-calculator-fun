
import { useState, useEffect } from 'react';
import { Mic, HelpCircle, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIRobotProps {
  isListening: boolean;
  isCalculating: boolean;
  lastResult?: string;
  isSpecialResult?: boolean;
  isSpeechEnabled: boolean;
  onToggleSpeech: () => void;
  onHelp: () => void;
}

type RobotState = 'idle' | 'listening' | 'thinking' | 'celebrating' | 'error';

const AIRobot = ({ 
  isListening, 
  isCalculating, 
  lastResult, 
  isSpecialResult, 
  isSpeechEnabled,
  onToggleSpeech,
  onHelp 
}: AIRobotProps) => {
  const [robotState, setRobotState] = useState<RobotState>('idle');
  const [speechBubble, setSpeechBubble] = useState<string>('');
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (isListening) {
      setRobotState('listening');
      setSpeechBubble("I'm listening... 🎙️");
      setShowBubble(true);
    } else if (isCalculating) {
      setRobotState('thinking');
      setSpeechBubble("Let me do the math 🤔...");
      setShowBubble(true);
    } else if (lastResult) {
      if (isSpecialResult) {
        setRobotState('celebrating');
        setSpeechBubble("Wow! Special result! 🎉💥");
      } else {
        setRobotState('idle');
        setSpeechBubble("Here's the answer! 🧠✨");
      }
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 3000);
    } else {
      setRobotState('idle');
      setShowBubble(false);
    }
  }, [isListening, isCalculating, lastResult, isSpecialResult]);

  const showError = (message: string) => {
    setRobotState('error');
    setSpeechBubble(message);
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 4000);
  };

  const getRobotEyes = () => {
    switch (robotState) {
      case 'listening':
        return '👂 👂';
      case 'thinking':
        return '🤔 🤔';
      case 'celebrating':
        return '🤩 🤩';
      case 'error':
        return '😅 😅';
      default:
        return '😊 😊';
    }
  };

  const getRobotAnimation = () => {
    switch (robotState) {
      case 'listening':
        return 'animate-pulse';
      case 'thinking':
        return 'animate-bounce';
      case 'celebrating':
        return 'animate-ping';
      default:
        return 'animate-float-1';
    }
  };

  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-20 flex flex-col items-center">
      {/* Speech Bubble */}
      {showBubble && (
        <div className="mb-4 relative animate-fade-in">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 text-white text-sm font-medium max-w-48 text-center">
            {speechBubble}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20"></div>
        </div>
      )}

      {/* Robot Body */}
      <div className={cn(
        "relative bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl p-6 shadow-2xl border-2 border-white/30 transition-all duration-300",
        getRobotAnimation()
      )}>
        {/* Microphone indicator when listening */}
        {isListening && (
          <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2 animate-pulse">
            <Mic className="w-4 h-4 text-white" />
          </div>
        )}

        {/* Robot Head */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-3 relative">
          {/* Eyes */}
          <div className="text-2xl mb-2 text-center">
            {getRobotEyes()}
          </div>
          
          {/* Mouth */}
          <div className="text-center">
            {robotState === 'celebrating' ? '🎉' : robotState === 'error' ? '😬' : '😊'}
          </div>

          {/* Antenna */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-6 bg-yellow-400 rounded-full relative">
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Robot Body */}
        <div className="bg-white/10 rounded-xl p-3">
          <div className="flex justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-200"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-400"></div>
          </div>
          
          {/* Control Buttons */}
          <div className="flex justify-center gap-2">
            <button
              onClick={onToggleSpeech}
              className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              title={isSpeechEnabled ? "Mute voice" : "Enable voice"}
            >
              {isSpeechEnabled ? (
                <Volume2 className="w-3 h-3 text-white" />
              ) : (
                <VolumeX className="w-3 h-3 text-white" />
              )}
            </button>
            
            <button
              onClick={onHelp}
              className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              title="Help"
            >
              <HelpCircle className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>

        {/* Robot Arms */}
        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
          <div className={cn(
            "w-8 h-2 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full",
            robotState === 'celebrating' && "animate-bounce"
          )}></div>
        </div>
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
          <div className={cn(
            "w-8 h-2 bg-gradient-to-l from-purple-400 to-blue-500 rounded-full",
            robotState === 'celebrating' && "animate-bounce animation-delay-200"
          )}></div>
        </div>
      </div>
    </div>
  );
};

export default AIRobot;
