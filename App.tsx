import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import React from 'react';
import {Navigation} from 'react-native-navigation';
import {HomePage} from './src/screens/home/home-page';
import {LoginPage} from './src/screens/login/login-page';

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

Navigation.registerComponent('Login', () => props => (
  <ApolloProvider client={client}>
    <LoginPage componentId={props.componentId} />
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
