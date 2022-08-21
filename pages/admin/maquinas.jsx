import { useQuery } from '@apollo/client';
import CatalogMachines from '@components/CatalogMachines';
import { GET_MACHINES } from 'graphql/queries/machine';
import { useRouter } from 'next/router';
import React from 'react';

const maquinas = () => {

    const router = useRouter();

    const { data, loading } = useQuery(GET_MACHINES, {
        fetchPolicy: 'cache-and-network'
      });

    const onMachine = (machine) => {
        router.push(`/admin/maquina/${machine.id}`);
    }

    if(loading) return <div>Loading....</div>


    return (
        <div>
            <CatalogMachines onMachine={onMachine} machines={data.getMachines}/>
        </div>
    );
};

export default maquinas;

maquinas.auth = {
    role: ['admin']
}