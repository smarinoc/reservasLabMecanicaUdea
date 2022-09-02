import { useQuery } from '@apollo/client';
import FormSchedule from '@components/FormSchedule';
import { GET_DIARY_BY_ID } from 'graphql/queries/diary';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const diaryDetails = () => {
  const [name, setName] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [machines, setMachines] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const { data: diary, loading: loadingGetDiary } = useQuery(GET_DIARY_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id,
    },
  });
  useEffect(() => {
    console.log(diary);
    if (diary) {
      setMachines(diary.getDiaryById.machineUnits);
      setSchedules(diary.getDiaryById.schedules);
      setName(diary.getDiaryById.name);
      setSchedules(diary.getDiaryById.schedules);
      setMachines(diary.getDiaryById.machineUnits);
    }
  }, [diary]);

  if (loadingGetDiary) {
    return <></>;
  }
  return (
    <FormSchedule
      type='edit'
      name={name}
      setName={setName}
      schedules={schedules}
      setSchedules={setSchedules}
      machines={machines}
      setMachines={setMachines}
      onSubmit={{}}
      onDelete={{}}
    />
  );
};

export default diaryDetails;
