import React from 'react';

const ItemScheduleTable = ({ diary, onItem }) => (
  <button
    type='button'
    className='w-full flex flex-row justify-between hover:border-2 hover:border-[#26DB84] px-3 py-4 bg-white hover:bg-slate-100 border-b-2'
    onClick={onItem}
  >
    <span className='text-start w-full text-base font-medium text-gray-700'>
      {diary.name}
    </span>
    <span className='text-start w-full text-base font-medium text-gray-700'>
      {diary.machinesCount}
    </span>
  </button>
);

export default ItemScheduleTable;
