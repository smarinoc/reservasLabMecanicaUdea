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
