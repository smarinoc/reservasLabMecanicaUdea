import { useMutation, useQuery } from '@apollo/client';
import SelectFilter from '@components/SelectFilter';
import RangeFilter from '@components/RangeFilter';
import Table from '@components/Table';
import TextFilter from '@components/TextFilter';
import { GET_MACHINES_INFO } from 'graphql/queries/machine';
import React, { useEffect } from 'react';
import ActionsCell from '@components/ActionsCell';
import { CHANGE_MACHINE_UNIT_STATE } from 'graphql/mutations/machine';
import { useLayoutContext } from 'context/LayoutContext';
import { Skeleton } from '@mui/material';
import { getSession } from 'next-auth/react';

const machineRecords = () => {
  const layoutContext = useLayoutContext();
  const { data: resData, loading } = useQuery(GET_MACHINES_INFO, {
    fetchPolicy: 'cache-and-network',
  });

  const [changeMachineUnitState, { loading: loadingChange }] = useMutation(
    CHANGE_MACHINE_UNIT_STATE
  );

  useEffect(() => {
    layoutContext.setLoading(loadingChange);
  }, [loadingChange]);

  if (loading)
    return (
      <div className='mx-auto mt-20 w-[1200px]'>
        <Skeleton variant='rounded' height={400} />
      </div>
    );

  const onChangeMachineUnitState = async (data) => {
    await changeMachineUnitState({
      variables: {
        data: {
          id: data.id,
          state: data.state,
        },
      },
    });
  };

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
      Header: 'Reservas hechas',
      accessor: 'reservationCount',
      Filter: RangeFilter,
      filter: 'between',
    },
    {
      Header: 'Estado',
      accessor: 'state',
      Filter: SelectFilter,
      filter: 'equals',
      Cell: ActionsCell,
      options: ['habilitada', 'mantenimiento', 'inhabilitada'],
      onsubmit: onChangeMachineUnitState,
    },
  ];

  const data = resData?.getMachinesInfo;

  return (
    <div className='mx-auto my-10'>
      <Table headers={headers} data={data} />
    </div>
  );
};

export default machineRecords;

machineRecords.auth = {
  role: ['admin'],
};

machineRecords.title = 'Registros de máquinas';

export const getServerSideProps = async (contex) => {
  const session = await getSession(contex);
  return {
    props: {
      session,
    },
  };
};
