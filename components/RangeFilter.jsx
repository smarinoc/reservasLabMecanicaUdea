import React from 'react';
import BasicFilter from '@components/BasicFilter';

const RangeFilter = (props) => {
  const {
    column: { filterValue = [], setFilter, Header, isSortedDesc, toggleSortBy },
  } = props;

  return (
    <BasicFilter
      isSortedDesc={isSortedDesc}
      toggleSortBy={toggleSortBy}
      Header={Header}
    >
      <div className='flex flex-row items-center gap-2 w-[150px]'>
        <input
          className='rounded-md px-1 py-2 border-2 border-gray-200 outline-none focus:border-[#26DB84] font-normal text-xs w-full'
          value={filterValue[0] || ''}
          type='number'
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [
              val ? parseInt(val, 10) : undefined,
              old[1],
            ]);
          }}
        />
        <span className='font-normal text-xs text-white'>A</span>
        <input
          value={filterValue[1] || ''}
          type='number'
          className='rounded-md px-1 py-2 border-2 border-gray-200 outline-none focus:border-[#26DB84] font-normal text-xs w-full'
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [
              old[0],
              val ? parseInt(val, 10) : undefined,
            ]);
          }}
        />
      </div>
    </BasicFilter>
  );
};

export default RangeFilter;
