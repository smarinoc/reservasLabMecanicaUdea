import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import Button from '@components/Button';
import ItemRegisterUser from '@components/ItemRegisterUser';
import { CREATE_PROFILES } from 'graphql/mutations/user';
import { toast } from 'react-toastify';
import { useLayoutContext } from 'context/LayoutContext';
import { GET_USERS_INFO_TABLE_ADMIN } from 'graphql/queries/user';
import { useForm } from 'react-hook-form';

const UserRegistrar = () => {
  const [emails, setEmails] = useState([]);
  const layoutContext = useLayoutContext();
  const [CreateProfiles, { loading }] = useMutation(CREATE_PROFILES, {
    refetchQueries: [GET_USERS_INFO_TABLE_ADMIN],
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    layoutContext.setLoading(loading);
  }, [loading]);
  const addEmail = (data) => {
    setEmails([...emails, { email: data.email }]);
    reset();
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
    reset();
    setEmails([]);
    toast.success('Usuarios registrados');
  };
  return (
    <div className='flex flex-col drop-shadow-sm border-2 px-8 w-full gap-5 py-5 bg-white items-center'>
      <span className='text-xl font-semibold mx-auto text-gray-700'>
        Solo correos asociados a Google
      </span>
      <form
        onSubmit={handleSubmit(addEmail)}
        className='flex flex-row gap-2 w-full'
      >
        <input
          {...register('email', {
            required: true,
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Ingrese un correo electrónico válido',
            },
          })}
          placeholder='Correo...'
          className='w-full px-3 py-2 rounded-lg border-2 border-gray-700 outline-none focus:border-[#26DB84]'
        />
        <Button isSubmit text='Añadir' w='w-[100px]' />
      </form>
      <span className='text-red-700'>
        {errors.email && errors.email.message}
      </span>
      <div className='flex flex-col w-full gap-1'>
        {emails.map((item, index) => (
          <ItemRegisterUser
            email={item.email}
            onClick={() => {
              deleteEmail(index);
            }}
          />
        ))}
      </div>
      <Button
        isSubmit={false}
        onClick={registerEmails}
        text='Habilitar correos'
        className='px-7'
      />
    </div>
  );
};

export default UserRegistrar;
