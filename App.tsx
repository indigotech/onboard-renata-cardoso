import {ApolloProvider} from '@apollo/client';
import React from 'react';
import {Navigation} from 'react-native-navigation';
import {HomePage} from './src/screens/home/home-page';
import {LoginPage} from './src/screens/login/login-page';
import {UserPage} from './src/screens/users/user-page';
import {apolloClient} from './src/utils/client';
import {Provider as PaperProvider} from 'react-native-paper';
import {AddUserPage} from './src/screens/add-user/add-user-page';

Navigation.registerComponent('Login', () => props => (
  <ApolloProvider client={apolloClient}>
    <LoginPage componentId={props.componentId} />
  </ApolloProvider>
));

Navigation.registerComponent('UserPage', () => props => (
  <ApolloProvider client={apolloClient}>
    <PaperProvider>
      <UserPage componentId={props.componentId} />
    </PaperProvider>
  </ApolloProvider>
));

Navigation.registerComponent('AddUserPage', () => props => (
  <ApolloProvider client={apolloClient}>
    <AddUserPage componentId={props.componentId} />
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
