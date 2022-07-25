import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Navigation} from 'react-native-navigation';
import {HomePage} from './src/screens/home/home-page';
import {LoginPage} from './src/screens/login/login-page';
import {UserPage} from './src/screens/users/user-page';

const httpLink = new HttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});

const auth = new ApolloLink((operation, forward) => {
  const token = AsyncStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
  return forward(operation);
});
export const apolloClient = new ApolloClient({
  link: concat(auth, httpLink),
  cache: new InMemoryCache(),
});

Navigation.registerComponent('Login', () => props => (
  <ApolloProvider client={apolloClient}>
    <LoginPage componentId={props.componentId} />
  </ApolloProvider>
));

Navigation.registerComponent('UserPage', () => () => (
  <ApolloProvider client={apolloClient}>
    <UserPage />
  </ApolloProvider>
));

Navigation.registerComponent('HomePage', () => HomePage);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Login',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
});
