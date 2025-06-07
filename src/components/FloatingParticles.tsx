
const FloatingParticles = () => {
  const particles = ['➕', '➖', '✖️', '➗', '🧮', '📐', '🔢', '💫'];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle, index) => (
        <div
          key={index}
          className={`absolute text-2xl opacity-30 animate-float-${(index % 4) + 1}`}
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          {particle}
        </div>
      ))}
    </div>
  );
};

export default FloatingParticles;
