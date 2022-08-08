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

export { GET_USER_ID };
