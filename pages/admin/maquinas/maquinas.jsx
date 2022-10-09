import { useQuery } from '@apollo/client';
import CatalogMachines from '@components/CatalogMachines';
import CatalogMachinesSkeleton from '@components/CatalogMachinesSkeleton';
import { GET_MACHINES } from 'graphql/queries/machine';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const maquinas = () => {
  const router = useRouter();

  const { data, loading } = useQuery(GET_MACHINES, {
    fetchPolicy: 'cache-and-network',
  });

  const onMachine = (machine) => {
    router.push(`/admin/maquinas/${machine.id}`);
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
