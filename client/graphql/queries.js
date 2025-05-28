import { gql } from '@apollo/client';

export const ME = gql`
  query {
    me {
      id
      name
      email
      walletBalance
    }
  }
`;

export const TRANSACTIONS = gql`
  query {
    transactions {
      id
      amount
      type
      createdAt
    }
  }
`;
