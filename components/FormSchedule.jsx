import React from 'react';
import Button from 'components/Button';
import CatalogMachines from 'components/CatalogMachines';
import Input from 'components/Input';
import Schedule from 'components/Schedule';
import { GET_MACHINES_AVAILABLE } from 'graphql/queries/machine';
import { useQuery } from '@apollo/client';

const FormSchedule = ({
  type,
  schedules,
  setSchedules,
  machines,
  setMachines,
  name,
  setName,
  onSubmit,
  onDelete,
}) => {
  const { data: machinesAvailable, loading } = useQuery(
    GET_MACHINES_AVAILABLE,
    {
      fetchPolicy: 'cache-and-network',
    }
  );
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
  const onItemSchedule = (day, hour) => {
    const index = schedules.findIndex(
      (element) => element.day === day && element.hour === hour
    );
    if (index === -1) {
      setSchedules([...schedules, { day, hour }]);
    } else {
      const aux = [...schedules];
      aux.splice(index, 1);
      setSchedules(aux);
    }
  };
  const onItemMachine = (machine) => {
    const index = machines.findIndex((element) => element.id === machine.id);
    if (index === -1) {
      setMachines([...machines, machine]);
    } else {
      const aux = [...machines];
      aux.splice(index, 1);
      setMachines(aux);
    }
  };

  const indexes = [];
  if (schedules) {
    schedules.forEach((element) => {
      indexes.push(
        scheduleData.hours.indexOf(element.hour) * scheduleData.days.length +
          scheduleData.days.indexOf(element.day)
      );
    });
  }

  if (loading) {
    return <></>;
  }

  return (
    <div className='flex flex-col gap-10 p-12 items-center w-fit mx-auto'>
      <Input
        name='name'
        placeholder='Horario 1'
        text='Nombre'
        type='text'
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Schedule
        onItemSchedule={onItemSchedule}
        schedules={scheduleData}
        isReserve={false}
        selectScheduleIndexes={indexes}
      />
      <CatalogMachines
        isReserve
        machines={[...machines, ...machinesAvailable.getMachinesAvailable]}
        onMachine={onItemMachine}
      />
      {type === 'create' ? (
        <Button onClick={onSubmit} w='w-fit' text='Crear' />
      ) : (
        <div className='flex flex-row w-full justify-around'>
          <Button onClick={onSubmit} w='w-fit' text='Crear' />
          <Button onClick={onDelete} w='w-fit' text='Eliminar' />
        </div>
      )}
    </div>
  );
};

export default FormSchedule;
