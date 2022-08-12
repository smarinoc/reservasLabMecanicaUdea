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
  unitMachine: UnitMachine
  unitMachineId: String
  scheduleId:    String
  state:         String
}


type Query {
  getMachineBySchedule(scheduleId: ID!): [CatalogMachine]
}
`

export { ScheduleTypes }