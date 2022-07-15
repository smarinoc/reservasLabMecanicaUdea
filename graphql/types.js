import { gql } from 'apollo-server-micro';

const GenericTypes = gql`
  scalar Date
  scalar Decimal

  input StringEditField {
    set: String
  }
  input FloatEditField {
    set: Float
  }
  input IntEditField {
    set: Int
  }
  input DateEditField {
    set: Date
  }
  input BooleanEditField {
    set: Boolean
  }
  input UserId {
    id: ID!
  }

  type Query {
      prueba: String
  }
`;

export const types = [
  GenericTypes,
];
