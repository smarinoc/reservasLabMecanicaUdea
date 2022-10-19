import { useMutation, useQuery } from '@apollo/client';
import DeleteDialog from '@components/DeleteDialog';
import FormSchedule from '@components/FormSchedule';
import FormSkeleton from '@components/FormSkeleton';
import { Dialog } from '@mui/material';
import { useLayoutContext } from 'context/LayoutContext';
import { DELETE_DIARY, UPDATE_DIARY } from 'graphql/mutations/diary';
import { GET_DIARY_BY_ID } from 'graphql/queries/diary';
import useRedirect from 'hooks/useRedirect';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const diaryDetails = () => {
  const { loading: loadingRouter, router, push } = useRedirect();
  const { id } = router.query;
  const layoutContext = useLayoutContext();
  const { data: diary, loading } = useQuery(GET_DIARY_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id,
    },
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const changeDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };
  const [updateDiary, { loading: loadingUpdate }] = useMutation(UPDATE_DIARY);
  const [deleteDiary, { loading: loadingDelete }] = useMutation(DELETE_DIARY);

  useEffect(() => {
    layoutContext.setLoading(loadingUpdate || loadingDelete || loadingRouter);
  }, [loadingUpdate, loadingDelete, loadingRouter]);

  if (loading) {
    return <FormSkeleton />;
  }

  const alreadyChosenSchedule = diary.getDiaryById.schedules.map((item) => ({
    id: item.id,
  }));
  const alreadyChosenMachines = diary.getDiaryById.machineUnits.map((item) => ({
    id: item.id,
  }));

  const onDelete = async () => {
    try {
      await deleteDiary({
        variables: {
          deleteDiaryId: id,
        },
      });
      toast.success('Horario Eliminado');
      push('/admin/horarios/registro-horarios');
    } catch (e) {
      toast.error('No se puede eliminar, dependencias con reservas');
    }
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
    push('/admin/horarios/registro-horarios');
  };

  return (
    <div>
      <FormSchedule
        type='edit'
        diaryId={id}
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

diaryDetails.auth = {
  role: ['admin'],
};

diaryDetails.title = 'Editar horario';

export const getServerSideProps = async (contex) => {
  const session = await getSession(contex);
  return {
    props: { session },
  };
};
