import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const LOG_IN_CODE = gql`
  mutation requestSecretCode($PhoneNumber: Number!) {
    requestSecretCode(PhoneNumber: $PhoneNumber)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String
    $firstName: String
    $lastName: String
    $PhoneNumber: Number!
  ) {
    createAccount(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
      PhoneNumber: $Number
    )
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $email: String!) {
    confirmSecret(secret: $secret, email: $email)
  }
`;

export const CONFIRM_SECRET_CODE = gql`
  mutation confirmSecretCode($secretCode: Number!, $PhoneNumber: Number!) {
    confirmSecretCode(secretCode: $secretCode, PhoneNumber: $PhoneNumber)
  }
`;
