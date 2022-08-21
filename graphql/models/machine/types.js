import { gql } from 'apollo-server-micro';

const MachineTypes = gql`

type Machine {
    id: ID
    name: String
    image: String
    description: String
    recommendations: [String]
    machineUnits: [MachineUnit]
}

type MachineUnit {
    id: ID
    machine: Machine
    machineId: ID
    location: String
    count: Int
    machineUnitsOnSchedule: [MachineUnitOnSchedule]
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
    recommendations: [String]
    machineUnits: [MachineUnitInput]
}

input MachineUnitInput {
    id: ID
    location: String
    count: Int
}

type Query{
    getMachines: [Machine]
    getMachinesAvailable: [MachineUnit]
    getMachineByID(id: ID): Machine    
}

type Mutation {
    createMachine(machine: MachineInput):Machine
    updateMachine(machine: MachineInput):Machine
    deleteMachine(id: ID): Machine
}

`

export { MachineTypes };