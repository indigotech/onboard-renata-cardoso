import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

const App = () => (
  <SafeAreaView>
    <StatusBar
      barStyle="dark-content"
      backgroundColor="transparent"
      translucent
    />
  </SafeAreaView>
);

export default App;
