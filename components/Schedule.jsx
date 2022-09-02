import React from 'react';
import ItemSchedule from '@components/ItemSchedule';

const Schedule = ({
  onItemSchedule,
  schedules,
  available,
  isReserve,
  selectScheduleIndexes,
}) => {
  const orderAvailable = available?.sort((a, b) => a - b);
  const orderSelect = selectScheduleIndexes?.sort((a, b) => a - b);
  const itemSchedule = [];
  const sizeDays = schedules.days.length;
  let aux = 0;
  let auxSelect = 0;
  for (let i = 0; i < 42; i += 1) {
    let isSelect = false;
    if (orderSelect[auxSelect] === i) {
      isSelect = true;
      auxSelect += 1;
    }
    let isAvailable = true;
    if (isReserve) {
      isAvailable = false;
      if (orderAvailable[aux] === i) {
        isAvailable = true;
        aux += 1;
      }
    }
    itemSchedule.push(
      <ItemSchedule
        isAvailable={isAvailable}
        isReserve={isReserve}
        isSelectParam={isSelect}
        onClick={() => {
          const day = schedules.days[i % sizeDays];
          const hour = schedules.hours[Math.trunc(i / sizeDays)];
          onItemSchedule(day, hour, i);
        }}
      />
    );
  }
  return (
    <div className='mx-auto grid w-[1200px] h-[800px] grid-rows-8 grid-cols-7 items-end'>
      <div className='col-start-2 col-span-6 grid grid-cols-6'>
        {schedules.days.map((day) => (
          <span className='w-full text-center text-base font-medium text-gray-700 row-span-1 pb-4'>
            {day}
          </span>
        ))}
      </div>
      <div className='col-span-1 row-span-7 grid grid-cols-1 items-center w-full h-full'>
        {schedules.hours.map((hour) => (
          <span className='w-full text-base font-medium text-gray-700'>
            {hour}
          </span>
        ))}
      </div>

      <div className='col-span-6 row-span-7 grid grid-cols-6 gap-1 w-full h-full'>
        {itemSchedule}
      </div>
    </div>
  );
};

export default Schedule;
