import {gql} from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: {email: $email, password: $password}) {
      token
    }
  }
`;

export const GET_USER = gql`
  query getUser($offset: Int!) {
    users(pageInfo: {offset: $offset}) {
      nodes {
        id
        name
        email
      }
      count
    }
  }
`;
