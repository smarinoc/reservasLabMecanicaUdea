import React, { useMemo } from 'react';
import BasicFilter from '@components/BasicFilter';

const SelectFilter = (props) => {
  const {
    column: {
      filterValue,
      setFilter,
      Header,
      isSortedDesc,
      toggleSortBy,
      id,
      preFilteredRows,
    },
  } = props;

  const options = useMemo(() => {
    const optionsFind = new Set();
    preFilteredRows.forEach((row) => {
      optionsFind.add(row.values[id]);
    });
    return [...optionsFind.values()];
  }, [id, preFilteredRows]);

  return (
    <BasicFilter
      isSortedDesc={isSortedDesc}
      toggleSortBy={toggleSortBy}
      Header={Header}
    >
      <select
        className='rounded-md px-1 py-2 border-2 border-gray-200 outline-none focus:border-[#26DB84] font-normal text-xs w-full bg-white'
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option className='font-normal text-xs' value=''>
          Todos
        </option>
        {options.map((option) => (
          <option className='font-normal text-xs' value={option}>
            {option}
          </option>
        ))}
      </select>
    </BasicFilter>
  );
};

export default SelectFilter;
