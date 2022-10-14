import React, { useState } from 'react';
import ItemSchedule from '@components/ItemSchedule';
import { GET_ALL_SCHEDULES } from 'graphql/queries/diary';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import 'moment/locale/es';
import FormSkeleton from '@components/FormSkeleton';

const Schedule = ({
  onItemSchedule,
  availableSchedules,
  type,
  alreadyChosen,
}) => {
  const { data: allSchedules, loading } = useQuery(GET_ALL_SCHEDULES, {
    fetchPolicy: 'cache-and-network',
  });
  const [select, setSelect] = useState(null);

  if (loading) {
    return <FormSkeleton />;
  }

  const schedulesHeadsDay = allSchedules?.getAllSchedules.reduce(
    (acc, item) => {
      if (!acc.find((element) => item.day === element.day)) {
        acc.push(item);
      }
      return acc;
    },
    []
  );
  const schedulesHeadsHour = allSchedules?.getAllSchedules.reduce(
    (acc, item) => {
      if (!acc.find((element) => item.hour === element.hour)) {
        acc.push(item);
      }
      return acc;
    },
    []
  );

  return (
    <div className='mx-auto grid w-full xl:w-[1200px] h-[1400px] grid-rows-14 grid-cols-7 items-end'>
      <div className='col-start-2 col-span-6 grid grid-cols-6'>
        {schedulesHeadsDay.map((item, index) => {
          const dayNumber = moment()
            .startOf('week')
            .add(index, 'days')
            .format('D');

          return (
            <span className='w-full text-center text-base font-medium text-gray-700 row-span-1 pb-4'>
              {item.day} {type === 'reserve' ? dayNumber : <></>}
            </span>
          );
        })}
      </div>
      <div className='col-span-1 row-span-13 grid grid-cols-1 items-center w-full h-full'>
        {schedulesHeadsHour.map((item) => (
          <span className='w-full text-base font-medium text-gray-700'>
            {item.hour}
          </span>
        ))}
      </div>

      <div className='col-span-6 row-span-13 grid grid-cols-6 gap-1 w-full h-full'>
        {type === 'formSchedule'
          ? allSchedules.getAllSchedules.map((item) => {
              const found = alreadyChosen?.find(
                (element) => element.id === item.id
              );
              return (
                <ItemSchedule
                  type={type}
                  isAvailable
                  isSelectParam={!!found}
                  onClick={() => {
                    onItemSchedule(item);
                  }}
                />
              );
            })
          : allSchedules.getAllSchedules.map((item, index) => {
              const available = availableSchedules?.find(
                (element) => item.id === element.id
              );
              return (
                <ItemSchedule
                  type={type}
                  isAvailable={available}
                  isSelectParam={item.id === select}
                  onClick={() => {
                    setSelect(item.id);
                    onItemSchedule({ ...item, indexDay: index % 6 });
                  }}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Schedule;
