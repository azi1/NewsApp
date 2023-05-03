import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const App = () => {
  return (
    <View style={styles.title}>
      <Text> React native and Web </Text>
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  title: {
    flex: 1,
    margin: 100,
  },
});
