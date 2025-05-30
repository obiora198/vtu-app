import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    walletBalance: Float!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Transaction {
    id: ID!
    amount: Float!
    type: String!
    createdAt: String!
    user: User!
  }

  type Query {
    me: User
    transactions: [Transaction!]
  }

  type Mutation {
    register(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    fundWallet(amount: Float!): User!
    verifyPayment(reference: String!): User!
  }
`;

export default typeDefs;