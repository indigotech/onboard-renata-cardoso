import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';


const App = () => {

  return (
    <SafeAreaView >
      <StatusBar />
      <Text style={styles.highlight}>Hello World</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
    fontSize: 24,
  },
});

export default App;
