import React, { useState } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

const PickerDate = ({ value, onChange, name, text }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='flex flex-col w-full'>
      <label
        htmlFor={name}
        className='block text-sm font-medium px-1 text-gray-700'
      >
        <span>{text}</span>
      </label>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          value={value}
          className='w-full bg-white'
          onChange={onChange}
          renderInput={({ inputRef, inputProps }) => (
            <input
              onClick={() => {
                setOpen(!open);
              }}
              ref={inputRef}
              {...inputProps}
              className='w-full mt-1 flex rounded-md shadow-sm px-3 py-2 border-2 border-gray-500  outline-none focus:border-[#26DB84]'
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};
export default PickerDate;
