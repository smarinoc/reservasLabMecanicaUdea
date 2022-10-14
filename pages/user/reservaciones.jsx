import { useMutation, useQuery } from '@apollo/client';
import { GET_RESERVATIONS_BY_USER } from 'graphql/queries/reservation';
import { getSession, useSession } from 'next-auth/react';
import ReservationItem from '@components/ReservationItem';
import React, { useEffect } from 'react';
import { CANCEL_RESERVATION } from 'graphql/mutations/reservation';
import { toast } from 'react-toastify';
import { useLayoutContext } from 'context/LayoutContext';
import { Skeleton } from '@mui/material';

const reservations = () => {
  const layoutContext = useLayoutContext();
  const { data: session } = useSession();
  const { data, loading } = useQuery(GET_RESERVATIONS_BY_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      userId: session.user.id,
    },
  });

  const [CancelReservation, { loading: loadingCancel }] = useMutation(
    CANCEL_RESERVATION,
    {
      refetchQueries: [GET_RESERVATIONS_BY_USER],
    }
  );

  useEffect(() => {
    layoutContext.setLoading(loadingCancel);
  }, [loadingCancel]);

  const cancel = async (reservation) => {
    await CancelReservation({
      variables: {
        reservation,
      },
    });
    toast.success('Reserva cancelada');
  };

  if (loading) {
    return (
      <div className='flex flex-col gap-4 mx-auto mt-24 w-[600px]'>
        <Skeleton variant='rounded' height={400} />
        <Skeleton variant='rounded' height={400} />
      </div>
    );
  }
  return (
    <div className='flex flex-col gap-4 mx-auto my-10'>
      {data.getReservationsByUser.map((reservation) => (
        <ReservationItem
          type='myReservations'
          reservation={reservation}
          onClick={cancel}
        />
      ))}
    </div>
  );
};

export default reservations;

reservations.auth = {
  role: ['user', 'admin'],
};

export const getServerSideProps = async (contex) => {
  const session = await getSession(contex);
  return {
    props: {
      session,
    },
  };
};
