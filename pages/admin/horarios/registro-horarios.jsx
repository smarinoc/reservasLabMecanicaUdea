import { useMutation, useQuery } from '@apollo/client';
import ActionsCell from '@components/ActionsCell';
import DateRangeFilter from '@components/DateRangeFilter';
import RangeFilter from '@components/RangeFilter';
import SelectFilter from '@components/SelectFilter';
import Table from '@components/Table';
import TextFilter from '@components/TextFilter';
import { CHANGE_DIARY_STATE } from 'graphql/mutations/diary';
import { GET_DIARIES_INFO } from 'graphql/queries/diary';
import { useRouter } from 'next/router';
import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import ButtonCell from '@components/ButtonCell';

const schedules = () => {
  const router = useRouter();

  const { data: resData, loading } = useQuery(GET_DIARIES_INFO, {
    fetchPolicy: 'cache-and-network',
  });

  const [changeDiaryState] = useMutation(CHANGE_DIARY_STATE, {
    refetchQueries: [GET_DIARIES_INFO],
  });

  const onChangeDiaryState = async (data) => {
    await changeDiaryState({
      variables: {
        data: {
          id: data.id,
          state: data.state,
        },
      },
    });
  };

  const onEdit = (id) => {
    router.push(`/admin/horarios/${id}`);
  };
  if (loading) return <div>Loading....</div>;

  const headers = [
    {
      Header: 'Nombre',
      accessor: 'name',
      Filter: TextFilter,
      filter: 'text',
    },
    {
      Header: 'Nro máquinas',
      accessor: 'machinesCount',
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

  if (!data) {
    <div>Loading....</div>;
  }

  return (
    <div className='mx-auto mt-10'>
      <Table headers={headers} data={data} />
    </div>
  );
};

export default schedules;
