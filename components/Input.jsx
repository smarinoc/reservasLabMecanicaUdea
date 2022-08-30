import React from 'react';

const Input = ({
  value,
  onChange,
  placeholder,
  type,
  name,
  text,
  disabled,
}) => (
  <div className='flex flex-col w-full'>
    <label
      htmlFor={name}
      className='block text-sm font-medium px-1 text-gray-700'
    >
      <span>{text}</span>
    </label>
    <input
      type={type}
      className='w-full mt-1 flex rounded-md shadow-sm px-3 py-2 border-2 border-gray-200 outline-none focus:border-[#26DB84]'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={name}
      disabled={disabled}
    />
  </div>
);

export default Input;
