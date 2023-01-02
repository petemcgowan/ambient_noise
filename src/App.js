import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
// import AmbientPlayer from './components/AmbientPlayer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {store, persistor} from './redux/store';
// import {StateProvider} from './state/StateContext';
import SplashScreen from 'react-native-splash-screen';
import CentralNavigation from './components/CentralNavigation';

const App = () => {
  console.log('App:start');
  console.log('***Loading Fonts***');
  Ionicons.loadFont();

  useEffect(() => {
    console.log('App:useEffect');
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
   <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
      {/* <View style={styles.container}> */}
        <CentralNavigation />
      {/* </View> */}
         </PersistGate>
    </Provider>
  );
};

// <Provider store={store}>
//   <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
//   </PersistGate>
// </Provider>

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
