import React from 'react';

const Input = ({
  label,
  register,
  messageError,
  text,
  placeholder,
  type,
  disabled,
  error,
  pattern,
  onChange,
  min,
}) => (
  <div className='flex flex-col w-full'>
    <span className='block text-sm font-medium px-1 text-gray-700'>{text}</span>
    <input
      type={type}
      className='w-full mt-1 flex rounded-md shadow-sm px-3 py-2 border-2 border-gray-500  outline-none focus:border-[#26DB84]'
      placeholder={placeholder}
      disabled={disabled}
      {...register(label, { required: messageError, pattern, min })}
      onChange={onChange}
      min={min}
    />
    <span className='text-red-700'>{error && error.message}</span>
  </div>
);

export default Input;
