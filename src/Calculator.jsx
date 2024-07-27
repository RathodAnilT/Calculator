import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '=') {
      try {
        // Evaluating the expression using Function constructor for security
        setInput(Function('"use strict";return (' + input + ')')().toString());
      } catch {
        setInput('Error');
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleKeyPress = (event) => {
    const key = event.key;
    if ((/[0-9/*\-+.]/).test(key)) {
      setInput((prev) => prev + key);
    } else if (key === 'Enter') {
      handleButtonClick('=');
      event.preventDefault();  // Prevents form submission if inside a form
    } else if (key === 'Backspace') {
      setInput((prev) => prev.slice(0, -1));
    } else if (key === 'Escape') {
      handleButtonClick('C');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const buttons = [
    'C', '/', '*', '-',
    '7', '8', '9', '+',
    '4', '5', '6', '=',
    '1', '2', '3', '0', '.',
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-gray-800 p-6 rounded shadow-md w-96">
        <input 
          type="text" 
          value={input} 
          readOnly 
          className="w-full mb-4 p-4 border border-gray-700 rounded text-right bg-gray-900 text-white"
        />
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((button, index) => (
            <button 
              key={index} 
              onClick={() => handleButtonClick(button)}
              className={`p-4 rounded text-lg font-medium text-white transition 
                ${button === 'C' ? 'bg-red-500 hover:bg-red-600' : 
                  button === '=' ? 'bg-green-500 hover:bg-green-600' : 
                  'bg-gray-700 hover:bg-gray-600'}`}
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
