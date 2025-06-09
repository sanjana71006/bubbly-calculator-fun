
interface CalculatorDisplayProps {
  value: string;
}

const CalculatorDisplay = ({ value }: CalculatorDisplayProps) => {
  return (
    <div className="calc-display rounded-xl p-6 mb-4">
      <div className="text-right">
        <div className="text-4xl font-mono text-display font-bold overflow-hidden leading-tight">
          {value}
        </div>
        <div className="text-sm text-muted-accessible mt-2 flex justify-end items-center gap-2 font-medium">
          <span>Ready to calculate</span>
          <span className="animate-pulse">💡</span>
        </div>
      </div>
    </div>
  );
};

export default CalculatorDisplay;
