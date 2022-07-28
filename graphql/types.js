import { gql } from 'apollo-server-micro';
import { UserTypes } from 'graphql/models/user/types';

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
`;

export const types = [
  GenericTypes, UserTypes
];
