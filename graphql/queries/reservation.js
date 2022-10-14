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
        id
      }
      machineUnit {
        id
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

const GET_RESERVATION_BY_DOCUMENT_USER = gql`
  query GetReservationByDocumentUser($id: ID) {
    getReservationByDocumentUser(id: $id) {
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
        id
      }
      machineUnit {
        id
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

export {
  GET_RESERVATIONS_BY_USER,
  GET_RESERVATION_INFO,
  GET_RESERVATION_BY_DOCUMENT_USER,
};
