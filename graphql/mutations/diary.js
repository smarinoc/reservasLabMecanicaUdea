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

const CHANGE_DIARY_STATE = gql`
  mutation ChangeDiaryState($data: changeDiaryState) {
    changeDiaryState(data: $data)
  }
`;

export { CREATE_DIARY, DELETE_DIARY, UPDATE_DIARY, CHANGE_DIARY_STATE };
