import { gql } from '@apollo/client';

const GET_MACHINES = gql`
  query Query {
    getMachines {
      id
      name
      image
      amount
    }
  }
`;
const GET_MACHINE_BY_ID = gql`
  query GetMachineByID($id: ID) {
    getMachineByID(id: $id) {
      id
      name
      image
      description
      recommendations
      amount
      machineUnits {
        location
        serial
      }
    }
  }
`;

const GET_MACHINES_AVAILABLE = gql`
  query GetMachinesAvailable {
    getMachinesAvailable {
      location
      id
      serial
      machine {
        name
        image
      }
    }
  }
`;

const GET_MACHINES_INFO = gql`
  query GetMachinesInfo {
    getMachinesInfo {
      name
      location
      serial
      state
      reservationCount
    }
  }
`;

export {
  GET_MACHINES,
  GET_MACHINE_BY_ID,
  GET_MACHINES_AVAILABLE,
  GET_MACHINES_INFO,
};
