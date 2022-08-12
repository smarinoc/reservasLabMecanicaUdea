import { UserResolvers } from "graphql/models/user/resolvers";
import { MachineResolvers } from "./models/machine/resolvers";
import { ScheduleResolvers } from "./models/schedule/resolvers";

export const resolvers = [
  UserResolvers,
  MachineResolvers,
  ScheduleResolvers
]