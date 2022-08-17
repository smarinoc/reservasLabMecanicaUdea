import { useQuery } from '@apollo/client';
import ItemMachine from '@components/ItemMachine';
import { useLayoutContext } from 'context/LayoutContext';
import { useReserveContext } from 'context/ReserveContext';
import { GET_MACHINES } from 'graphql/queries/machine';
import { GET_MACHINE_BY_SCHEDULE } from 'graphql/queries/schedule';
import React, { useEffect } from 'react';

const CatalogMachines = ({ isReserve, onMachine }) => {

  const layoutContext = useLayoutContext()
  const query = isReserve ? GET_MACHINE_BY_SCHEDULE : GET_MACHINES
  const reserveContext = useReserveContext()
  const { data, loading } = useQuery(query, {
    fetchPolicy: 'cache-and-network',
    variables: {
      scheduleId: reserveContext.scheduleId,
    },
  });

  useEffect(() => {
    layoutContext.setLoading(loading)
  }, [loading])

  if (loading) return <></>

  const machines = isReserve ? data.getMachineBySchedule : data.getMachines

  return (
    <div className='flex flex-row justify-center flex-wrap 2xl:grid 2xl:grid-cols-5 w-fit mx-auto gap-6 m-12 2xl'>
      {
        machines.map((machine) => (
          <ItemMachine machine={machine} isReserve={isReserve} onClick={() => { onMachine(machine) }} />
        ))
      }
    </div>
  );
};

export default CatalogMachines;