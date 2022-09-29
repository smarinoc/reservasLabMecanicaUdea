import { gql } from 'apollo-server-micro';

const UserTypes = gql`
  type User {
    id: ID
    name: String
    email: String
    emailVerified: Date
    image: String
    profile: Profile
    createdAt: Date
    updatedAt: Date
  }

  type Profile {
    id: ID
    user: User
    email: String
    state: ProfileState
    documentType: String
    document: String
    userType: String
    phoneNumber: String
  }

  type UserInfo {
    name: String
    email: String
    state: ProfileState
    documentType: String
    document: String
    userType: String
    phoneNumber: String
  }

  type UserInfoTableAdmin {
    id: ID
    document: String
    email: String
    state: ProfileState
  }

  input ProfileCreateInput {
    email: String!
    state: ProfileState
  }

  input registerUserInput {
    email: String!
    documentType: String
    document: String
    userType: String
    phoneNumber: String
  }

  enum ProfileState {
    habilitado
    registrado
    inhabilitado
  }

  input changeUserState {
    id: ID
    state: ProfileState
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    getUsersInfo: [UserInfo]
    getUsersInfoTableAdmin: [UserInfoTableAdmin]
  }

  type Mutation {
    createProfiles(data: [ProfileCreateInput]): Boolean
    registerUser(data: registerUserInput): Profile
    changeUserState(data: changeUserState): ID
  }
`;

export { UserTypes };
