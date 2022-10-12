import React from 'react';

const TextArea = ({
  label,
  register,
  messageError,
  text,
  placeholder,
  defaultValue,
  pattern,
}) => (
  <div className='flex flex-col w-full'>
    <span className='block text-sm font-medium px-1 text-gray-700'>{text}</span>
    <textarea
      rows={5}
      placeholder={placeholder}
      className='w-full mt-1 flex rounded-md shadow-sm px-3 py-2 border-2 border-gray-500 outline-none focus:border-[#26DB84]'
      defaultValue={defaultValue}
      {...register(label, { required: messageError, pattern })}
    />
  </div>
);

export default TextArea;
