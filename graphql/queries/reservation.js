import { gql } from '@apollo/client';

const GET_RESERVATIONS_BY_USER = gql`
  query GetReservationsByUser($userId: ID) {
    getReservationsByUser(userId: $userId) {
      user {
        name
        profile {
          document
        }
      }
      id
      state
      date
      schedule {
        hour
      }
      machineUnit {
        location
        serial
        machine {
          name
          image
        }
      }
    }
  }
`;

export { GET_RESERVATIONS_BY_USER };
