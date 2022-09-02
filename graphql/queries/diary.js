import { gql } from '@apollo/client';

const GET_DIARIES = gql`
  query GetDiaries {
    getDiaries {
      id
      name
      machinesCount
    }
  }
`;

const GET_MACHINES_UNIT_BY_SCHEDULE = gql`
  query GetMachinesUnitBySchedule($id: ID) {
    getMachinesUnitBySchedule(id: $id) {
      id
      machine {
        name
        image
      }
      location
    }
  }
`;

const GET_DIARY_BY_ID = gql`
  query GetDiaryById($id: ID) {
    getDiaryById(id: $id) {
      name
      schedules {
        day
        hour
      }
      machineUnits {
        id
        machine {
          name
          image
        }
        location
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

export {
  GET_DIARIES,
  GET_MACHINES_UNIT_BY_SCHEDULE,
  GET_SCHEDULE_AVAILABLE,
  GET_DIARY_BY_ID,
  GET_ALL_SCHEDULES,
};
