import { useMutation, useQuery } from '@apollo/client';
import DeleteDialog from '@components/DeleteDialog';
import FormSchedule from '@components/FormSchedule';
import { Dialog } from '@mui/material';
import { DELETE_DIARY, UPDATE_DIARY } from 'graphql/mutations/diary';
import { GET_DIARY_BY_ID } from 'graphql/queries/diary';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const diaryDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: diary, loading: loadingGetDiary } = useQuery(GET_DIARY_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id,
    },
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const changeDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };
  const [updateDiary] = useMutation(UPDATE_DIARY);
  const [deleteDiary] = useMutation(DELETE_DIARY);

  if (loadingGetDiary) {
    return <></>;
  }

  const alreadyChosenSchedule = diary.getDiaryById.schedules.map((item) => ({
    id: item.id,
  }));
  const alreadyChosenMachines = diary.getDiaryById.machineUnits.map((item) => ({
    id: item.id,
  }));

  const onDelete = async () => {
    await deleteDiary({
      variables: {
        deleteDiaryId: id,
      },
    });
    toast.success('Horario Eliminado');
    router.push('/admin/horarios');
  };

  const onEditDiary = async (diaryP) => {
    await updateDiary({
      variables: {
        diary: {
          id,
          name: diaryP.name,
          firstDate: diaryP.firstDate,
          lastDate: diaryP.lastDate,
          schedules: diaryP.schedules,
          machineUnits: diaryP.machines.map((item) => ({ id: item.id })),
          machinesCount: String(diaryP.machines.length),
        },
      },
    });
    toast.success('Horario Editado');
    router.push('/admin/horarios');
  };

  return (
    <div>
      <FormSchedule
        type='edit'
        nameP={diary.getDiaryById.name}
        schedulesP={diary.getDiaryById.schedules.map((item) => ({
          id: item.id,
        }))}
        machinesP={diary.getDiaryById.machineUnits}
        onSubmitP={onEditDiary}
        onDeleteP={() => {
          setOpenDeleteDialog(true);
        }}
        firstDateP={diary.getDiaryById.firstDate}
        lastDateP={diary.getDiaryById.lastDate}
        alreadyChosenSchedule={alreadyChosenSchedule}
        alreadyChosenMachines={alreadyChosenMachines}
      />
      <Dialog open={openDeleteDialog} onClose={changeDialog}>
        <DeleteDialog
          onSubmit={onDelete}
          closeDialog={changeDialog}
          question='¿Seguro que quiere eliminar este horario?'
          title='Eliminar'
          textButton='Eliminar'
        />
      </Dialog>
    </div>
  );
};

export default diaryDetails;
