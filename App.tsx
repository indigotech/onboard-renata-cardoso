import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LoginPage } from './src/screens/login/login-page';


const App = () => {

  return (
    <SafeAreaView >
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <LoginPage />
    </SafeAreaView>
  );
};


export default App;
