
interface CalculatorDisplayProps {
  value: string;
}

const CalculatorDisplay = ({ value }: CalculatorDisplayProps) => {
  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 mb-4 border border-white/10">
      <div className="text-right">
        <div className="text-4xl font-mono text-white font-bold overflow-hidden">
          {value}
        </div>
        <div className="text-sm text-purple-200 mt-1 flex justify-end items-center gap-2">
          <span>Ready to calculate</span>
          <span className="animate-pulse">💫</span>
        </div>
      </div>
    </div>
  );
};

export default CalculatorDisplay;
