import React from 'react';
import {StyleSheet, View} from 'react-native';

import AmbientPlayer from './component/AmbientPlayer';

const App = () => {
  return (
    <View style={styles.container}>
      <AmbientPlayer />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
