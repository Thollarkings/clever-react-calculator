
import React from 'react';

interface DisplayProps {
  result: number;
}

const Display: React.FC<DisplayProps> = ({ result }) => {
  return (
    <div className="w-full p-4 bg-white/30 backdrop-blur-md rounded-xl border border-white/30 shadow-inner mb-4">
      <p className="text-right text-3xl font-bold text-foreground overflow-hidden text-ellipsis">
        {result}
      </p>
    </div>
  );
};

export default Display;
