
const FloatingParticles = () => {
  const particles = ['🧮', '➕', '➗', '➖', '✖️', '📐', '💡', '📊'];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute text-2xl floating-emoji animate-float-gentle animate-fade-in-slow"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
          }}
        >
          {particle}
        </div>
      ))}
      
      {/* Additional layer for more variety */}
      {particles.slice(0, 4).map((particle, index) => (
        <div
          key={`extra-${index}`}
          className="absolute text-xl floating-emoji animate-float-gentle"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            animationDelay: `${2 + Math.random() * 4}s`,
            animationDuration: `${6 + Math.random() * 2}s`,
          }}
        >
          {particle}
        </div>
      ))}
    </div>
  );
};

export default FloatingParticles;
