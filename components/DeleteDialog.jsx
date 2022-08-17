import React from 'react';
import Button from 'components/Button';

const DeleteDialog = ({ deleteMachine, closeDialog, title, question, textButton }) => {
  const cancel = () => {
    closeDialog();
  };
  const onDelete = async () => {
    deleteMachine();
    closeDialog();
  };
  return (
    <div className='flex flex-col items-center gap-10 px-20 py-8'>
      <h2 className='text-2xl text-gray-900 font-semibold'>
        {title}
      </h2>
      <span className='text-gray-600 font-semibold text-lg'>
        {question}
      </span>
      <div className='flex flex-row gap-5 w-full justify-center'>
        <Button
          text={textButton}
          onClick={onDelete}
        />
        <Button text='Cancelar' onClick={cancel} />
      </div>
    </div>
  );
};

export default DeleteDialog;
