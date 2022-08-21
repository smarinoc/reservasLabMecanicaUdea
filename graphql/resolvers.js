import { UserResolvers } from "graphql/models/user/resolvers";
import { DiaryResolvers } from "./models/diary/resolvers";
import { MachineResolvers } from "./models/machine/resolvers";


export const resolvers = [
  UserResolvers,
  MachineResolvers,
  DiaryResolvers
]