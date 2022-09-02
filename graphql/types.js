import { gql } from 'apollo-server-micro';
import { UserTypes } from 'graphql/models/user/types';
import { DiaryTypes } from 'graphql/models/diary/types';
import { MachineTypes } from 'graphql/models/machine/types';
import { ReserveTypes } from 'graphql/models/reserve/types';

const GenericTypes = gql`
  scalar Date
  scalar Decimal
  scalar Upload

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
  input InputID {
    id: ID
  }
`;

export const types = [
  GenericTypes,
  UserTypes,
  MachineTypes,
  DiaryTypes,
  ReserveTypes,
];
