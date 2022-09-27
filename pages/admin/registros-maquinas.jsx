import { useQuery } from '@apollo/client';
import SelectFilter from '@components/SelectFilter';
import RangeFilter from '@components/RangeFilter';
import Table from '@components/Table';
import TextFilter from '@components/TextFilter';
import { GET_MACHINES_INFO } from 'graphql/queries/machine';
import React from 'react';

const machineRecords = () => {
  const { data: resData, loading } = useQuery(GET_MACHINES_INFO, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const headers = [
    {
      Header: 'Nombre',
      accessor: 'name',
      Filter: TextFilter,
      filter: 'text',
    },
    {
      Header: 'Ubicación',
      accessor: 'location',
      Filter: SelectFilter,
      filter: 'equals',
    },
    {
      Header: 'Serial',
      accessor: 'serial',
      Filter: TextFilter,
      filter: 'text',
    },
    {
      Header: 'Estado',
      accessor: 'state',
      Filter: SelectFilter,
      filter: 'equals',
    },
    {
      Header: 'Reservas hechas',
      accessor: 'reservationCount',
      Filter: RangeFilter,
      filter: 'between',
    },
  ];

  const data = resData?.getMachinesInfo;

  if (!data) {
    <div>Loading....</div>;
  }

  return (
    <div className='mx-auto mt-10'>
      <Table headers={headers} data={data} />
    </div>
  );
};

export default machineRecords;
