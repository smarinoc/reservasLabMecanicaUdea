/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import Input from '@components/Input';

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
        <Input
          name='location'
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            unit.location = e.target.value;
          }}
          text='Ubicación'
          type='text'
        />
        <Input
          name='serial'
          value={serial}
          onChange={(e) => {
            setSerial(e.target.value);
            unit.serial = e.target.value;
          }}
          text='Serial'
          type='text'
        />
      </div>
    </div>
  );
};

export default InputMachineUnit;
