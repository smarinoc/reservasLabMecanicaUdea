import { gql } from 'apollo-server-micro';

const ScheduleTypes = gql`

type Schedule {
  id: ID                     
  day: String                   
  hour: String                   
  schedulesOnUnitMachine: [SchedulesOnUnitMachine]                          
}

type SchedulesOnUnitMachine {
  schedule: Schedule
  machineUnit: MachineUnit
  machineUnitId: String
  scheduleId:    String
  state:         String
}


type Query {
  getMachineBySchedule(scheduleId: ID!): [MachineCatalogReserve]
}
`

export { ScheduleTypes }