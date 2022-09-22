import { useMutation } from '@apollo/client';
import FormSchedule from '@components/FormSchedule';
import { CREATE_DIARY } from 'graphql/mutations/diary';
import React from 'react';
import { toast } from 'react-toastify';

const createSchedule = () => {
  const [createDiary] = useMutation(CREATE_DIARY);

  const onCreateDiary = async (diary) => {
    await createDiary({
      variables: {
        diary: {
          name: diary.name,
          firstDate: diary.firstDate,
          lastDate: diary.lastDate,
          schedules: diary.schedules,
          machineUnits: diary.machines.map((item) => ({ id: item.id })),
          machinesCount: String(diary.machines.length),
        },
      },
    });
    toast.success('Horario creado');
  };

  return <FormSchedule type='create' onSubmitP={onCreateDiary} />;
};

export default createSchedule;
