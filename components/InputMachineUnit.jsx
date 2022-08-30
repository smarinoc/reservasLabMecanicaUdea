/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import Input from '@components/Input';
import BsXlgButton from '@components/BsXlgButton';

const InputMachineUnit = ({ unit, onCancelMachineUnit, index }) => {
  const [location, setLocation] = useState(unit.location);
  const [count, setCount] = useState(unit.count);
  useEffect(() => {
    setLocation(unit.location);
    setCount(unit.count);
  }, [unit]);
  return (
    <div className='flex flex-row gap-2 border-2 border-blue-100 p-2 pr-2'>
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
          name='count'
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
            unit.count = parseInt(e.target.value, 10);
          }}
          text='Número de unidades'
          type='number'
        />
      </div>
      {index === 0 ? (
        <></>
      ) : (
        <BsXlgButton
          onClick={() => {
            onCancelMachineUnit(index);
          }}
        />
      )}
    </div>
  );
};

export default InputMachineUnit;
