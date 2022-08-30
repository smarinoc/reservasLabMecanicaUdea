import { gql } from '@apollo/client';

const CREATE_PROFILES = gql`
  mutation CreateProfiles($data: [ProfileCreateInput]) {
    createProfiles(data: $data)
  }
`;

const REGISTER_USER = gql`
  mutation RegisterUser($data: registerUserInput) {
    registerUser(data: $data) {
      id
    }
  }
`;

export { CREATE_PROFILES, REGISTER_USER };
