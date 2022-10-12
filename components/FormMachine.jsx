/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { BsDiamondFill } from 'react-icons/bs';
import Button from '@components/Button';
import Input from '@components/Input';
import InputMachineUnit from '@components/InputMachineUnit';
import TextArea from '@components/TextArea';
import UploadImage from '@components/UploadImage';
import BsXlgButton from '@components/BsXlgButton';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const FormMachine = ({ machine, onSubmit, onDelete }) => {
  const [recommendations, setRecommendations] = useState(
    machine?.recommendations || []
  );
  const [amount, setAmount] = useState(machine?.amount || 1);
  const [image, setImage] = useState(machine?.image || []);
  const [machineUnits, setMachineUnits] = useState(
    machine?.machineUnits.map((item) => ({
      location: item.location,
      serial: item.serial,
    })) || [
      {
        location: '',
        serial: '',
      },
    ]
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: machine?.name || '',
      description: machine?.description || '',
      amount: machine?.amount || 1,
    },
  });

  const {
    register: registerRecommendation,
    handleSubmit: handleSubmitRecommendation,
    setValue,
  } = useForm();

  const changeAmount = (newAmount) => {
    const gap = newAmount - amount;

    if (gap > 0) {
      const repeat = Array(gap)
        .fill([{ location: '', serial: '' }])
        .flat();
      setMachineUnits([...machineUnits, ...repeat]);
    } else if (gap < 0) {
      const aux = [...machineUnits];
      aux.splice(newAmount);
      setMachineUnits(aux);
    }
  };

  const onSubmitRecommendation = (data) => {
    setValue('recommendation', '');
    setRecommendations([...recommendations, data.recommendation]);
  };

  const onCancelRecommendation = (index) => {
    const aux = [...recommendations];
    aux.splice(index, 1);
    setRecommendations(aux);
  };

  const validate = () => {
    let valid = true;
    machineUnits.forEach((item) => {
      if (item.location === '' || item.serial === '') valid = false;
    });

    if (valid === false) {
      toast.error('Ingrese todos los campos de ubicación y serial');
    }

    if (!image[0]?.file && !image) {
      valid = false;
      toast.error('Seleccione una foto');
    }
    return valid;
  };

  const resetForm = () => {
    reset();
    setImage('');
    setRecommendations([]);
    setMachineUnits([
      {
        location: '',
        serial: '',
      },
    ]);
  };

  return (
    <div className='flex flex-col drop-shadow-sm border-2 px-8 w-[876px] mx-auto gap-8 py-3 bg-white items-center my-10'>
      <form
        className='w-full'
        onSubmit={handleSubmit(async (data) => {
          if (validate()) {
            await onSubmit({
              id: machine?.id,
              name: data.name,
              image: image[0]?.file || image,
              description: data.description,
              recommendations,
              amount: parseInt(data.amount, 10),
              machineUnits,
            });
            resetForm();
          }
        })}
      >
        <div className='flex w-full flex-col gap-5 items-center px-8 py-3'>
          <UploadImage image={image} setImage={setImage} />
          <Input
            text='Nombre'
            type='text'
            label='name'
            register={register}
            messageError='Ingrese un nombre'
            error={errors.name}
          />
          <TextArea
            text='Descripción'
            label='description'
            register={register}
          />
          <div className='w-full flex flex-col gap-1'>
            <div className='w-full flex flex-row gap-2 items-end'>
              <Input
                label='recommendation'
                register={registerRecommendation}
                name='recommendation'
                text='Añadir recomendación'
                type='text'
                messageError='...'
              />
              <Button
                onClick={handleSubmitRecommendation(onSubmitRecommendation)}
                text='Añadir'
                w='w-[100px]'
              />
            </div>
            <ul className={recommendations.length > 0 ? 'border-2' : ''}>
              {recommendations.map((item, index) => (
                <li className='flex flex-row items-center w-full pr-8 my-2'>
                  <BsDiamondFill color='#00F47F' className='ml-2' />
                  <div
                    className='text-black px-3 font-medium whitespace-normal w-full'
                    key={index}
                  >
                    {item}
                  </div>
                  <BsXlgButton
                    onClick={() => {
                      onCancelRecommendation(index);
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
          <Input
            label='amount'
            register={register}
            text='Cantidad'
            messageError='Ingrese una cantidad'
            error={errors.amount}
            pattern={{
              value: /^[1-9]+$/i,
              message: 'Solo números mayores de 0',
            }}
            onChange={(e) => {
              changeAmount(e.target.value);
              setAmount(e.target.value);
            }}
          />
          <div className='flex w-full flex-col gap-1 items-center'>
            {machineUnits.map((item) => (
              <div className='w-full'>
                <InputMachineUnit unit={item} />
              </div>
            ))}
          </div>
        </div>
        <div className='flex w-full flex-row justify-around'>
          {onDelete ? (
            <Button
              text='Eliminar'
              className='w-60'
              onClick={() => onDelete(machine)}
            />
          ) : (
            <></>
          )}
          <Button
            text={machine ? 'Editar' : 'Crear'}
            className='w-60'
            isSubmit
          />
        </div>
      </form>
    </div>
  );
};

export default FormMachine;
