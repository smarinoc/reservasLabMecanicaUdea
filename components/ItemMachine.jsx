/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@components/Button';

const ItemMachine = ({ machine, type, onClick, isSelectParam }) => {
  const [isSelect, setIsSelect] = useState(false);

  useEffect(() => {
    setIsSelect(isSelectParam);
  }, [isSelectParam]);

  return (
    <button
      type='button'
      onClick={() => {
        onClick();
        setIsSelect(!isSelect);
      }}
    >
      {type === 'machines' ? (
        <div
          className={`flex flex-col items-center gap-3 bg-white rounded-md w-[250dm] shadow-md pb-4 hover:border-2 hover:border-[#26DB84] overflow-hidden ${
            isSelect ? 'border-4 border-[#26DB84]' : ''
          }`}
        >
          <Image
            src={machine.image}
            alt='no'
            width={250}
            height={150}
            className='rounded-t-md'
          />
          <div className='flex flex-col items-center'>
            <span className='text-lg font-semibold px-1 text-gray-700'>
              {machine.name}
            </span>
            <span className='text-lg font-semibold px-1 text-gray-700'>
              {`Cantidad: ${machine.amount}`}
            </span>
          </div>
        </div>
      ) : type === 'formSchedule' ? (
        <div
          className={`flex flex-col items-center gap-3 bg-white rounded-md w-[250dm] shadow-md pb-4 hover:border-2 hover:border-[#26DB84] overflow-hidden ${
            isSelect ? 'border-4 border-[#26DB84]' : ''
          }`}
        >
          <Image
            src={machine.machine.image}
            alt='no'
            width={250}
            height={150}
            className='rounded-t-md'
          />
          <div className='flex flex-col items-center'>
            <span className='text-lg font-semibold px-1 text-gray-700'>
              {machine.machine.name}
            </span>
            <span className='text-lg font-semibold px-1 text-gray-700'>
              {machine.location}
            </span>
            <span className='text-lg font-semibold px-1 text-gray-700'>
              {machine.serial}
            </span>
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center gap-3 bg-white rounded-md w-[250dm] shadow-md pb-4 hover:border-2 hover:border-[#26DB84] overflow-hidden ${
            isSelect ? 'border-4 border-[#26DB84]' : ''
          }`}
        >
          <Image
            src={machine.machine.image}
            alt='no'
            width={250}
            height={150}
            className='rounded-t-md'
          />
          <div className='flex flex-col items-center'>
            <span className='text-lg font-semibold px-1 text-gray-700'>
              {machine.machine.name}
            </span>
            <span className='text-base font-normal text-gray-700'>
              {machine.location}
            </span>
          </div>
          <span className='text-lg font-semibold px-1 text-gray-700'>
            {machine.serial}
          </span>
          <Button text='Detalles' />
        </div>
      )}
    </button>
  );
};
export default ItemMachine;
