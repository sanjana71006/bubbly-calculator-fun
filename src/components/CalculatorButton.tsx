
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const CalculatorButton = ({ onClick, children, className }: CalculatorButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-14 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold text-xl",
        "hover:bg-white/30 hover:scale-105 active:scale-95 transition-all duration-200",
        "shadow-lg hover:shadow-xl",
        className
      )}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;
