import { gql } from 'apollo-server-micro';
import { UserTypes } from 'graphql/models/user/types';
import { MachineTypes } from './models/machine/types';
import { ScheduleTypes } from './models/schedule/types';

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
  GenericTypes, UserTypes, MachineTypes, ScheduleTypes
];
