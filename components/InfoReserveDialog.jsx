import React from 'react';

const InfoReserveDialog = ({ label, text }) => (
  <div className='flex flex-row gap-6 w-full'>
    <span className='text-gray-600 font-semibold text-lg basis-1/2 text-end'>
      {label}:
    </span>
    <span className='text-gray-600 font-semibold text-lg basis-1/2 text-start'>
      {text}
    </span>
  </div>
);

export default InfoReserveDialog;
