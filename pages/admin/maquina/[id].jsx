import { useMutation, useQuery } from '@apollo/client';
import DeleteDialog from '@components/DeleteDialog';
import FormMachine from '@components/FormMachine';
import { Dialog } from '@mui/material';
import { DELETE_MACHINE, UPDATE_MACHINE } from 'graphql/mutations/machine';
import { GET_MACHINE_BY_ID } from 'graphql/queries/machine';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const machineDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data, loading } = useQuery(GET_MACHINE_BY_ID, {
        fetchPolicy: 'cache-and-network',
        variables: {
            id
        },
    })
    const [updateMachine] = useMutation(UPDATE_MACHINE)
    const [deleteMachine] = useMutation(DELETE_MACHINE)
    const onUpdate = async (machine) => {
        await updateMachine({
            variables: {
                machine: {
                    ...machine,
                    machineUnits: machine.machineUnits.map((item) => ({ location: item.location, count: item.count }))
                }
            }
        })
        toast.success('Máquina editada');
        router.push("/admin/maquinas");
    }

    const onDelete = (machine) => {
        setMachine(machine)
        setOpenDeleteDialog(true)
    }

    const onDeleteMachine = async () => {
        await deleteMachine({
            variables: {
                id: machine.id
            }
        })
        toast.success('Máquina Eliminada');
        router.push("/admin/maquinas");
    }

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [machine, setMachine] = useState()
    const changeDialog = () => {
        setOpenDeleteDialog(!openDeleteDialog)
    }

    if (loading) return <div>Loading....</div>
    return (
        <div>
            <FormMachine machine={data.getMachineByID} onSubmit={onUpdate} onDelete={onDelete} loading={false} />
            <Dialog open={openDeleteDialog} onClose={changeDialog}>
                <DeleteDialog deleteMachine={onDeleteMachine} closeDialog={changeDialog} question="¿Seguro que quiere eliminar esta máquina?" title="Eliminar" textButton="Eliminar" />
            </Dialog>
        </div>
    );
};

export default machineDetails;

machineDetails.auth = {
    role: ['admin']
}