import { gql } from '@apollo/client';

const CREATE_DIARY = gql`
  mutation Mutation($diary: DiaryInput) {
    createDiary(diary: $diary) {
      id
    }
  }
`;

const DELETE_DIARY = gql`
  mutation DeleteDiary($deleteDiaryId: ID) {
    deleteDiary(id: $deleteDiaryId) {
      id
    }
  }
`;

const UPDATE_DIARY = gql`
  mutation Mutation($diary: DiaryInput) {
    updateDiary(diary: $diary) {
      id
    }
  }
`;

export { CREATE_DIARY, DELETE_DIARY, UPDATE_DIARY };
