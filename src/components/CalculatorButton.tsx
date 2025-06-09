
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'operator' | 'clear';
}

const CalculatorButton = ({ onClick, children, className, variant = 'default' }: CalculatorButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'operator':
        return 'calc-operator text-white font-bold';
      case 'clear':
        return 'bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold border border-destructive';
      default:
        return 'calc-button text-foreground';
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "h-16 rounded-xl text-xl font-semibold transition-all duration-200",
        "shadow-sm hover:shadow-lg active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        getVariantStyles(),
        className
      )}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;
