import React from 'react';
import ItemSchedule from '@components/ItemSchedule';
import { GET_ALL_SCHEDULES } from 'graphql/queries/diary';
import { useQuery } from '@apollo/client';

const Schedule = ({ onItemSchedule, availableSchedules, isReserve }) => {
  const { data: allSchedules, loading: loadingGetAllSchedules } = useQuery(
    GET_ALL_SCHEDULES,
    {
      fetchPolicy: 'cache-and-network',
    }
  );

  if (loadingGetAllSchedules) {
    return <></>;
  }

  const schedulesHeadsDay = allSchedules.getAllSchedules.reduce((acc, item) => {
    if (!acc.find((element) => item.day === element.day)) {
      acc.push(item);
    }
    return acc;
  }, []);
  const schedulesHeadsHour = allSchedules.getAllSchedules.reduce(
    (acc, item) => {
      if (!acc.find((element) => item.hour === element.hour)) {
        acc.push(item);
      }
      return acc;
    },
    []
  );

  return (
    <div className='mx-auto grid w-[1200px] h-[800px] grid-rows-8 grid-cols-7 items-end'>
      <div className='col-start-2 col-span-6 grid grid-cols-6'>
        {schedulesHeadsDay.map((item) => (
          <span className='w-full text-center text-base font-medium text-gray-700 row-span-1 pb-4'>
            {item.day}
          </span>
        ))}
      </div>
      <div className='col-span-1 row-span-7 grid grid-cols-1 items-center w-full h-full'>
        {schedulesHeadsHour.map((item) => (
          <span className='w-full text-base font-medium text-gray-700'>
            {item.hour}
          </span>
        ))}
      </div>

      <div className='col-span-6 row-span-7 grid grid-cols-6 gap-1 w-full h-full'>
        {allSchedules.getAllSchedules.map((item) => {
          const aux = availableSchedules?.find(
            (element) => item.id === element.id
          );
          return (
            <ItemSchedule
              isReserve={isReserve}
              isAvailable={!!aux || !isReserve}
              onClick={() => {
                onItemSchedule(item);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
