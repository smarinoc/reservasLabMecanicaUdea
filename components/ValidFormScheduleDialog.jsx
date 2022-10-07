import React from 'react';
import Button from '@components/Button';

const ValidFormScheduleDialog = ({ schedules, closeDialog }) => (
  <div className='flex flex-col items-center gap-5 px-10 py-8'>
    <h2 className='text-2xl text-gray-900 font-semibold'>
      Conflicto de horarios
    </h2>

    <div className='flex flex-col gap-3'>
      {schedules.map((item) => (
        <div className='flex flex-col w-full'>
          <span className='text-gray-600 font-semibold text-lg w-full'>
            {item.day} {item.hour}
          </span>
          <span className='text-gray-600 font-semibold text-lg w-full'>
            {item.name} --- {item.serial}
          </span>
        </div>
      ))}
    </div>

    <Button onClick={closeDialog} text='Aceptar' />
  </div>
);

export default ValidFormScheduleDialog;
