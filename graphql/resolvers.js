import { UserResolvers } from 'graphql/models/user/resolvers';
import { DiaryResolvers } from 'graphql/models/diary/resolvers';
import { MachineResolvers } from 'graphql/models/machine/resolvers';
import { ReserveResolvers } from 'graphql/models/reserve/resolvers';

export const resolvers = [
  UserResolvers,
  MachineResolvers,
  DiaryResolvers,
  ReserveResolvers,
];
