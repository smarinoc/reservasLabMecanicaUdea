import React, { useEffect, useMemo, useState } from 'react';
import BasicFilter from '@components/BasicFilter';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/locale/es';

const DateRangeFilter = (props) => {
  const {
    column: {
      filterValue = [],
      setFilter,
      Header,
      isSortedDesc,
      toggleSortBy,
      preFilteredRows,
      id,
    },
  } = props;

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const min = useMemo(() => {
    let minV = moment().format('YYYY-MM-DD');
    preFilteredRows.forEach((row) => {
      const date = moment(row.values[id], 'DD/MM/YYYY').format('YYYY-MM-DD');
      if (moment(date).isBefore(minV)) {
        minV = date;
      }
    });
    return minV;
  }, [id, preFilteredRows]);

  useEffect(() => {
    setFilter((old = []) => [moment(min), old[1]]);
    console.log('yyyy')
  }, []);

  return (
    <BasicFilter
      isSortedDesc={isSortedDesc}
      toggleSortBy={toggleSortBy}
      Header={Header}
    >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <div className='flex flex-row gap-1 w-[180px] items-center'>
          <DatePicker
            open={open1}
            onClose={() => {
              setOpen1(false);
            }}
            value={filterValue[0]}
            className='w-full text-white bg-white px-1'
            onChange={(e) => {
              setFilter((old = []) => [e, old[1]]);
            }}
            renderInput={({ inputRef, inputProps }) => (
              <input
                ref={inputRef}
                {...inputProps}
                onClick={() => {
                  setOpen1(!open1);
                }}
                className='rounded-md px-1 py-2 border-2 border-gray-200 outline-none focus:border-[#26DB84] font-normal text-xs w-full'
              />
            )}
          />
          <span className='font-normal text-xs text-white'>Al</span>
          <DatePicker
            open={open2}
            onClose={() => {
              setOpen2(false);
            }}
            value={filterValue[1]}
            className='w-full bg-white'
            onChange={(e) => {
              setFilter((old = []) => [old[0], e]);
            }}
            renderInput={({ inputRef, inputProps }) => (
              <input
                onClick={() => {
                  setOpen2(!open2);
                }}
                ref={inputRef}
                {...inputProps}
                className='rounded-md px-1 py-2 border-2 border-gray-200 outline-none focus:border-[#26DB84] font-normal text-xs w-full'
              />
            )}
          />
        </div>
      </LocalizationProvider>
    </BasicFilter>
  );
};

export default DateRangeFilter;
