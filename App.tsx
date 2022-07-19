import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {LoginPage} from './src/screens/login/login-page';

const App = () => {

  const client = new ApolloClient({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
    cache: new InMemoryCache(),
  });
  
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
