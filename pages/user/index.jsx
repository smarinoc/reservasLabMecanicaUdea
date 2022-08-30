/* eslint-disable no-unused-vars */
import { useMutation, useQuery } from '@apollo/client';
import Button from '@components/Button';
import CatalogMachines from '@components/CatalogMachines';
import Schedule from '@components/Schedule';
import { useLayoutContext } from 'context/LayoutContext';
import { CREATE_RESERVE } from 'graphql/mutations/reserve';
import {
  GET_MACHINES_UNIT_BY_SCHEDULE,
  GET_SCHEDULE_AVAILABLE,
} from 'graphql/queries/diary';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [schedule, setShedule] = useState({
    day: '',
    hour: '',
  });
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [machine, setMachine] = useState({});
  const layoutContext = useLayoutContext();
  const { data: session } = useSession();
  const { data: schedules, loading: schedulesLoading } = useQuery(
    GET_SCHEDULE_AVAILABLE,
    {
      fetchPolicy: 'cache-and-network',
    }
  );
  const { data, loading, refetch } = useQuery(GET_MACHINES_UNIT_BY_SCHEDULE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      schedule,
    },
  });

  const { createReserve } = useMutation(CREATE_RESERVE);

  const scheduleData = {
    days: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    hours: [
      '6:00 Am - 8:00 Am',
      '8:00 Am - 10:00 Am',
      '10:00 Am - 12:00 Pm',
      '12:00 Pm - 2:00 pm',
      '2:00 Pm - 4:00 Pm',
      '4:00 Pm - 6:00 Pm',
      '6:00 Pm - 8:00 Pm',
    ],
  };

  useEffect(() => {
    layoutContext.setLoading(loading);
  }, [loading]);

  useEffect(() => {
    const indexes = [];
    if (schedules?.getScheduleAvailable) {
      schedules.getScheduleAvailable.forEach((element) => {
        indexes.push(
          scheduleData.hours.indexOf(element.hour) * scheduleData.days.length +
            scheduleData.days.indexOf(element.day)
        );
      });
    }

    setAvailableSchedules(indexes);
  }, [schedules]);

  const onItemSchedule = (day, hour) => {
    setShedule({
      day,
      hour,
    });
    refetch();
  };

  const onItemMachine = (machineItem) => {
    setMachine(machineItem);
  };

  const onReserve = () => {

    console.log(machine);
    console.log(schedule);
  };

  if (schedulesLoading) return <div>Loading ...</div>;

  return (
    <div className='flex flex-col gap-16 items-center'>
      <Schedule
        schedules={scheduleData}
        onItemSchedule={onItemSchedule}
        available={availableSchedules}
        isReserve
      />
      <CatalogMachines
        isReserve
        machines={data?.getMachinesUnitBySchedule}
        onMachine={onItemMachine}
      />
      <Button onClick={onReserve} text='Reservar' w='w-fit' />
    </div>
  );
};

export default Home;
