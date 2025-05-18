
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
  variant?: 'number' | 'operation' | 'action' | 'equal';
}

const Button: React.FC<ButtonProps> = ({ onClick, text, className, variant = 'number' }) => {
  const baseClass = {
    'calculator-btn-number': variant === 'number',
    'calculator-btn-operation': variant === 'operation',
    'calculator-btn-action': variant === 'action',
    'calculator-btn-equal': variant === 'equal',
  };

  return (
    <button 
      onClick={onClick} 
      className={cn(baseClass, className)}
    >
      {text}
    </button>
  );
};

export default Button;
