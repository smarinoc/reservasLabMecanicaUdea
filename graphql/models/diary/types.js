import { gql } from 'apollo-server-micro';

const DiaryTypes = gql`
  type Diary {
    id: ID
    name: String
    schedules: [Schedule]
    machineUnits: [MachineUnit]
    reservations: [Reservation]
    state: DiaryState
    firstDate: Date
    lastDate: Date
  }

  enum DiaryState {
    habilitado
    finalizado
    inhabilitado
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
    state: MachineUnitOnScheduleState
  }

  type ValidateFormDiaryRes {
    machineUnitId: String
    day: String
    hour: String
    isValid: Boolean
  }

  enum MachineUnitOnScheduleState {
    available
    busy
    disabled
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

  type DiaryInfo {
    id: ID
    name: String
    machinesCount: String
    reservationCount: String
    state: DiaryState
    firstDate: Date
    lastDate: Date
  }

  input scheduleGetMachinesUnit {
    day: String
    hour: String
  }

  input changeDiaryState {
    id: ID
    state: DiaryState
  }

  input machineUnitOnSchedule {
    schedules: [InputID]
    machineUnits: [InputID]
    diaryId: ID
  }

  type Query {
    getDiariesInfo: [DiaryInfo]
    getMachinesUnitBySchedule(id: ID): [MachineUnit]
    getScheduleAvailable: [Schedule]
    getAllSchedules: [Schedule]
    getDiaryById(id: ID): Diary
    validateFormDiary(
      machineUnitOnSchedule: machineUnitOnSchedule
    ): [ValidateFormDiaryRes]
  }

  type Mutation {
    createDiary(diary: DiaryInput): Diary
    createSchedules(schedules: [scheduleGetMachinesUnit]): String
    updateDiary(diary: DiaryInput): Diary
    deleteDiary(id: ID): Diary
    changeDiaryState(data: changeDiaryState): ID
  }
`;

export { DiaryTypes };
