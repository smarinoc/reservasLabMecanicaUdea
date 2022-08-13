import React from 'react';

const TextArea = ({
  text,
  placeholder,
  value,
  name,
  isRequired,
  onChange
}) => (
  <div className='flex flex-col w-full'>
    <label htmlFor={name} className='block text-sm font-medium px-1 text-gray-700'>
      <span>{text}</span>
    </label>
    <textarea
      rows={5}
      placeholder={placeholder}
      className='w-full mt-1 flex rounded-md shadow-sm px-3 py-2 border-2 border-gray-200 outline-none focus:border-[#26DB84]'
      value={value}
      onChange={onChange}
      required={isRequired}
      id={name}
      name={name}
    />
  </div>
);

export default TextArea;
