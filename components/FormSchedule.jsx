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
  const {
    data: machinesAvailable,
    loading,
    refetch,
  } = useQuery(GET_MACHINES_AVAILABLE, {
    fetchPolicy: 'cache-and-network',
  });

  const onItemSchedule = (scheduleSelect) => {
    const index = schedules.findIndex(
      (element) => element === scheduleSelect.id
    );
    if (index === -1) {
      setSchedules([...schedules, { id: scheduleSelect.id }]);
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

  const clearForm = () => {
    setName('');
    setSchedules([]);
    setMachines([]);
    refetch();
  };

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
      <Schedule onItemSchedule={onItemSchedule} isReserve={false} />
      <CatalogMachines
        isReserve
        machines={machinesAvailable.getMachinesAvailable}
        onMachine={onItemMachine}
      />
      {type === 'create' ? (
        <Button
          onClick={() => {
            onSubmit();
            clearForm();
          }}
          w='w-fit'
          text='Crear'
        />
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
