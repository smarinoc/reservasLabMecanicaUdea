import React from 'react';
import BasicFilter from '@components/BasicFilter';

const TextFilter = (props) => {
  const {
    column: { filterValue, setFilter, Header, isSortedDesc, toggleSortBy },
  } = props;

  return (
    <BasicFilter
      isSortedDesc={isSortedDesc}
      toggleSortBy={toggleSortBy}
      Header={Header}
    >
      <input
        type='text'
        className='rounded-md px-1 py-2 border-2 border-gray-200 outline-none focus:border-[#26DB84] font-normal text-xs w-full'
        placeholder={`buscar por ${Header}`}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
    </BasicFilter>
  );
};

export default TextFilter;
