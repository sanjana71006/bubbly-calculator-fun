
import { useEffect } from 'react';
import { Calculator, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="text-center animate-fade-in">
        <div className="relative mb-8">
          <Calculator className="w-24 h-24 text-white mx-auto animate-pulse" />
          <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-spin" />
          <Sparkles className="w-6 h-6 text-pink-300 absolute -bottom-1 -left-1 animate-ping" />
        </div>
        
        <h1 className="text-5xl font-bold text-white mb-4 animate-scale-in">
          Voice Calc ✨
        </h1>
        
        <p className="text-xl text-purple-200 animate-fade-in animation-delay-500">
          Your intelligent calculator experience
        </p>
        
        <div className="mt-8 flex justify-center space-x-4 text-4xl animate-fade-in animation-delay-1000">
          <span className="animate-bounce">🧮</span>
          <span className="animate-bounce animation-delay-200">🎈</span>
          <span className="animate-bounce animation-delay-400">✨</span>
          <span className="animate-bounce animation-delay-600">🧠</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
