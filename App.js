import React from 'react';
import {StyleSheet, View} from 'react-native';

import MusicPlayer from './component/MusicPlayer';

const App = () => {
  return (
    <View style={styles.container}>
      <MusicPlayer />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
