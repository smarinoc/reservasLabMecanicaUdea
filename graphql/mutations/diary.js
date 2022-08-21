import { gql } from '@apollo/client';

const CREATE_DIARY = gql`
  mutation Mutation($diary: DiaryInput) {
  createDiary(diary: $diary) {
    id
  }
}
`;

export { CREATE_DIARY };