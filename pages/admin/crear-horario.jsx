import { useMutation, useQuery } from '@apollo/client';
import FormSchedule from '@components/FormSchedule';
import { CREATE_DIARY } from 'graphql/mutations/diary';
import { GET_MACHINES_AVAILABLE } from 'graphql/queries/machine';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const createSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [machines, setMachines] = useState([]);
  const [name, setName] = useState('');
  const { data, loading, refetch } = useQuery(GET_MACHINES_AVAILABLE, {
    fetchPolicy: 'cache-and-network',
  });
  const [createDiary] = useMutation(CREATE_DIARY);

  const onCreateDiary = async () => {
    let machinesCount = 0;
    await createDiary({
      variables: {
        diary: {
          name,
          schedules,
          machineUnits: machines.map((machine) => {
            machinesCount += machine.count;
            return {
              countAvailable: machine.count,
              machineUnitId: machine.id,
            };
          }),
          machinesCount: String(machinesCount),
        },
      },
    });
    toast.success('Horario creado');
    clearForm();
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
    <FormSchedule
      type='create'
      name={name}
      setName={setName}
      machinesAvailable={data.getMachinesAvailable}
      schedules={schedules}
      setSchedules={setSchedules}
      machines={machines}
      setMachines={setMachines}
      onSubmit={onCreateDiary}
    />
  );
};

export default createSchedule;
