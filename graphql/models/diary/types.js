import { gql } from 'apollo-server-micro';

const DiaryTypes = gql`
  type Diary {
    id: ID
    name: String
    schedules: [Schedule]
    machineUnits: [MachineUnit]
    firstDate: Date
    lastDate: Date
  }

  type Schedule {
    id: ID
    day: String
    hour: String
    diaries: [Diary]
    machineUnitsOnSchedule: [MachineUnitOnSchedule]
    reservations: [Reservation]
  }

  type MachineUnitOnSchedule {
    id: ID
    machineUnit: MachineUnit
    schedule: Schedule
    machineUnitId: String
    scheduleId: String
    countAvailable: Int
  }

  input DiaryInput {
    id: ID
    name: String
    machinesCount: String
    schedules: [InputID]
    machineUnits: [InputID]
    firstDate: Date
    lastDate: Date
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
    getMachinesUnitBySchedule(id: ID): [MachineUnit]
    getScheduleAvailable: [Schedule]
    getAllSchedules: [Schedule]
    getDiaryById(id: ID): Diary
  }

  type Mutation {
    createDiary(diary: DiaryInput): Diary
    createSchedules(schedules: [scheduleGetMachinesUnit]): String
    updateDiary(diary: DiaryInput): Diary
    deleteDiary(id: ID): Diary
  }
`;

export { DiaryTypes };
