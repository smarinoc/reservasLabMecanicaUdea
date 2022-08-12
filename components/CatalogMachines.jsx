import { useQuery } from '@apollo/client';
import ItemMachine from '@components/ItemMachine';
import { useLayoutContext } from 'context/LayoutContext';
import { useReserveContext } from 'context/ReserveContext';
import { GET_MACHINE_BY_SCHEDULE } from 'graphql/queries/schedule';
import React, { useEffect } from 'react';

const CatalogMachines = () => {

  const layoutContext = useLayoutContext()
  const reserveContext = useReserveContext()
  const { data, loading } = useQuery(GET_MACHINE_BY_SCHEDULE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      scheduleId: reserveContext.scheduleId,
    },
  });

  useEffect(() => {
    layoutContext.setLoading(loading)
  }, [loading])


  if (loading) return <></>

  return (
    <div className='flex flex-row justify-center flex-wrap 2xl:grid 2xl:grid-cols-5 w-fit mx-auto gap-6 m-12 2xl'>
      {
        data.getMachineBySchedule.map((machine) => (
          <ItemMachine machine={machine}/>
        ))

      }

    </div>
  );
};

export default CatalogMachines;