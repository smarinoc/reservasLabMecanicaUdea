import { useMutation } from '@apollo/client';
import FormSchedule from '@components/FormSchedule';
import { CREATE_DIARY } from 'graphql/mutations/diary';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const createSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [machines, setMachines] = useState([]);
  const [name, setName] = useState('');
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
              count: machine.count,
              id: machine.id,
            };
          }),
          machinesCount: String(machinesCount),
        },
      },
    });
    toast.success('Horario creado');
  };

  return (
    <FormSchedule
      type='create'
      name={name}
      setName={setName}
      schedules={schedules}
      setSchedules={setSchedules}
      machines={machines}
      setMachines={setMachines}
      onSubmit={onCreateDiary}
    />
  );
};

export default createSchedule;
