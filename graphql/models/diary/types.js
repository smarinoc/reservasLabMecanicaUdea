import { gql } from 'apollo-server-micro';

const DiaryTypes = gql`
  type Diary {
    id: ID
    name: String
    schedules: [Schedule]
    machineUnits: [MachineUnit]
  }

  type Schedule {
    id: ID
    day: String
    hour: String
    diary: Diary
    diaryId: String
    machineUnitsOnSchedule: [MachineUnitOnSchedule]
  }

  type MachineUnitOnSchedule {
    id: ID
    machineUnit: MachineUnit
    schedule: Schedule
    machineUnitId: String
    scheduleId: String
    countAvailable: Int
  }

  input MachineUnitID {
    id: ID
  }

  input DiaryInput {
    name: String
    machinesCount: String
    schedules: [ScheduleInput]
    machineUnits: [machineUnitsCreateDiary]
  }

  input ScheduleInput {
    day: String
    hour: String
    machineUnitsOnSchedule: [MachineUnitOnScheduleInput]
  }

  input MachineUnitOnScheduleInput {
    machineUnitId: String
    countAvailable: Int
  }

  input machineUnitsCreateDiary {
    countAvailable: Int
    machineUnitId: ID
  }

  type diaryTableItem {
    id: ID
    name: String
    machinesCount: String
  }

  input scheduleGetMachinesUnit {
    day: String
    hour: String
  }

  type Query {
    getDiaries: [diaryTableItem]
    getMachinesUnitBySchedule(schedule: scheduleGetMachinesUnit): [MachineUnit]
    getScheduleAvailable: [Schedule]
    getDiaryById(id: ID): Diary
  }

  type Mutation {
    createDiary(diary: DiaryInput): Diary
  }
`;

export { DiaryTypes };
