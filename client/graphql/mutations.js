import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
        walletBalance
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        walletBalance
      }
    }
  }
`;

export const FUND_WALLET = gql`
  mutation FundWallet($amount: Float!) {
    fundWallet(amount: $amount) {
      id
      walletBalance
    }
  }
`;
