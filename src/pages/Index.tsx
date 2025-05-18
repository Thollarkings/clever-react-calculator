
import React from 'react';
import Calculator from '../components/Calculator';

const Index = () => {
  return (
    <div className="rounded-2xl flex flex-col items-center justify-center p-5 bg-gradient-to-br from-blue-400 via-blue-900 to-blue-400" w-96>
      <div className="glass rounded-2xl p-6 md:p-8 w-full max-w-md shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)]">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Simple Calculator</h1>
        <Calculator />
      </div>
      <footer className="mt-8 text-center text-sm text-white/70">
        <p>&copy; Thollarkings 2024</p>
      </footer>
    </div>
  );
};

export default Index;
