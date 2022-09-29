/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Button from '@components/Button';
import ItemRegisterUser from '@components/ItemRegisterUser';
import { CREATE_PROFILES } from 'graphql/mutations/user';
import { toast } from 'react-toastify';

const UserRegistrar = () => {
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [CreateProfiles, { loading, error }] = useMutation(CREATE_PROFILES);
  const addEmail = (e) => {
    e.preventDefault(false);
    setEmail('');
    setEmails([...emails, { email }]);
  };
  const deleteEmail = (index) => {
    const aux = [...emails];
    aux.splice(index, 1);
    setEmails(aux);
  };
  const registerEmails = async () => {
    await CreateProfiles({
      variables: {
        data: emails,
      },
    });
    setEmail('');
    setEmails([]);
    toast.success('Usuarios registrados');
  };
  return (
    <div className='flex flex-col drop-shadow-sm border-2 px-8 w-full gap-5 py-5 bg-white items-center'>
      <form onSubmit={addEmail} className='flex flex-row gap-2 w-full'>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type='email'
          placeholder='Correo...'
          className='w-full px-3 py-2 rounded-lg border-2 border-gray-700 outline-none focus:border-[#26DB84]'
        />
        <Button isSubmit text='Añadir' w='w-[100px]' />
      </form>
      <div className='flex flex-col w-full gap-1'>
        {emails.map((item, index) => (
          <ItemRegisterUser
            email={item.email}
            onClick={() => {
              deleteEmail(index);
            }}
            key={index}
          />
        ))}
      </div>
      <Button
        isSubmit={false}
        onClick={registerEmails}
        text='Habilitar Usuarios'
        className='px-7'
      />
    </div>
  );
};

export default UserRegistrar;
