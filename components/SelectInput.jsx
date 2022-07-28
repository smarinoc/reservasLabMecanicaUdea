import React from 'react';
import Select from 'react-select';

const SelectInput = ({ options, onChange, text, name }) => (
  <div className='flex flex-col w-full px-3'>
    <label htmlFor={name} className='block text-sm font-medium px-1 text-gray-700'>
      <span>{text}</span>
    </label>
    <Select
      className='w-full mt-1 block rounded-md shadow-sm px-1 py-1 border-2 border-gray-200 outline-none focus:border-[#26DB84]'
      options={options}
      onChange={onChange}
    />
  </div>
);


export default SelectInput;
