import CatalogMachines from '@components/CatalogMachines';
import { useRouter } from 'next/router';
import React from 'react';

const maquinas = () => {

    const router = useRouter();

    const onMachine = (machine) => {
        router.push(`/admin/maquina/${machine.id}`);
    }
    return (
        <div>
            <CatalogMachines isReserve={false} onMachine={onMachine}/>
        </div>
    );
};

export default maquinas;

maquinas.auth = {
    role: ['admin']
}