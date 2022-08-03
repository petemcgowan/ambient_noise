import React, {useLayoutEffect, useState, useEffect} from 'react';

import {StyleSheet, View, Animated} from 'react-native';

const RNBackdrop = ({activeColor, trackIndex, isPlaying}) => {
  const colors = [
    'white',
    'black',
    'blue',
    'green',
    'pink',
    'red',
    'purple',
    'yellow',
    'gray',
    'lilac',
  ];

  const [value, setValue] = React.useState(0);
  // useLayoutEffect(() => {
  //   document.documentElement.style.setProperty('--active-color', activeColor);
  // }, [trackIndex, activeColor]);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(v => (v === 9 ? 0 : v + 1));
    }, 1000);
  }, []);

  return <View style={[styles.container, {backgroundColor: colors[value]}]} />;
};

export default RNBackdrop;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});

/*

What I'm trying to do here is change the background continously and smoothly, so it's doing it all the time or at least every 5 seconds.  Maybe a sleep might work, like in the useLayoutEffect, but th

*/
