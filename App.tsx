import { ApolloProvider } from '@apollo/client';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {LoginPage} from './src/screens/login/login-page';
import {client} from './src/screens/login/login-mutation'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <LoginPage />
    </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
