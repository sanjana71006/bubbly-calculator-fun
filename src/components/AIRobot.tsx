
import { useState, useEffect } from 'react';
import { Mic, HelpCircle, Volume2, VolumeX, X, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIRobotProps {
  isListening: boolean;
  isCalculating: boolean;
  lastResult?: string;
  isSpecialResult?: boolean;
  isSpeechEnabled: boolean;
  onToggleSpeech: () => void;
  onHelp: () => void;
  isTyping?: boolean;
  isIdle?: boolean;
}

type RobotState = 'idle' | 'listening' | 'thinking' | 'celebrating' | 'error' | 'typing';

const AIRobot = ({ 
  isListening, 
  isCalculating, 
  lastResult, 
  isSpecialResult, 
  isSpeechEnabled,
  onToggleSpeech,
  onHelp,
  isTyping = false,
  isIdle = false
}: AIRobotProps) => {
  const [robotState, setRobotState] = useState<RobotState>('idle');
  const [speechBubble, setSpeechBubble] = useState<string>('');
  const [showBubble, setShowBubble] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isListening) {
      setRobotState('listening');
      setSpeechBubble("I'm listening... 🎙️");
      setShowBubble(true);
    } else if (isCalculating) {
      setRobotState('thinking');
      setSpeechBubble("Let me calculate that for you! 🤔");
      setShowBubble(true);
    } else if (isTyping) {
      setRobotState('typing');
      setSpeechBubble("I'm watching! 👀");
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 2000);
    } else if (lastResult) {
      if (isSpecialResult) {
        setRobotState('celebrating');
        setSpeechBubble("Wow! Special result! 🎉✨");
      } else {
        setRobotState('celebrating');
        setSpeechBubble("Here's the result! 🧠💫");
      }
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 3000);
    } else if (isIdle) {
      setRobotState('idle');
      const idleMessages = [
        "Ready for your next calculation! 🤖",
        "I'm here to help! ✨",
        "What math adventure next? 📐"
      ];
      setSpeechBubble(idleMessages[Math.floor(Math.random() * idleMessages.length)]);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 2500);
    } else {
      setRobotState('idle');
      setShowBubble(false);
    }
  }, [isListening, isCalculating, lastResult, isSpecialResult, isTyping, isIdle]);

  // Gentle floating movement for idle state
  useEffect(() => {
    if (robotState === 'idle' && isIdle) {
      const interval = setInterval(() => {
        setPosition(prev => ({
          x: prev.x + (Math.random() - 0.5) * 2,
          y: prev.y + (Math.random() - 0.5) * 2
        }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [robotState, isIdle]);

  const getRobotEyes = () => {
    switch (robotState) {
      case 'listening':
        return (
          <div className="flex justify-center gap-1">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse animation-delay-200"></div>
          </div>
        );
      case 'thinking':
        return (
          <div className="flex justify-center gap-1">
            <div className="w-3 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
          </div>
        );
      case 'celebrating':
        return (
          <div className="flex justify-center gap-1">
            <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping animation-delay-200"></div>
          </div>
        );
      case 'typing':
        return (
          <div className="flex justify-center gap-1">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse animation-delay-200"></div>
          </div>
        );
      case 'error':
        return (
          <div className="flex justify-center gap-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          </div>
        );
      default:
        return (
          <div className="flex justify-center gap-1">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        );
    }
  };

  const getRobotMouth = () => {
    switch (robotState) {
      case 'celebrating':
        return <div className="w-4 h-2 bg-pink-400 rounded-full mx-auto mt-1"></div>;
      case 'thinking':
        return <div className="w-2 h-2 bg-purple-300 rounded-full mx-auto mt-1"></div>;
      case 'error':
        return <div className="w-3 h-1 bg-red-300 rounded-full mx-auto mt-1"></div>;
      default:
        return <div className="w-3 h-1 bg-pink-300 rounded-full mx-auto mt-1"></div>;
    }
  };

  const getRobotAnimation = () => {
    switch (robotState) {
      case 'listening':
        return 'animate-pulse';
      case 'thinking':
        return 'animate-spin-slow';
      case 'celebrating':
        return 'animate-bounce';
      case 'typing':
        return 'animate-bounce-gentle';
      default:
        return isIdle ? 'animate-float' : 'animate-bounce-gentle';
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed left-6 bottom-6 z-20">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-3 shadow-2xl border-2 border-white/30 hover:scale-110 transition-all duration-300"
        >
          <Maximize2 className="w-4 h-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div 
      className="fixed left-6 top-1/2 transform -translate-y-1/2 z-20 flex flex-col items-center transition-all duration-1000"
      style={{
        transform: `translate(${position.x}px, ${position.y - 50}px)`
      }}
    >
      {/* Speech Bubble */}
      {showBubble && (
        <div className="mb-4 relative animate-fade-in">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-2 text-white text-xs font-medium max-w-40 text-center">
            {speechBubble}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-white/20"></div>
        </div>
      )}

      {/* Robot Body */}
      <div className={cn(
        "relative bg-gradient-to-br from-blue-400 via-white to-blue-500 rounded-3xl p-4 shadow-2xl border-3 border-gray-800 transition-all duration-300",
        getRobotAnimation()
      )}>
        {/* Microphone indicator when listening */}
        {isListening && (
          <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1.5 animate-pulse">
            <Mic className="w-3 h-3 text-white" />
          </div>
        )}

        {/* Robot Head */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 mb-2 relative border border-gray-300">
          {/* Blue visor/forehead */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-blue-500 rounded-t-xl border border-gray-800"></div>
          
          {/* Eyes */}
          <div className="mb-2">
            {getRobotEyes()}
          </div>
          
          {/* Mouth */}
          <div>
            {getRobotMouth()}
          </div>

          {/* Side details */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-4 bg-blue-400 rounded-r-lg border border-gray-800"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-4 bg-blue-400 rounded-l-lg border border-gray-800"></div>
        </div>

        {/* Robot Body */}
        <div className="bg-white/80 rounded-xl p-2 border border-gray-300">
          {/* Chest circle */}
          <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2 border-2 border-gray-800">
            <div className="w-2 h-2 bg-blue-300 rounded-full mx-auto mt-0.5"></div>
          </div>
          
          {/* Control Buttons */}
          <div className="flex justify-center gap-1">
            <button
              onClick={onToggleSpeech}
              className="p-1 rounded-full bg-green-400/80 hover:bg-green-400 transition-colors border border-gray-600"
              title={isSpeechEnabled ? "Mute voice" : "Enable voice"}
            >
              {isSpeechEnabled ? (
                <Volume2 className="w-2 h-2 text-white" />
              ) : (
                <VolumeX className="w-2 h-2 text-white" />
              )}
            </button>
            
            <button
              onClick={onHelp}
              className="p-1 rounded-full bg-purple-400/80 hover:bg-purple-400 transition-colors border border-gray-600"
              title="Help"
            >
              <HelpCircle className="w-2 h-2 text-white" />
            </button>

            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded-full bg-gray-400/80 hover:bg-gray-400 transition-colors border border-gray-600"
              title="Minimize"
            >
              <X className="w-2 h-2 text-white" />
            </button>
          </div>
        </div>

        {/* Robot Arms */}
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
          <div className={cn(
            "w-6 h-2 bg-white rounded-full border border-gray-800",
            robotState === 'celebrating' && "animate-bounce"
          )}>
            <div className="w-2 h-2 bg-blue-400 rounded-full ml-4 border border-gray-600"></div>
          </div>
        </div>
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
          <div className={cn(
            "w-6 h-2 bg-white rounded-full border border-gray-800",
            robotState === 'celebrating' && "animate-bounce animation-delay-200"
          )}>
            <div className="w-2 h-2 bg-blue-400 rounded-full border border-gray-600"></div>
          </div>
        </div>

        {/* Robot Legs */}
        <div className="absolute -bottom-1 left-1/4 transform -translate-x-1/2">
          <div className="w-2 h-3 bg-white rounded-b-lg border border-gray-800">
            <div className="w-3 h-1 bg-gray-600 rounded-full mt-2 -ml-0.5"></div>
          </div>
        </div>
        <div className="absolute -bottom-1 right-1/4 transform translate-x-1/2">
          <div className="w-2 h-3 bg-white rounded-b-lg border border-gray-800">
            <div className="w-3 h-1 bg-gray-600 rounded-full mt-2 -ml-0.5"></div>
          </div>
        </div>
      </div>

      {/* Shadow */}
      <div className="w-12 h-2 bg-black/20 rounded-full mt-1 blur-sm"></div>
    </div>
  );
};

export default AIRobot;
