import { gql } from 'apollo-server-micro';

const MachineTypes = gql`

type Machine {
    id: ID
    name: String
    image: String
    description: String
    recommendations: [String]
    units: Int
}

type CatalogMachine{
  machine: Machine
  location: String
}

type UnitMachine {
    id: ID
    machine: Machine
    location: String
    schedulesOnUnitMachine: [SchedulesOnUnitMachine]
}


type Query{
    getMachines: [Machine]
    getMachinesAvailable: [UnitMachine]
}

`

export { MachineTypes };