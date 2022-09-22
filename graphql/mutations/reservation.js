import { gql } from '@apollo/client';

const CREATE_RESERVATION = gql`
  mutation Mutation($reservation: ReservationInput) {
    createReservation(reservation: $reservation) {
      id
    }
  }
`;

export { CREATE_RESERVATION };
