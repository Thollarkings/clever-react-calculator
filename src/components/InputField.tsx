
import React from 'react';

interface InputFieldProps {
  inputRef: React.RefObject<HTMLInputElement>;
  inputValue: string;
}

const InputField: React.FC<InputFieldProps> = ({ inputRef, inputValue }) => {
  return (
    <div className="w-full mb-4">
      <input
        ref={inputRef}
        value={inputValue}
        className="w-full p-3 text-xl text-right bg-white/30 backdrop-blur-md rounded-xl border border-white/30 shadow-inner font-medium focus:outline-none"
        readOnly
      />
    </div>
  );
};

export default InputField;
