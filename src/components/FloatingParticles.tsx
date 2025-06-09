
import { useEffect, useState } from 'react';

const FloatingParticles = () => {
  const particles = ['🧮', '➕', '➗', '➖', '✖️', '📐', '💡', '📊'];
  const [activeParticles, setActiveParticles] = useState<Array<{id: number, emoji: string, left: number, delay: number}>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: Date.now(),
        emoji: particles[Math.floor(Math.random() * particles.length)],
        left: Math.random() * 90,
        delay: Math.random() * 2
      };
      
      setActiveParticles(prev => [...prev, newParticle]);
      
      // Remove particle after animation completes
      setTimeout(() => {
        setActiveParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 8000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {activeParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute floating-emoji animate-float-up"
          style={{
            left: `${particle.left}%`,
            bottom: '-50px',
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingParticles;
