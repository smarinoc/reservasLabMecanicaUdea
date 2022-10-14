import { useQuery } from '@apollo/client';
import CatalogMachines from '@components/CatalogMachines';
import CatalogMachinesSkeleton from '@components/CatalogMachinesSkeleton';
import { useLayoutContext } from 'context/LayoutContext';
import { GET_MACHINES } from 'graphql/queries/machine';
import useRedirect from 'hooks/useRedirect';
import { getSession } from 'next-auth/react';
import React, { useEffect } from 'react';

const maquinas = () => {
  const { loading: loadingRouter, push } = useRedirect();
  const layoutContext = useLayoutContext();
  const { data, loading } = useQuery(GET_MACHINES, {
    fetchPolicy: 'cache-and-network',
  });
  useEffect(() => {
    layoutContext.setLoading(loadingRouter);
  }, [loadingRouter]);

  const onMachine = (machine) => {
    push(`/admin/maquinas/${machine.id}`);
  };

  if (loading) return <CatalogMachinesSkeleton />;

  return (
    <div>
      <CatalogMachines
        onMachine={onMachine}
        machines={data.getMachines}
        type='machines'
      />
    </div>
  );
};

export default maquinas;

maquinas.auth = {
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
