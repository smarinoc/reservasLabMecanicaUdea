import React from 'react';

const Button = ({onClick, isSubmit, text, w, disabled}) => {
    return (
        <button
            className={`block ${w} h-fit bg-[#00F47F] hover:bg-[#26DB84] focus:bg-[#26DB84] text-black rounded-lg px-3 py-2 font-semibold`}
            type={isSubmit ? 'submit' : 'button'}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;