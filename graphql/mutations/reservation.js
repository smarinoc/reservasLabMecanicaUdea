import { gql } from '@apollo/client';

const CREATE_RESERVATION = gql`
  mutation Mutation($reservation: ReservationInput) {
    createReservation(reservation: $reservation) {
      id
    }
  }
`;

const CANCEL_RESERVATION = gql`
  mutation cancelReservation($reservation: ReservationCancelInput) {
    cancelReservation(reservation: $reservation) {
      state
    }
  }
`;

export { CREATE_RESERVATION, CANCEL_RESERVATION };
