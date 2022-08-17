import { gql } from '@apollo/client';

const GET_MACHINES = gql`
query Query {
    getMachines {
      id
      name
      image
    }
  }
  `
const GET_MACHINE_BY_ID = gql`
query GetMachineByID($id: ID) {
  getMachineByID(id: $id) {
    id
    name
    image
    description
    recommendations
    machineUnits {
      location
      count
    }
  }
}

`
export { GET_MACHINES, GET_MACHINE_BY_ID }