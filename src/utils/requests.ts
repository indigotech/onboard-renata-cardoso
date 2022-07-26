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
