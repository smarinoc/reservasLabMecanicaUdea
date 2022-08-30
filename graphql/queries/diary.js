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
  query GetMachinesUnitBySchedule($schedule: scheduleGetMachinesUnit) {
    getMachinesUnitBySchedule(schedule: $schedule) {
      id
      machine {
        name
        image
      }
      location
    }
  }
`;

const GET_SCHEDULE_AVAILABLE = gql`
  query Query {
    getScheduleAvailable {
      day
      hour
    }
  }
`;

export { GET_DIARIES, GET_MACHINES_UNIT_BY_SCHEDULE, GET_SCHEDULE_AVAILABLE };
