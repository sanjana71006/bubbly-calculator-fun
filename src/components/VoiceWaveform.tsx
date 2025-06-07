
interface VoiceWaveformProps {
  isListening: boolean;
}

const VoiceWaveform = ({ isListening }: VoiceWaveformProps) => {
  if (!isListening) return null;

  return (
    <div className="flex items-center justify-center gap-1 py-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full animate-pulse"
          style={{
            height: `${Math.random() * 20 + 10}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWaveform;
