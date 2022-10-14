import React from 'react';
import Button from 'components/Button';
import InfoReserveDialog from 'components/InfoReserveDialog';

const ConfirmReserveDialog = ({ crearReserve, closeDialog, data }) => {
  const cancel = () => {
    closeDialog();
  };
  const onConfirm = async () => {
    crearReserve();
    closeDialog();
  };
  return (
    <div className='flex flex-col items-center gap-10 px-10 py-8'>
      <h2 className='text-2xl text-gray-900 font-semibold'>
        Confirmar reserva
      </h2>

      <div className='flex flex-col items-center w-full'>
        <InfoReserveDialog label='Nombre de la máquina' text={data.name} />
        <InfoReserveDialog label='Ubicación' text={data.location} />
        <InfoReserveDialog label='Día' text={data.day} />
        <InfoReserveDialog label='Hora' text={data.hour} />
        <InfoReserveDialog
          label='Nombre de quien reserva'
          text={data.userName}
        />
        <InfoReserveDialog label='Documento' text={data.userDocument} />
      </div>
      <div className='flex flex-row gap-5 w-full justify-center'>
        <Button text='Confirmar' onClick={onConfirm} />
        <Button text='Cancelar' onClick={cancel} />
      </div>
    </div>
  );
};

export default ConfirmReserveDialog;
