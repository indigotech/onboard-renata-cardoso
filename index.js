/**
 * @format
 */

import {LoginPage} from './src/screens/login/login-page';
import {HomePage} from './src/screens/home/home-page';
import React from 'react';
import {Navigation} from 'react-native-navigation';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

Navigation.registerComponent(
  'Login',
  () => props =>
    (
      <ApolloProvider client={client}>
        <LoginPage componentId={props.componentId} />
      </ApolloProvider>
    ),
  () => LoginPage,
);

Navigation.registerComponent('HomePage', () => HomePage);

Navigation.events().registerAppLaunchedListener(async () => {
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
