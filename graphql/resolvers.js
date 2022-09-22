import { UserResolvers } from 'graphql/models/user/resolvers';
import { DiaryResolvers } from 'graphql/models/diary/resolvers';
import { MachineResolvers } from 'graphql/models/machine/resolvers';
import { ReservationResolvers } from 'graphql/models/reservation/resolvers';

export const resolvers = [
  UserResolvers,
  MachineResolvers,
  DiaryResolvers,
  ReservationResolvers,
];
