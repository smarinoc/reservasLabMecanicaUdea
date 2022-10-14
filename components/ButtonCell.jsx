import React from 'react';

const ButtonCell = (props) => {
  const {
    column: { onsubmit },
    row: {
      original: { id },
    },
  } = props;

  return (
    <button
      onClick={() => {
        onsubmit(id);
      }}
      type='button'
      className='rounded-md px-1 py-2 border-2 border-gray-700 outline-none hover:border-[#26DB84] font-normal text-xs w-full bg-white'
    >
      Editar
    </button>
  );
};

export default ButtonCell;
