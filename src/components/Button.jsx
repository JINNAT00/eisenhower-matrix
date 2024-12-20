// src/components/Button.jsx
import React from 'react';

const Button = ({ text, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
    >
      {text}
    </button>
  );
};

export default Button;
