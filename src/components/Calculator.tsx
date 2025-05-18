
import React, { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Minus, X, Divide, Equal, RotateCcw, Trash2 } from 'lucide-react';
import Button from './Button';
import Display from './Display';
import InputField from './InputField';

const Calculator: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [operation, setOperation] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const { toast } = useToast();

  const handleOperation = (selectedOperation: string) => {
    if (inputValue) {
      setPreviousValue(Number(inputValue));
    }
    setOperation(selectedOperation);
    setInputValue((prevValue) => prevValue + ' ' + selectedOperation + ' ');
  };

  const handleSubmit = () => {
    if (previousValue === null || inputValue === '') return;

    const currentValue = Number(inputValue.split(' ').pop());
    if (isNaN(currentValue)) return;

    let newResult = result;
    switch (operation) {
      case '+':
        newResult = previousValue + currentValue;
        break;
      case '-':
        newResult = previousValue - currentValue;
        break;
      case 'x':
        newResult = previousValue * currentValue;
        break;
      case '÷':
        if (currentValue === 0) {
          toast({
            title: 'Error',
            description: 'Cannot divide by zero',
            variant: 'destructive',
          });
          return;
        }
        newResult = previousValue / currentValue;
        break;
      default:
        break;
    }

    setResult(newResult);
    setInputValue('');
    setPreviousValue(null);
    setOperation(null);
  };

  const handleResetInput = () => {
    setInputValue('');
  };

  const handleResetResult = () => {
    setResult(0);
  };

  const handleInputChange = (num: string) => {
    setInputValue((prevValue) => prevValue + num);
  };

  return (
    <div className="w-full max-w-md fade-in">
      <Display result={result} />
      <InputField inputRef={inputRef} inputValue={inputValue} />

      <div className="grid grid-cols-4 gap-3 mt-5">
        {/* Top row - Clear buttons */}
        <Button 
          variant="action" 
          className="col-span-2" 
          onClick={handleResetInput} 
          text="C" 
        />
        <Button 
          variant="action" 
          className="col-span-2" 
          onClick={handleResetResult} 
          text="AC" 
        />

        {/* Number grid (7-9, 4-6, 1-3, 0) */}
        {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
          <Button
            key={num}
            variant="number"
            onClick={() => handleInputChange(num.toString())}
            text={num.toString()}
          />
        ))}
        
        {/* Operations */}
        <Button
          variant="operation"
          onClick={() => handleOperation('÷')}
          text="÷"
        />
        <Button
          variant="operation"
          onClick={() => handleOperation('x')}
          text="×"
        />
        <Button
          variant="operation"
          onClick={() => handleOperation('-')}
          text="-"
        />
        <Button
          variant="operation"
          onClick={() => handleOperation('+')}
          text="+"
        />

        {/* Bottom row */}
        <Button
          variant="number"
          className="col-span-2"
          onClick={() => handleInputChange('0')}
          text="0"
        />
        <Button
          variant="number"
          onClick={() => handleInputChange('.')}
          text="."
        />
        <Button
          variant="equal"
          onClick={handleSubmit}
          text="="
        />
      </div>
    </div>
  );
};

export default Calculator;
