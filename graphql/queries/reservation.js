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

const GET_RESERVATION_INFO = gql`
  query GetReservationInfo {
    getReservationInfo {
      userDocument
      state
      diary
      hour
      date
      serial
      machineName
    }
  }
`;

export { GET_RESERVATIONS_BY_USER, GET_RESERVATION_INFO };
