import { gql } from 'apollo-server-micro';

const MachineTypes = gql`
  type Machine {
    id: ID
    name: String
    image: String
    description: String
    recommendations: [String]
    amount: Int
    machineUnits: [MachineUnit]
  }

  type MachineUnit {
    id: ID
    machine: Machine
    machineId: ID
    location: String
    serial: String
    machineUnitsOnSchedule: [MachineUnitOnSchedule]
    diary: Diary
    diaryId: String
  }

  type MachineInfo {
    id: ID
    name: String
    location: String
    serial: String
    state: MachineUnitState
    reservationCount: String
  }

  enum MachineUnitState {
    habilitada
    mantenimiento
    inhabilitada
  }

  type MachineCatalogReserve {
    machine: Machine
    location: String
  }

  type MachineDetails {
    name: String
    image: String
    description: String
    recommendations: [String]
    location: String
    serial: String
  }

  input MachineInput {
    id: ID
    name: String
    image: String
    description: String
    amount: Int
    recommendations: [String]
    machineUnits: [MachineUnitInput]
  }

  input MachineUnitInput {
    id: ID
    location: String
    serial: String
  }

  input changeMachineUnitState {
    id: ID
    state: MachineUnitState
  }

  type Query {
    getMachines: [Machine]
    getMachinesAvailable: [MachineUnit]
    getMachineByID(id: ID): Machine
    getMachinesInfo: [MachineInfo]
    getMachineDetails(id: ID): MachineDetails
  }

  type Mutation {
    createMachine(machine: MachineInput): Machine
    updateMachine(machine: MachineInput): Machine
    deleteMachine(id: ID): Machine
    changeMachineUnitState(data: changeMachineUnitState): ID
  }
`;

export { MachineTypes };
