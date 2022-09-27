import { useQuery } from '@apollo/client';
import SelectFilter from '@components/SelectFilter';
import Table from '@components/Table';
import TextFilter from '@components/TextFilter';
import { GET_USERS_INFO } from 'graphql/queries/user';
import React from 'react';

const Users = () => {
  const { data: resData, loading } = useQuery(GET_USERS_INFO, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const headers = [
    {
      Header: 'Correo',
      accessor: 'email',
      Filter: TextFilter,
      filter: 'text',
    },
    {
      Header: 'Nombre',
      accessor: 'name',
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
      Header: 'Típo de documento',
      accessor: 'documentType',
      Filter: SelectFilter,
      filter: 'equals',
    },
    {
      Header: 'Documento',
      accessor: 'document',
      Filter: TextFilter,
      filter: 'text',
    },
    {
      Header: 'Tipo',
      accessor: 'userType',
      Filter: SelectFilter,
      filter: 'equals',
    },
    {
      Header: 'Télefono',
      accessor: 'phoneNumber',
      Filter: TextFilter,
      filter: 'text',
    },
  ];

  const data = resData?.getUsersInfo;

  if (!data) {
    <div>Loading....</div>;
  }

  return (
    <div className='mx-auto mt-10'>
      <Table headers={headers} data={data} />
    </div>
  );
};

export default Users;
