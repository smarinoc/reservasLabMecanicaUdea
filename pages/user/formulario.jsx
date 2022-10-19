import { useMutation, useQuery } from '@apollo/client';
import Button from '@components/Button';
import FormSkeleton from '@components/FormSkeleton';
import Input from '@components/Input';
import SelectInput from '@components/SelectInput';
import { useLayoutContext } from 'context/LayoutContext';
import { REGISTER_USER } from 'graphql/mutations/user';
import { GET_USER_ID } from 'graphql/queries/user';
import useRedirect from 'hooks/useRedirect';
import { getSession, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const form = () => {
  const { data: session } = useSession();
  const [documentType, setDocumentType] = useState('cédula de ciudadania');
  const [userType, setUserType] = useState('estudiante');
  const layoutContext = useLayoutContext();
  const { loading: loadingRouter, push } = useRedirect();
  const { data: profile, loading } = useQuery(GET_USER_ID, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getUserId: session.user.id,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: session.user.email,
      name: session.user.name,
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        document: profile?.getUser.profile.document,
        phoneNumber: profile?.getUser.profile.phoneNumber,
      });
    }
  }, [profile]);

  const [registerUser, { loading: loadingRegisterUser }] =
    useMutation(REGISTER_USER);

  useEffect(() => {
    layoutContext.setLoading(loadingRegisterUser || loadingRouter);
  }, [loadingRegisterUser, loadingRouter]);

  if (loading) {
    return <FormSkeleton />;
  }

  const DocumentTypeOpc = [
    {
      value: 'cédula de ciudadanía',
      label: 'Cédula de ciudadanía',
    },
    {
      value: 'documento de identidad',
      label: 'Documento de identidad',
    },
    {
      value: 'cédula de extranjería',
      label: 'Cédula de extranjería',
    },
  ];
  const userTypeOpc = [
    {
      value: 'estudiante',
      label: 'Estudiante',
    },
    {
      value: 'profesor',
      label: 'Profesor',
    },
    {
      value: 'otro',
      label: 'Otro',
    },
  ];

  const onSubmit = async (data) => {
    try {
      await registerUser({
        variables: {
          data: {
            email: session.user.email,
            documentType,
            document: data.document,
            userType,
            phoneNumber: data.phoneNumber,
          },
        },
      });
      toast.success('Registro exitoso');
      push('/');
    } catch {
      toast.error('Error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col drop-shadow-sm border-2 px-8 w-[876px] mx-auto gap-5 py-10 bg-white items-center my-10'>
        <Input
          disabled
          text='Correo'
          type='email'
          label='email'
          register={register}
        />
        <Input
          disabled
          text='Nombre'
          type='text'
          label='name'
          register={register}
        />
        <SelectInput
          onChange={(e) => {
            setDocumentType(e.target.value);
          }}
          defaultValue={profile?.getUser.profile.documentType}
          options={DocumentTypeOpc}
          text='Tipo de documento'
          name='documentType'
        />
        <Input
          label='document'
          register={register}
          messageError='Ingrese el documento'
          type='text'
          pattern={{
            value: /^[0-9]+$/i,
            message: 'Solo números',
          }}
          text='Documento'
          error={errors.document}
        />
        <SelectInput
          onChange={(e) => {
            setUserType(e.target.value);
          }}
          defaultValue={profile?.getUser.profile.userType}
          options={userTypeOpc}
          text='Rol'
          name='rol'
        />
        <Input
          label='phoneNumber'
          register={register}
          messageError='Ingrese el teléfono'
          placeholder='321233498'
          text='Número de teléfono'
          type='tel'
          pattern={{
            value: /^[0-9]+$/i,
            message: 'Solo números',
          }}
          error={errors.phoneNumber}
        />
        <Button isSubmit text='Registrar' className='w-60 mt-' />
      </div>
    </form>
  );
};

export default form;

form.auth = {
  role: ['user'],
};

form.title = 'Formulario';

export const getServerSideProps = async (contex) => {
  const session = await getSession(contex);
  return {
    props: {
      session,
    },
  };
};
