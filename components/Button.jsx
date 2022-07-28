import React from 'react';

const Button = ({onClick, isSubmit, text, w}) => {
    return (
        <button
            className={`block ${w} bg-[#00F47F] hover:bg-[#26DB84] focus:bg-[#26DB84] text-black rounded-lg px-3 py-2 font-semibold`}
            type={isSubmit ? 'submit' : 'button'}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;