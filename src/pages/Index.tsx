
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
          
          <Calculator />
        </div>
      )}
    </div>
  );
};

export default Index;
