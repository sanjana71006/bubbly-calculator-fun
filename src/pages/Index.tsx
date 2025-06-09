
import { useState } from 'react';
import Calculator from '@/components/Calculator';
import SplashScreen from '@/components/SplashScreen';
import FloatingParticles from '@/components/FloatingParticles';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen bg-background transition-all duration-500 relative overflow-hidden">
      <FloatingParticles />
      
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
          <div className="absolute top-6 right-6">
            <ThemeToggle />
          </div>
          
          {/* Professional welcome text with high contrast */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center max-w-2xl mx-4">
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Welcome to your Smart Calculator! 🤖🧮
            </h1>
            <p className="text-muted-foreground text-base font-medium leading-relaxed">
              This calculator adapts to your mode and provides a clear, professional display — with a playful robot companion to make your experience more engaging. Just tap or click to calculate — I'm here to help!
            </p>
          </div>
          
          <Calculator />
        </div>
      )}
    </div>
  );
};

export default Index;
