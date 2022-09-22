import React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

const PickerDate = ({ value, onChange, name, text }) => (
  <div className='flex flex-col w-full'>
    <label
      htmlFor={name}
      className='block text-sm font-medium px-1 text-gray-700'
    >
      <span>{text}</span>
    </label>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        value={value}
        className='w-full'
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  </div>
);

export default PickerDate;
