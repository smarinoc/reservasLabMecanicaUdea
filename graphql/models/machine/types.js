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
    name: String
    location: String
    serial: String
    state: String
    reservationCount: String
  }

  type MachineCatalogReserve {
    machine: Machine
    location: String
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

  type Query {
    getMachines: [Machine]
    getMachinesAvailable: [MachineUnit]
    getMachineByID(id: ID): Machine
    getMachinesInfo: [MachineInfo]
  }

  type Mutation {
    createMachine(machine: MachineInput): Machine
    updateMachine(machine: MachineInput): Machine
    deleteMachine(id: ID): Machine
  }
`;

export { MachineTypes };
