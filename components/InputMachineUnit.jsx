/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';

const InputMachineUnit = ({ unit }) => {
  const [location, setLocation] = useState(unit.location);
  const [serial, setSerial] = useState(unit.serial);
  useEffect(() => {
    setLocation(unit.location);
    setSerial(unit.serial);
  }, [unit]);
  return (
    <div className='flex flex-row gap-1 border-2 border-gray-400 pr-2 p-1'>
      <div className='flex flex-col gap-1 w-full  p-2'>
        <div className='flex flex-col w-full'>
          <span className='block text-sm font-medium px-1 text-gray-700'>
            Ubicación
          </span>
          <input
            className='w-full mt-1 flex rounded-md shadow-sm px-3 py-2 border-2 border-gray-500  outline-none focus:border-[#26DB84]'
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              unit.location = e.target.value;
            }}
          />
        </div>
        <div className='flex flex-col w-full'>
          <span className='block text-sm font-medium px-1 text-gray-700'>
            Serial
          </span>
          <input
            className='w-full mt-1 flex rounded-md shadow-sm px-3 py-2 border-2 border-gray-500  outline-none focus:border-[#26DB84]'
            value={serial}
            onChange={(e) => {
              setSerial(e.target.value);
              unit.serial = e.target.value;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InputMachineUnit;
