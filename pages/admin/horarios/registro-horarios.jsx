import { useMutation, useQuery } from '@apollo/client';
import ActionsCell from '@components/ActionsCell';
import DateRangeFilter from '@components/DateRangeFilter';
import RangeFilter from '@components/RangeFilter';
import SelectFilter from '@components/SelectFilter';
import Table from '@components/Table';
import TextFilter from '@components/TextFilter';
import { CHANGE_DIARY_STATE } from 'graphql/mutations/diary';
import { GET_DIARIES_INFO } from 'graphql/queries/diary';
import React, { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import ButtonCell from '@components/ButtonCell';
import { useLayoutContext } from 'context/LayoutContext';
import { Skeleton } from '@mui/material';
import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import useRedirect from 'hooks/useRedirect';

const scheduleRecords = () => {
  const { loading: loadingRouter, push } = useRedirect();
  const layoutContext = useLayoutContext();

  const { data: resData, loading } = useQuery(GET_DIARIES_INFO, {
    fetchPolicy: 'cache-and-network',
  });

  const [changeDiaryState, { loading: loadingChange }] =
    useMutation(CHANGE_DIARY_STATE);

  useEffect(() => {
    layoutContext.setLoading(loadingChange || loadingRouter);
  }, [loadingChange, loadingRouter]);

  const onChangeDiaryState = async (data) => {
    try {
      await changeDiaryState({
        variables: {
          data: {
            id: data.id,
            state: data.state,
          },
        },
      });
    } catch (e) {
      toast.error('No se puede habilitar el horario, conflicto de horarios');
    }
  };

  const onEdit = (id) => {
    push(`/admin/horarios/${id}`);
  };
  if (loading)
    return (
      <div className='mx-auto mt-20 w-[1200px]'>
        <Skeleton variant='rounded' height={400} />
      </div>
    );

  const headers = [
    {
      Header: 'Nombre',
      accessor: 'name',
      Filter: TextFilter,
      filter: 'text',
    },
    {
      Header: 'Nro. máquinas',
      accessor: 'machinesCount',
      Filter: RangeFilter,
      filter: 'between',
    },
    {
      Header: 'Nro. reservas',
      accessor: 'reservationCount',
      Filter: RangeFilter,
      filter: 'between',
    },
    {
      Header: 'Fecha de inicio',
      accessor: 'firstDate',
      Filter: DateRangeFilter,
      filter: 'betweenDates',
    },
    {
      Header: 'Fecha de finalización',
      accessor: 'lastDate',
      Filter: DateRangeFilter,
      filter: 'betweenDates',
    },
    {
      Header: 'Estado',
      accessor: 'state',
      Filter: SelectFilter,
      filter: 'equals',
      Cell: ActionsCell,
      options: ['habilitado', 'finalizado', 'inhabilitado'],
      onsubmit: onChangeDiaryState,
    },
    {
      Header: 'Acciones',
      accessor: 'actions',
      Cell: ButtonCell,
      onsubmit: onEdit,
    },
  ];

  const data = resData?.getDiariesInfo.map((item) => ({
    ...item,
    firstDate: moment(item.firstDate).format('DD/MM/YYYY'),
    lastDate: moment(item.lastDate).format('DD/MM/YYYY'),
  }));

  return (
    <div className='mx-auto my-10'>
      <Table headers={headers} data={data} />
    </div>
  );
};

export default scheduleRecords;

scheduleRecords.auth = {
  role: ['admin'],
};

scheduleRecords.title = 'Registros de horarios';

export const getServerSideProps = async (contex) => {
  const session = await getSession(contex);
  return {
    props: {
      session,
    },
  };
};
