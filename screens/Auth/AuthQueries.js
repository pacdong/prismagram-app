import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $firstName: String
    $lastName: String
  ) {
    createAccount(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
    )
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $email: String!) {
    confirmSecret(secret: $secret, email: $email)
  }
`;

// CUSTUMIZE

// export const LOG_IN_CODE = gql`
//   mutation requestSecretCode($phoneNumber: String!) {
//     requestSecretCode(phoneNumber: $phoneNumber)
//   }
// `;

// export const CONFIRM_SECRET_CODE = gql`
//   mutation confirmSecretCode($secretCode: String!, $phoneNumber: String!) {
//     confirmSecretCode(secretCode: $secretCode, phoneNumber: $phoneNumber)
//   }
// `;

// export const CREATE_ACCOUNT = gql`
//   mutation createAccount(
//     $username: String!
//     $email: String
//     $firstName: String
//     $lastName: String
//     $phoneNumber: String!
//   ) {
//     createAccount(
//       username: $username
//       email: $email
//       firstName: $firstName
//       lastName: $lastName
//       phoneNumber: $String
//     )
//   }
// `;
