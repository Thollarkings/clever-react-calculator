
import React from 'react';
import Calculator from '../components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="glass rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Simple Calculator</h1>
        <Calculator />
      </div>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; Thollarkings 2024</p>
      </footer>
    </div>
  );
};

export default Index;
