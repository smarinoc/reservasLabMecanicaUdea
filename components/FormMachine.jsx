/* eslint-disable react/no-array-index-key */
import { useLayoutContext } from 'context/LayoutContext';
import React, { useEffect, useState } from 'react';
import { BsDiamondFill } from 'react-icons/bs';
import Button from '@components/Button';
import Input from '@components/Input';
import InputMachineUnit from '@components/InputMachineUnit';
import TextArea from '@components/TextArea';
import UploadImage from '@components/UploadImage';
import BsXlgButton from '@components/BsXlgButton';

const FormMachine = ({ machine, onSubmit, onDelete, loading }) => {
  const [name, setName] = useState(machine?.name || '');
  const [description, setDescription] = useState(machine?.description || '');
  const [recommendation, setRecommendation] = useState('');
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
  const [disabledButton, setDisabledButton] = useState(false);
  const layoutContext = useLayoutContext();

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

  useEffect(() => {
    layoutContext.setLoading(loading);
    setDisabledButton(loading);
  }, [loading]);

  const onSubmitRecommendation = (e) => {
    e.preventDefault(false);
    setRecommendation('');
    setRecommendations([...recommendations, recommendation]);
  };

  const onCancelRecommendation = (index) => {
    const aux = [...recommendations];
    aux.splice(index, 1);
    setRecommendations(aux);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setImage('');
    setAmount(1);
    setRecommendation('');
    setRecommendations([]);
    setMachineUnits([
      {
        location: '',
        serial: '',
      },
    ]);
  };

  const onUploadImage = async () => {
    const formData = new FormData();
    formData.append('upload_preset', 'in2dm1xw');
    formData.append('folder', 'Image');
    formData.append('file', image[0].file);
    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/daef66ohy/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!res.ok) return 'no';

      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      return 'no';
    }
  };

  return (
    <div className='flex flex-col drop-shadow-sm border-2 px-8 w-[876px] mx-auto gap-8 py-3 bg-white items-center my-10'>
      <div className='flex w-full flex-col gap-5 border-2 items-center px-8 py-3'>
        <UploadImage image={image} setImage={setImage} />
        <Input
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          text='Nombre'
          type='text'
        />
        <TextArea
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          text='Descripción'
        />
        <div className='w-full flex flex-col gap-1'>
          <form
            className='w-full flex flex-row gap-2 items-end'
            onSubmit={onSubmitRecommendation}
          >
            <Input
              name='recommendation'
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              text='Añadir recomendación'
              type='text'
            />
            <Button isSubmit text='Añadir' w='w-[100px]' />
          </form>
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
          name='amount'
          value={amount}
          onChange={(e) => {
            changeAmount(e.target.value);
            setAmount(e.target.value);
          }}
          text='Cantidad'
          type='number'
        />
        <div className='flex w-full flex-col gap-1 items-center'>
          {machineUnits.map((item) => (
            <div className='w-full'>
              <InputMachineUnit unit={item} />
            </div>
          ))}
        </div>
      </div>
      <div
        className={`flex w-full ${
          onDelete ? 'flex-row justify-around' : 'justify-end'
        }`}
      >
        <Button
          text={machine ? 'Editar máquina' : 'Crear máquina'}
          disabled={disabledButton}
          onClick={async () => {
            const url = image[0].file ? await onUploadImage() : machine.image;
            await onSubmit({
              id: machine?.id,
              name,
              image: url,
              description,
              recommendations,
              amount: parseInt(amount, 10),
              machineUnits,
            });
            resetForm();
          }}
        />
        {onDelete ? (
          <Button
            text='Eliminar máquina'
            onClick={() => onDelete(machine)}
            disabled={disabledButton}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FormMachine;
