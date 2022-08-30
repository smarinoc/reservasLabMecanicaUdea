import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@components/Button';

const ItemMachine = ({ machine, isReserve, onClick }) => {
  const [isSelect, setIsSelect] = useState(false);

  return (
    <button
      type='button'
      onClick={() => {
        onClick();
        setIsSelect(!isSelect);
      }}
    >
      <div
        className={`flex flex-col items-center gap-3 bg-white rounded-md w-fit shadow-md pb-4 hover:border-2 hover:border-[#26DB84] ${
          isSelect ? 'border-4 border-[#26DB84]' : ''
        }`}
      >
        <Image
          src={isReserve ? machine.machine.image : machine.image}
          alt='no'
          width={250}
          height={150}
          className='rounded-t-md'
        />
        <div className='flex flex-col items-center'>
          <span className='text-lg font-semibold px-1 text-gray-700'>
            {isReserve ? machine.machine.name : machine.name}
          </span>
          {isReserve ? (
            <span className='text-base font-normal text-gray-700'>
              {machine.location}
            </span>
          ) : (
            <></>
          )}
        </div>
        {isReserve ? <Button text='Detalles' /> : <></>}
      </div>
    </button>
  );
};
export default ItemMachine;
