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

const GET_MACHINES_UNITS = gql`
  query GetMachinesUnits {
    getMachinesUnits {
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
      id
      name
      location
      serial
      state
      reservationCount
    }
  }
`;

const GET_MACHINE_DETAILS = gql`
  query GetMachineDetails($id: ID) {
    getMachineDetails(id: $id) {
      name
      image
      description
      recommendations
      location
      serial
    }
  }
`;

export {
  GET_MACHINES,
  GET_MACHINE_BY_ID,
  GET_MACHINES_UNITS,
  GET_MACHINES_INFO,
  GET_MACHINE_DETAILS,
};
