import { gql } from '@apollo/client';

const GET_DIARIES_INFO = gql`
  query GetDiariesInfo {
    getDiariesInfo {
      id
      name
      state
      machinesCount
      reservationCount
      firstDate
      lastDate
    }
  }
`;

const GET_MACHINES_UNIT_BY_SCHEDULE = gql`
  query GetMachinesUnitBySchedule($id: ID) {
    getMachinesUnitBySchedule(id: $id) {
      id
      location
      serial
      machine {
        name
        image
      }
    }
  }
`;

const GET_DIARY_BY_ID = gql`
  query GetDiaryById($id: ID) {
    getDiaryById(id: $id) {
      id
      name
      firstDate
      lastDate
      schedules {
        day
        hour
        id
      }
      machineUnits {
        id
        location
        serial
        machine {
          name
          image
        }
      }
    }
  }
`;

const GET_SCHEDULE_AVAILABLE = gql`
  query Query {
    getScheduleAvailable {
      id
      day
      hour
    }
  }
`;

const GET_ALL_SCHEDULES = gql`
  query Query {
    getAllSchedules {
      day
      hour
      id
    }
  }
`;

const VALIDATE_FORM_DIARY = gql`
  query ValidateFormDiary($machineUnitOnSchedule: machineUnitOnSchedule) {
    validateFormDiary(machineUnitOnSchedule: $machineUnitOnSchedule) {
      machineUnitId
      day
      hour
      isValid
    }
  }
`;

export {
  GET_DIARIES_INFO,
  GET_MACHINES_UNIT_BY_SCHEDULE,
  GET_SCHEDULE_AVAILABLE,
  GET_DIARY_BY_ID,
  GET_ALL_SCHEDULES,
  VALIDATE_FORM_DIARY,
};
