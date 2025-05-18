
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  className?: string;
  variant?: 'number' | 'operation' | 'action' | 'equal' | 'memory' | 'function';
}

const Button: React.FC<ButtonProps> = ({ onClick, text, className, variant = 'number' }) => {
  const baseClass = {
    'calculator-btn-number': variant === 'number',
    'calculator-btn-operation': variant === 'operation',
    'calculator-btn-action': variant === 'action',
    'calculator-btn-equal': variant === 'equal',
    'calculator-btn-memory': variant === 'memory',
    'calculator-btn-function': variant === 'function',
  };

  return (
    <button 
      onClick={onClick} 
      className={cn(baseClass, 'h-14', className)}
    >
      {text}
    </button>
  );
};

export default Button;
