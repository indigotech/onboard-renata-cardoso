import {gql} from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: {email: $email, password: $password}) {
      token
    }
  }
`;

export const GET_USER = gql`
  query getUser($offset: Int!, $limit: Int!) {
    users(pageInfo: {offset: $offset, limit: $limit}) {
      nodes {
        id
        name
        email
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export const ADD_USER_MUTATION = gql`
  mutation createUser($data: UserInputType!) {
    createUser(data: $data) {
      id
      name
      email
      phone
      birthDate
      role
    }
  }
`;

export const GET_USER_DETAIL = gql`
  query GetUserDetail($id: ID!) {
    user(id: $id) {
      id
      name
      phone
      birthDate
      email
      role
    }
  }
`;
