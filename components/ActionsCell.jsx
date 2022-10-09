import React, { useState } from 'react';

const ActionsCell = (props) => {
  const {
    value,
    column: { options, onsubmit },
    row: {
      original: { id },
    },
  } = props;

  const [filterValue, setFilter] = useState(value);

  return (
    <select
      className='rounded-md px-1 py-2 border-2 border-gray-700 outline-none focus:border-[#26DB84] font-normal text-xs w-full bg-white'
      value={filterValue}
      onChange={async (e) => {
        await onsubmit({
          id,
          state: e.target.value,
        });
        setFilter(e.target.value || undefined);
      }}
    >
      {options.map((option) => (
        <option className='font-normal text-xs' value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default ActionsCell;
