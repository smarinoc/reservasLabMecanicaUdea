import { gql } from '@apollo/client';

const CREATE_RESERVE = gql`
  mutation Mutation($reserve: ReserveInput) {
    createReserve(reserve: $reserve) {
      id
    }
  }
`;

export { CREATE_RESERVE };
