import { gql } from '@apollo/client';

const GET_USER_ID = gql`
  query Query($getUserId: ID!) {
    getUser(id: $getUserId) {
      name
      email
      image
      role {
        name
        id
      }
      profile {
        name
        address
        customImage
        position
        phone
        id
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

export { GET_USER_ID, GET_USERS_INFO };
