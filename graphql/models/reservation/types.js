import { gql } from 'apollo-server-micro';

const ReservationTypes = gql`
  type Reservation {
    id: ID
    user: User
    userId: ID
    state: String
    date: Date
    scheduleId: String
    machineUnitId: String
    schedule: Schedule
    machineUnit: MachineUnit
  }

  input ReservationInput {
    scheduleId: ID
    machineUnitID: ID
    day: String
    hour: String
    userId: ID
    date: Date
  }

  type Query {
    getReservations: [Reservation]
  }

  type Mutation {
    createReservation(reservation: ReservationInput): Reservation
  }
`;

export { ReservationTypes };
