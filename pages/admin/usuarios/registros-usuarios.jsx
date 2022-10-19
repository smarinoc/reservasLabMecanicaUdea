import { useQuery } from '@apollo/client';
import SelectFilter from '@components/SelectFilter';
import Table from '@components/Table';
import TextFilter from '@components/TextFilter';
import { Skeleton } from '@mui/material';
import { GET_USERS_INFO } from 'graphql/queries/user';
import { getSession } from 'next-auth/react';
import React from 'react';

const UserRecords = () => {
  const { data: resData, loading } = useQuery(GET_USERS_INFO, {
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
      Header: 'Tipo de documento',
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
      Header: 'Teléfono',
      accessor: 'phoneNumber',
      Filter: TextFilter,
      filter: 'text',
    },
  ];

  const data = resData?.getUsersInfo;

  return (
    <div className='mx-auto my-10'>
      <Table headers={headers} data={data} />
    </div>
  );
};

export default UserRecords;

UserRecords.auth = {
  role: ['admin'],
};

UserRecords.title = 'Registros de usuarios';

export const getServerSideProps = async (contex) => {
  const session = await getSession(contex);
  return {
    props: {
      session,
    },
  };
};
