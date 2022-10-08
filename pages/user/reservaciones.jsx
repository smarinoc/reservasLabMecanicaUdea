import { useMutation, useQuery } from '@apollo/client';
import { GET_RESERVATIONS_BY_USER } from 'graphql/queries/reservation';
import { useSession } from 'next-auth/react';
import ReservationItem from '@components/ReservationItem';
import React, { useEffect } from 'react';
import { CANCEL_RESERVATION } from 'graphql/mutations/reservation';
import { toast } from 'react-toastify';
import { useLayoutContext } from 'context/LayoutContext';

const reservations = () => {
  const layoutContext = useLayoutContext();
  const { data: session } = useSession();
  const { data, loading: loadingGetReservation } = useQuery(
    GET_RESERVATIONS_BY_USER,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        userId: session.user.id,
      },
    }
  );

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

  if (loadingGetReservation) {
    return <div>Loading....</div>;
  }
  return (
    <div className='flex flex-col gap-4 mx-auto mt-24'>
      {data.getReservationsByUser.map((reservation) => (
        <ReservationItem reservation={reservation} onCancel={cancel} />
      ))}
    </div>
  );
};

export default reservations;

reservations.auth = {
  role: ['user', 'admin'],
};
