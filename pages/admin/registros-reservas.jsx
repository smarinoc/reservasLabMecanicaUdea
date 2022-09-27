import { useQuery } from '@apollo/client';
import DateRangeFilter from '@components/DateRangeFilter';
import SelectFilter from '@components/SelectFilter';
import Table from '@components/Table';
import TextFilter from '@components/TextFilter';
import { GET_RESERVATION_INFO } from 'graphql/queries/reservation';
import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

const reservationRecords = () => {
  const { data: resData, loading } = useQuery(GET_RESERVATION_INFO, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

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

  if (!data) {
    <div>Loading....</div>;
  }

  return (
    <div className='mx-auto mt-10'>
      <Table headers={headers} data={data} />
    </div>
  );
};

export default reservationRecords;
