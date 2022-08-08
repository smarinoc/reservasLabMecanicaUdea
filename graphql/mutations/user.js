import { gql } from '@apollo/client';

const CREATE_PROFILES = gql`
 mutation CreateProfiles($data: [ProfileCreateInput]) {
  createProfiles(data: $data) 
}
`;

const REGISTER_USER = gql`
  mutation RegisterUser($data: registerUserInput) {
  registerUser(data: $data) {
    id
  }
}
`;

const UPDATE_COURSE = gql`
  mutation UpdateCourse($where: CourseFilterId!, $data: CourseUpdateInput!) {
    updateCourse(where: $where, data: $data) {
      id
      name
    }
  }
`;

export { CREATE_PROFILES, REGISTER_USER, UPDATE_COURSE };
