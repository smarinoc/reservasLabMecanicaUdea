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
    machineUnitId: ID
    userId: ID
    date: Date
  }

  input ReservationCancelInput {
    scheduleId: ID
    machineUnitId: ID
    userId: ID
    id: ID
  }

  type Query {
    getReservations: [Reservation]
    getReservationsByUser(userId: ID): [Reservation]
  }

  type Mutation {
    createReservation(reservation: ReservationInput): Reservation
    cancelReservation(reservation: ReservationCancelInput): Reservation
  }
`;

export { ReservationTypes };
