import { gql } from 'apollo-server-micro';

const ReserveTypes = gql`
  type Reserve {
    id: ID
    machineUnitOnSchedule: MachineUnitOnSchedule
    machineUnitOnScheduleId: ID
    user: User
    userId: ID
    state: String
  }

  input ReserveInput {
    machineUnitID: ID
    day: String
    hour: String
    userId: ID
  }

  type Query {
    getReserves: [Reserve]
  }

  type Mutation {
    createReserve(reserve: ReserveInput): Reserve
  }
`;

export { ReserveTypes };
