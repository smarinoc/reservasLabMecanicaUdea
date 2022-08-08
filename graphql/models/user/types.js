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
  email:  String 
  state:  State
  documentType: String
  document: String
  userType: String
  phoneNumber: String  
  }

  input ProfileCreateInput {
    email: String!
    state: State
  }

  input registerUserInput {
   email: String!
   documentType: String
   document: String
   userType: String
   phoneNumber: String  
  }

  enum State {
    authorized
    registered
    disabled
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createProfiles(data: [ProfileCreateInput]): Boolean
    registerUser(data: registerUserInput): Profile  
  }
`;

export { UserTypes };
