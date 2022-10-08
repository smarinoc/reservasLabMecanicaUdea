import { useMutation } from '@apollo/client';
import FormSchedule from '@components/FormSchedule';
import { useLayoutContext } from 'context/LayoutContext';
import { CREATE_DIARY } from 'graphql/mutations/diary';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const createSchedule = () => {
  const layoutContext = useLayoutContext();
  const [createDiary, { loading }] = useMutation(CREATE_DIARY);

  useEffect(() => {
    layoutContext.setLoading(loading);
  }, [loading]);

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
