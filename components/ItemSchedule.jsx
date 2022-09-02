import React, { useEffect, useState } from 'react';

const ItemSchedule = ({ onClick, isAvailable, isReserve, isSelectParam }) => {
  const [isSelect, setIsSelect] = useState(false);

  useEffect(() => {
    setIsSelect(isSelectParam);
  }, [isSelectParam]);

  let className = 'w-full border-2 border-gray-400';
  let text = '';
  if (isAvailable) {
    className += ' hover:border-4';
    if (isReserve) {
      className += ' bg-green-500';
      text = 'disponible';
      if (isSelect) {
        className += ' border-gray-900 border-4';
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
        setIsSelect(!isSelect || isReserve);
      }}
      className={className}
    >
      {text}
    </button>
  );
};

export default ItemSchedule;
