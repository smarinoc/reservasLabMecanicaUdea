import { gql } from '@apollo/client';

const CREATE_MACHINE = gql`
  mutation Mutation($machine: MachineInput) {
    createMachine(machine: $machine) {
      id
    }
  }
`;

const UPDATE_MACHINE = gql`
  mutation Mutation($machine: MachineInput) {
    updateMachine(machine: $machine) {
      id
    }
  }
`;

const DELETE_MACHINE = gql`
  mutation Mutation($id: ID) {
    deleteMachine(id: $id) {
      id
    }
  }
`;

const CHANGE_MACHINE_UNIT_STATE = gql`
  mutation ChangeMachineUnitState($data: changeMachineUnitState) {
    changeMachineUnitState(data: $data)
  }
`;

export {
  CREATE_MACHINE,
  UPDATE_MACHINE,
  DELETE_MACHINE,
  CHANGE_MACHINE_UNIT_STATE,
};
