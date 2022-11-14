import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import AmbientPlayer from './component/AmbientPlayer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SplashScreen from 'react-native-splash-screen';

const App = () => {
  console.log('***Loading Fonts***');
  Ionicons.loadFont();
  MaterialCommunityIcons.loadFont();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
