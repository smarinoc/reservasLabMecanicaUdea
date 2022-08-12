import { gql } from '@apollo/client';

const GET_MACHINE_BY_SCHEDULE = gql`
 query GetMachineBySchedule($scheduleId: ID!) {
  getMachineBySchedule(scheduleId: $scheduleId) {
    location
    machine {
      id
      name
      image
    }
  }
}
`;

export { GET_MACHINE_BY_SCHEDULE };