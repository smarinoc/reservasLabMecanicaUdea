import React from 'react';

const SelectInput = ({ options, onChange, text, name, defaultValue }) => (
  <div className='flex flex-col w-full'>
    <label
      htmlFor={name}
      className='block text-sm font-medium px-1 text-gray-700'
    >
      <span>{text}</span>
    </label>
    <select
      defaultValue={defaultValue}
      className='w-full mt-1 flex rounded-md shadow-sm px-3 py-3 border-2 border-gray-500  outline-none focus:border-[#26DB84] bg-white'
      onChange={onChange}
    >
      {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default SelectInput;
