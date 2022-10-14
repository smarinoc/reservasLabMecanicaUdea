import React, { useEffect, useState } from 'react';

const ItemSchedule = ({ onClick, isAvailable, type, isSelectParam }) => {
  const [isSelect, setIsSelect] = useState(false);

  useEffect(() => {
    setIsSelect(isSelectParam);
  }, [isSelectParam]);

  let className = 'w-full border-2 border-gray-400 h-20';
  let text = '';
  if (isAvailable) {
    className += ' hover:border-4';
    if (type === 'reserve') {
      className += ' bg-green-500 text-base';
      text = 'Disponible';
      if (isSelect) {
        className += ' border-gray-900';
      } else {
        className += ' hover:border-gray-800';
      }
    } else {
      className += ' hover:border-[#26DB84]';
      if (isSelect) {
        className += ' bg-[#26DB84]';
      }
    }
  }
  return (
    <button
      type='button'
      disabled={!isAvailable}
      onClick={() => {
        onClick();
        setIsSelect(!isSelect);
      }}
      className={className}
    >
      {text}
    </button>
  );
};

export default ItemSchedule;
