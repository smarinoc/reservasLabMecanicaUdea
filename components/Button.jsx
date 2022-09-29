import React from 'react';

const Button = ({ onClick, isSubmit, text, className, disabled }) => (
  <button
    className={`block ${className} h-fit bg-[#00F47F] hover:bg-[#26DB84] focus:bg-[#26DB84] text-black text-base rounded-lg px-3 py-2 font-medium`}
    type={isSubmit ? 'submit' : 'button'}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default Button;
