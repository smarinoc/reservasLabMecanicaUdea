import Image from 'next/image';
import React, { useState } from 'react';
import Button from '@components/Button';
import { Dialog } from '@mui/material';
import DeleteDialog from 'components/DeleteDialog';
import moment from 'moment';
import 'moment/locale/es';

const ReservationItem = ({ reservation, onClick, type }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const changeDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };
  return (
    <div className='flex flex-row gap-8 bg-white rounded-md p-5 shadow-md'>
      <Image
        src={reservation.machineUnit.machine.image}
        alt='no'
        width={250}
        height={150}
        className='rounded-t-md'
      />

      <div className='flex flex-col gap-3'>
        <span className='text-start w-full text-base font-medium text-gray-700'>
          Máquina: {reservation.machineUnit.machine.name}
        </span>
        <span className='text-start w-full text-base font-medium text-gray-700'>
          Ubicación: {reservation.machineUnit.location}
        </span>
        <span className='text-start w-full text-base font-medium text-gray-700'>
          Serial: {reservation.machineUnit.serial}
        </span>
        <span className='text-start w-full text-base font-medium text-gray-700'>
          Día: {moment(reservation.date).format('DD/MM/YYYY')}
        </span>
        <span className='text-start w-full text-base font-medium text-gray-700'>
          Hora: {reservation.schedule.hour}
        </span>
        <span className='text-start w-full text-base font-medium text-gray-700'>
          Nombre: {reservation.user.name}
        </span>
        <span className='text-start w-full text-base font-medium text-gray-700'>
          Documento: {reservation.user.profile?.document}
        </span>
      </div>
      {type === 'myReservations' ? (
        <div className='my-auto'>
          <Button text='Cancelar' onClick={changeDialog} />

          <Dialog open={openDeleteDialog} onClose={changeDialog}>
            <DeleteDialog
              onSubmit={() => {
                onClick({
                  id: reservation.id,
                  machineUnitId: reservation.machineUnit.id,
                  scheduleId: reservation.schedule.id,
                });
              }}
              question='Seguro que quiere cancelar la reserva'
              textButton='Cancelar reserva'
              title='Cancelar'
              closeDialog={changeDialog}
            />
          </Dialog>
        </div>
      ) : (
        <div className='my-auto'>
          <Button text='Registrar' onClick={onClick} />
        </div>
      )}
    </div>
  );
};
export default ReservationItem;
