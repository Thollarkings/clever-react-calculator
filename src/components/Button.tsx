import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  className?: string;
  variant?: 'number' | 'operation' | 'action' | 'equal' | 'memory' | 'function';
}

const Button: React.FC<ButtonProps> = ({ onClick, text, className, variant = 'number' }) => {
  const variantClasses = {
    number: 'calculator-btn-number',
    operation: 'calculator-btn-operation',
    action: 'calculator-btn-action',
    equal: 'calculator-btn-equal',
    memory: 'calculator-btn-memory',
    function: 'calculator-btn-function',
  };

  return (
    <button 
      onClick={onClick} 
      className={cn(
        'calculator-btn h-14 font-medium', // Base button styles
        variantClasses[variant], // Variant-specific class
        className // Additional custom classes
      )}
    >
      {text}
    </button>
  );
};

export default Button;
