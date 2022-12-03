import React, {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import Video from 'react-native-video';
import styled from 'styled-components/native';

import {SafeAreaView, View, StyleSheet, Dimensions} from 'react-native';
import Sound from 'react-native-sound';

import sounds, {knockOnSound, knockOffSound} from '../model/data';

import {LogBox} from 'react-native';
import CountdownTimer from './CountdownTimer';
import TimerControls from './TimerControls';
import SoundsSlider from './SoundsSlider';

Sound.setCategory('Playback');
const {width, height} = Dimensions.get('window');
// LogBox.ignoreLogs(['Sending']);
LogBox.ignoreAllLogs();

const AmbientPlayer = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const [timerVisible, setTimerVisible] = useState(false);

  const [playing, setPlaying] = useState(false);

  console.log('Setting playing Sound volume:songIndex:' + songIndex);
  sounds[songIndex].playingSound.setVolume(0.9);
  sounds[songIndex].playingSound.setNumberOfLoops(-1);
  knockOnSound.setVolume(0.6);
  knockOffSound.setVolume(0.6);

  useEffect(() => {
    console.log('AmbientPlayer useEffect called');

    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      if (index !== songIndex) {
        if (sounds[songIndex].playingSound._playing) {
          // if previous sound if playing, stop it
          sounds[songIndex].playingSound.stop();
          // play the newly selected sound
          sounds[index].playingSound.play();
        }

        console.log(
          'SCROLLX:Setting song index on swipe():' +
            index +
            ', songIndex was:' +
            songIndex,
        );
        setSongIndex(index);
      }
    });

    return () => {
      console.log('releasing sounds / listeners in useEffect');
      // TODO Do I really need this or does just pausing work?
      // sounds[songIndex].playingSound.release();
      // playingSound.release();
      scrollX.removeAllListeners();
    };
  }, [scrollX /*playingSound*/, songIndex]);

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: playing ? 'rgba(151, 65, 23, 1)' : 'rgba(34, 40, 48, 1)',
    },
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
  // <SafeAreaView style={dynamicStyles.container}>
  //   </SafeAreaView>
  return (
    <SafeAreaView style={dynamicStyles.container}>
      <Video
        source={sounds[songIndex].videoBackground}
        style={dynamicStyles.backgroundVideo}
        muted={true}
        repeat={true}
        paused={!playing}
        resizeMode={'cover'}
        rate={0.7}
        ignoreSilentSwitch={'obey'}
      />
      <View>
        <Wrapper>
          {/* <View style={styles.mainContainer}> */}
          <View
            style={{
              width: width,
            }}>
            <SoundsSlider
              scrollX={scrollX}
              songIndex={songIndex}
              playing={playing}
              setPlaying={setPlaying}
            />
          </View>
          <View styles={{marginBottom: 15}}>
            {!!timerVisible && <CountdownTimer />}
          </View>
          <TimerControls
            timerVisible={timerVisible}
            setTimerVisible={setTimerVisible}
          />
        </Wrapper>
      </View>
    </SafeAreaView>
  );
};

export default AmbientPlayer;

export const Wrapper = styled.View`
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  flex-direction: column;
`;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
