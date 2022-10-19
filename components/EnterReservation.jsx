import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_RESERVATION_BY_DOCUMENT_USER } from 'graphql/queries/reservation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReservationItem from 'components/ReservationItem';
import { useLayoutContext } from 'context/LayoutContext';
import Button from 'components/Button';
import { CHANGE_RESERVATION_STATE } from 'graphql/mutations/reservation';
import { toast } from 'react-toastify';

const EnterReservation = () => {
  const layoutContext = useLayoutContext();
  const [completed, setCompleted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [getReservationByDocumentUser, { data: reservations, loading }] =
    useLazyQuery(GET_RESERVATION_BY_DOCUMENT_USER, {
      fetchPolicy: 'network-only',
    });
  const [changeReservationState, { loading: loadingChange }] = useMutation(
    CHANGE_RESERVATION_STATE
  );

  useEffect(() => {
    layoutContext.setLoading(loading || loadingChange);
  }, [loading, loadingChange]);

  const onSubmit = (data) => {
    getReservationByDocumentUser({
      variables: {
        id: data.document,
      },
    });
    setCompleted(false);
  };

  const onRegister = (id) => {
    changeReservationState({
      variables: {
        data: {
          id,
          state: 'completada',
        },
      },
    });
    toast.success('Reserva registrada');
    setCompleted(true);
    reset();
  };
  return (
    <div className='flex flex-col px-8 w-full gap-5 py-5 items-center'>
      <span className='text-2xl font-semibold mx-auto text-gray-700'>
        Registrar reserva
      </span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-row gap-2 w-full'
      >
        <input
          {...register('document', {
            required: true,
            pattern: {
              value: /^[0-9]+$/i,
              message: 'Ingrese solo números',
            },
          })}
          placeholder='documento...'
          className='w-full px-3 py-2 rounded-lg border-2 border-gray-700 outline-none focus:border-[#26DB84]'
        />
        <Button isSubmit text='Buscar' className='w-[100px]' />
      </form>
      <span className='text-red-700'>
        {errors.document && errors.document.message}
      </span>
      <div className='flex flex-col gap-4 mx-auto my-10'>
        {reservations &&
          !completed &&
          reservations.getReservationByDocumentUser.map((reservation) => (
            <ReservationItem
              type='enterReservation'
              reservation={reservation}
              onClick={() => {
                onRegister(reservation.id);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default EnterReservation;
