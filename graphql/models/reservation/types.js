import { gql } from 'apollo-server-micro';

const ReservationTypes = gql`
  type Reservation {
    id: ID
    user: User
    userId: ID
    state: ReservationState
    date: Date
    scheduleId: String
    machineUnitId: String
    schedule: Schedule
    machineUnit: MachineUnit
    diary: Diary
    diaryId: String
  }

  enum ReservationState {
    reservada
    cancelada
    completada
  }

  type ReservationInfo {
    userDocument: String
    state: ReservationState
    diary: String
    hour: String
    date: Date
    serial: String
    machineName: String
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
    id: ID
  }

  type Query {
    getReservations: [Reservation]
    getReservationsByUser(userId: ID): [Reservation]
    getReservationInfo: [ReservationInfo]
  }

  type Mutation {
    createReservation(reservation: ReservationInput): Reservation
    cancelReservation(reservation: ReservationCancelInput): Reservation
  }
`;

export { ReservationTypes };
