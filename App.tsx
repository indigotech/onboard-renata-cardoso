import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import { Routes } from './src/routes';

const App = () => {

  const client = new ApolloClient({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
    cache: new InMemoryCache(),
  });
  
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};

export default App;
