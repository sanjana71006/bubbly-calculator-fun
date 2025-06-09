
interface CalculatorDisplayProps {
  value: string;
}

const CalculatorDisplay = ({ value }: CalculatorDisplayProps) => {
  return (
    <div className="calc-display rounded-xl p-6 mb-4">
      <div className="text-right">
        <div className="text-4xl font-mono text-foreground font-bold overflow-hidden">
          {value}
        </div>
        <div className="text-sm text-muted-foreground mt-1 flex justify-end items-center gap-2">
          <span>Ready to calculate</span>
          <span className="animate-pulse">💡</span>
        </div>
      </div>
    </div>
  );
};

export default CalculatorDisplay;
