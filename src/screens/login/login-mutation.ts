import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

export const LOGIN_MUTATION = gql`
mutation Login($data: LoginInput!){
  login(data: $data){
    token
    user{
      id
      name
      email
      phone
      birthDate
      role
    }
  }
}
`;
