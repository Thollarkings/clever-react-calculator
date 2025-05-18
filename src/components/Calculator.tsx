import React, { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Button from './Button';
import Display from './Display';
import InputField from './InputField';

const Calculator: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [operation, setOperation] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [memory, setMemory] = useState<number>(0);
  const { toast } = useToast();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    button.classList.add('btn-click');
    setTimeout(() => {
      button.classList.remove('btn-click');
    }, 200);
  };

  const handleOperation = (selectedOperation: string) => {
    if (inputValue) {
      try {
        // Evaluate the current input expression first
        const evalResult = evaluateExpression(inputValue);
        setResult(evalResult);
        setPreviousValue(evalResult);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Invalid expression',
          variant: 'destructive',
        });
        return;
      }
    }
    setOperation(selectedOperation);
    setInputValue((prevValue) => prevValue + ' ' + selectedOperation + ' ');
  };

  const evaluateExpression = (expression: string): number => {
    // Remove any trailing operators or spaces
    const cleanExpression = expression.trim().replace(/\s*[+\-x÷]\s*$/, '');
    
    if (!cleanExpression) return 0;

    // Split the expression by operators while preserving the operators
    const tokens: string[] = [];
    let currentNumber = '';

    for (let i = 0; i < cleanExpression.length; i++) {
      const char = cleanExpression[i];
      if ('0123456789.'.includes(char)) {
        currentNumber += char;
      } else if ('+-x÷()'.includes(char)) {
        if (currentNumber) {
          tokens.push(currentNumber);
          currentNumber = '';
        }
        tokens.push(char);
      } else if (char === ' ') {
        if (currentNumber) {
          tokens.push(currentNumber);
          currentNumber = '';
        }
      }
    }

    if (currentNumber) {
      tokens.push(currentNumber);
    }

    // Convert infix notation to postfix notation (Shunting-yard algorithm)
    const postfix = infixToPostfix(tokens);
    
    // Evaluate postfix expression
    return evaluatePostfix(postfix);
  };

  const infixToPostfix = (tokens: string[]): string[] => {
    const output: string[] = [];
    const operators: string[] = [];
    const precedence: Record<string, number> = { '+': 1, '-': 1, 'x': 2, '÷': 2 };

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      
      if (!isNaN(Number(token))) {
        output.push(token); // If token is a number, add to output
      } else if (token === '(') {
        operators.push(token);
      } else if (token === ')') {
        while (operators.length > 0 && operators[operators.length - 1] !== '(') {
          output.push(operators.pop()!);
        }
        operators.pop(); // Remove the '('
      } else if (['+', '-', 'x', '÷'].includes(token)) {
        while (
          operators.length > 0 &&
          operators[operators.length - 1] !== '(' &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          output.push(operators.pop()!);
        }
        operators.push(token);
      }
    }

    while (operators.length > 0) {
      output.push(operators.pop()!);
    }

    return output;
  };

  const evaluatePostfix = (postfix: string[]): number => {
    const stack: number[] = [];

    for (let i = 0; i < postfix.length; i++) {
      const token = postfix[i];
      
      if (!isNaN(Number(token))) {
        stack.push(Number(token));
      } else {
        const b = stack.pop()!;
        const a = stack.pop()!;
        
        switch (token) {
          case '+': stack.push(a + b); break;
          case '-': stack.push(a - b); break;
          case 'x': stack.push(a * b); break;
          case '÷': 
            if (b === 0) {
              toast({
                title: 'Error',
                description: 'Cannot divide by zero',
                variant: 'destructive',
              });
              throw new Error('Division by zero');
            }
            stack.push(a / b);
            break;
        }
      }
    }

    return stack[0] || 0;
  };

  const handleSubmit = () => {
    if (inputValue.trim() === '') return;

    try {
      const evalResult = evaluateExpression(inputValue);
      setResult(evalResult);
      setInputValue('');
      setPreviousValue(null);
      setOperation(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid expression',
        variant: 'destructive',
      });
    }
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

  const handleSqrt = () => {
    if (inputValue) {
      const value = Number(inputValue);
      if (value < 0) {
        toast({
          title: 'Error',
          description: 'Cannot calculate square root of a negative number',
          variant: 'destructive',
        });
        return;
      }
      const sqrtResult = Math.sqrt(value);
      setResult(sqrtResult);
      setInputValue('');
    } else if (result !== 0) {
      if (result < 0) {
        toast({
          title: 'Error',
          description: 'Cannot calculate square root of a negative number',
          variant: 'destructive',
        });
        return;
      }
      setResult(Math.sqrt(result));
    }
  };

  const handleBracket = (bracket: string) => {
    setInputValue((prevValue) => prevValue + bracket);
  };

  const handleMemoryStore = () => {
    if (inputValue) {
      setMemory(Number(inputValue));
      toast({
        title: 'Memory',
        description: `Value ${inputValue} stored in memory`,
      });
    } else {
      setMemory(result);
      toast({
        title: 'Memory',
        description: `Value ${result} stored in memory`,
      });
    }
  };

  const handleMemoryClear = () => {
    setMemory(0);
    toast({
      title: 'Memory',
      description: 'Memory cleared',
    });
  };

  const handleMemoryRecall = () => {
    setInputValue((prevValue) => prevValue + memory.toString());
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
          onClick={(e) => {
            handleResetInput();
            handleButtonClick(e);
          }} 
          text="C" 
        />
        <Button 
          variant="action" 
          className="col-span-2" 
          onClick={(e) => {
            handleResetResult();
            handleButtonClick(e);
          }} 
          text="AC" 
        />

        {/* Memory and Function row */}
        <Button
          variant="memory"
          onClick={(e) => {
            handleMemoryStore();
            handleButtonClick(e);
          }}
          text="M"
        />
        <Button
          variant="memory"
          onClick={(e) => {
            handleMemoryClear();
            handleButtonClick(e);
          }}
          text="MC"
        />
        <Button
          variant="memory"
          onClick={(e) => {
            handleMemoryRecall();
            handleButtonClick(e);
          }}
          text="MR"
        />
        <Button
          variant="function"
          onClick={(e) => {
            handleSqrt();
            handleButtonClick(e);
          }}
          text="√"
        />

        {/* Brackets */}
        <Button
          variant="function"
          onClick={(e) => {
            handleBracket('(');
            handleButtonClick(e);
          }}
          text="("
        />
        <Button
          variant="function"
          onClick={(e) => {
            handleBracket(')');
            handleButtonClick(e);
          }}
          text=")"
        />

        {/* Number grid (7-9) */}
        <Button
          variant="number"
          onClick={(e) => {
            handleInputChange('7');
            handleButtonClick(e);
          }}
          text="7"
        />
        <Button
          variant="number"
          onClick={(e) => {
            handleInputChange('8');
            handleButtonClick(e);
          }}
          text="8"
        />
        <Button
          variant="number"
          onClick={(e) => {
            handleInputChange('9');
            handleButtonClick(e);
          }}
          text="9"
        />
        <Button
          variant="operation"
          onClick={(e) => {
            handleOperation('÷');
            handleButtonClick(e);
          }}
          text="÷"
        />

        {/* Numbers 4-6 */}
        <Button
          variant="number"
          onClick={(e) => {
            handleInputChange('4');
            handleButtonClick(e);
          }}
          text="4"
        />
        <Button
          variant="number"
          onClick={(e) => {
            handleInputChange('5');
            handleButtonClick(e);
          }}
          text="5"
        />
        <Button
          variant="number"
          onClick={(e) => {
            handleInputChange('6');
            handleButtonClick(e);
          }}
          text="6"
        />
        <Button
          variant="operation"
          onClick={(e) => {
            handleOperation('x');
            handleButtonClick(e);
          }}
          text="×"
        />

        {/* Numbers 1-3 */}
        <Button
          variant="number"
          onClick={(e) => {
            handleInputChange('1');
            handleButtonClick(e);
          }}
          text="1"
        />
        <Button
          variant="number"
          onClick={(e) => {
            handleInputChange('2');
            handleButtonClick(e);
          }}
          text="2"
        />
        <Button
          variant="number"
          onClick={(e) => {
            handleInputChange('3');
            handleButtonClick(e);
          }}
          text="3"
        />
        <Button
          variant="operation"
          onClick={(e) => {
            handleOperation('-');
            handleButtonClick(e);
          }}
          text="-"
        />

        {/* Bottom row */}
        <Button
          variant="number"
          onClick={(e) => {
            handleInputChange('0');
            handleButtonClick(e);
          }}
          text="0"
        />
        <Button
          variant="number"
          onClick={(e) => {
            handleInputChange('.');
            handleButtonClick(e);
          }}
          text="."
        />
        <Button
          variant="equal"
          onClick={(e) => {
            handleSubmit();
            handleButtonClick(e);
          }}
          text="="
        />
        <Button
          variant="operation"
          onClick={(e) => {
            handleOperation('+');
            handleButtonClick(e);
          }}
          text="+"
        />
      </div>
    </div>
  );
};

export default Calculator;
