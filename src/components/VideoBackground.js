import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';

import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const VideoBackground = ({videoBackground, playing}) => {
  useEffect(() => {
    console.log('VideoBaby useEffect called');
  }, []);

  const onVideoError = () => {
    console.log('onVideoError has been called');
  };

  const onVideoLoaded = () => {
    console.log('onVideoLoaded has been called');
  };

  const dynamicStyles = StyleSheet.create({
    backgroundVideo: {
      height: height,
      position: 'absolute',
      top: 0,
      left: 0,
      alignItems: 'stretch',
      bottom: 0,
      right: 0,
    },
  });
  return (
    <Video
      source={videoBackground}
      // poster={sounds[songIndex].videoPoster}
      posterResizeMode={'cover'}
      style={dynamicStyles.backgroundVideo}
      onError={onVideoError}
      muted={true}
      repeat={true}
      onLoad={onVideoLoaded}
      paused={!playing}
      resizeMode={'cover'}
      rate={0.7}
      // ignoreSilentSwitch={'obey'}
    />
  );
};

export default VideoBackground;
