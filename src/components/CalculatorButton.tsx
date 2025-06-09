
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
        return 'bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold';
      default:
        return 'calc-button text-foreground';
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "h-14 rounded-lg text-xl font-semibold transition-all duration-200",
        "shadow-sm hover:shadow-md active:scale-95",
        getVariantStyles(),
        className
      )}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;
