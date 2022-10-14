import { useQuery } from '@apollo/client';
import DateRangeFilter from '@components/DateRangeFilter';
import SelectFilter from '@components/SelectFilter';
import Table from '@components/Table';
import TextFilter from '@components/TextFilter';
import { GET_RESERVATION_INFO } from 'graphql/queries/reservation';
import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { Skeleton } from '@mui/material';
import { getSession } from 'next-auth/react';
import EnterReservation from '@components/EnterReservation';

const reservationRecords = () => {
  const { data: resData, loading } = useQuery(GET_RESERVATION_INFO, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading)
    return (
      <div className='mx-auto mt-20 w-[1200px]'>
        <Skeleton variant='rounded' height={400} />
      </div>
    );

  const headers = [
    {
      Header: 'Documento Usuario',
      accessor: 'userDocument',
      Filter: TextFilter,
      filter: 'text',
    },
    {
      Header: 'Máquina',
      accessor: 'machineName',
      Filter: TextFilter,
      filter: 'text',
    },
    {
      Header: 'Serial',
      accessor: 'serial',
      Filter: TextFilter,
      filter: 'text',
    },
    {
      Header: 'Horario',
      accessor: 'diary',
      Filter: SelectFilter,
      filter: 'equals',
    },
    {
      Header: 'Fecha',
      accessor: 'date',
      Filter: DateRangeFilter,
      filter: 'betweenDates',
    },
    {
      Header: 'Hora',
      accessor: 'hour',
      Filter: SelectFilter,
      filter: 'equals',
    },
    {
      Header: 'Estado',
      accessor: 'state',
      Filter: SelectFilter,
      filter: 'equals',
    },
  ];

  const data = resData?.getReservationInfo.map((item) => ({
    ...item,
    date: moment(item.date).format('DD/MM/YYYY'),
  }));

  return (
    <div className='mx-auto my-10 flex flex-col gap-10'>
      <EnterReservation />
      <Table headers={headers} data={data} />
    </div>
  );
};

export default reservationRecords;

reservationRecords.auth = {
  role: ['admin'],
};

export const getServerSideProps = async (contex) => {
  const session = await getSession(contex);
  return {
    props: {
      session,
    },
  };
};
