import { gql } from '@apollo/client';

const GET_USER_ID = gql`
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      profile {
        documentType
        document
        userType
        phoneNumber
      }
    }
  }
`;

const GET_USERS_INFO = gql`
  query GetUsersInfo {
    getUsersInfo {
      name
      email
      state
      documentType
      document
      userType
      phoneNumber
    }
  }
`;

const GET_USERS_INFO_TABLE_ADMIN = gql`
  query getUsersInfoTableAdmin {
    getUsersInfoTableAdmin {
      id
      email
      document
      state
    }
  }
`;

export { GET_USER_ID, GET_USERS_INFO, GET_USERS_INFO_TABLE_ADMIN };
