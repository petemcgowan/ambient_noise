import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  Modal,
  Pressable,
  Alert,
  FlatList,
} from 'react-native';
import {SafeAreaView, View, Text, StyleSheet, Dimensions} from 'react-native';

import TrackPlayer, {
  useProgress,
  Capability,
  Event,
  State,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import RNBackdrop from './RNBackdrop';
import TimeLeftModal from './TimeLeftModal';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Slider from '@react-native-community/slider';
import sounds from '../model/data';
import {Animated} from 'react-native';
import {TimePicker} from 'react-native-simple-time-picker';

const {width, height} = Dimensions.get('window');

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.setVolume(0.35);
  // TODO: Apparently this isn't working but will work in future version of React Native Track Player
  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
  });
  await TrackPlayer.add(sounds);
};

// const useAudio = url => {
//   const [audio] = useState(new Audio(url));
//   const [playing, setPlaying] = useState(false);

//   const toggle = () => setPlaying(!playing);

//   useEffect(() => {
//     playing ? audio.play() : audio.pause();
//   }, [playing]);

//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false));
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false));
//     };
//   }, []);

//   return [playing, toggle];
// };
const AmbientPlayer = () => {
  // const audio = new Audio(
  //   'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
  // );
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const [trackOnImage, setTrackOnImage] = useState();
  const [trackOffImage, setTrackOffImage] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState('off');

  const soundsSlider = useRef(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [intendedPlaying, setIntendedPlaying] = useState(false);

  const [value, setValue] = useState(0);
  // const [playing, toggle] = useAudio(url);

  const togglePlayback = async playbackState => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    setIntendedPlaying(!intendedPlaying);
    console.log('intendedPlaying:' + intendedPlaying);

    if (currentTrack !== null) {
      if (playbackState === State.Paused || playbackState === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      console.log('useTrackPlayerEvents, Event.PlaybackTrackChanged');
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, onImage, offImage} = track;
      setTrackTitle(title);
      setTrackOnImage(onImage);
      setTrackOffImage(offImage);
    }
  });

  useTrackPlayerEvents([Event.PlaybackState], async event => {
    console.log('playbackState' + JSON.stringify(playbackState));
  });

  const handleChange = (value: {hours: number, minutes: number}) => {
    setHours(value.hours);
    setMinutes(value.minutes);
    console.log(
      'value.hours' + value.hours + ', value.minutes:' + value.minutes,
    );
  };

  Ionicons.loadFont();
  MaterialCommunityIcons.loadFont();

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  useEffect(() => {
    console.log('AmbientPlayer useEffect called');
    setupPlayer();
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      skipTo(index);
      setSongIndex(index);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, [scrollX]);

  // const skipToNext = () => {
  //   soundsSlider.current.scrollToOffset({
  //     offset: (songIndex + 1) * width,
  //   });
  // };

  // const skipToPrevious = () => {
  //   soundsSlider.current.scrollToOffset({
  //     offset: (songIndex - 1) * width,
  //   });
  // };

  const renderSounds = ({index, item}) => {
    return (
      <Animated.View
        style={{
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.imageWrapper}>
          {/* <View style={styles.powerControls}> */}
          <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
            <View
              style={
                {
                  // flexDirection: 'row',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                }
              }>
              {intendedPlaying ? (
                <ImageBackground
                  source={trackOnImage}
                  imageStyle={styles.image}
                  style={[
                    styles.image,
                    {justifyContent: 'center', alignItems: 'center'},
                  ]}>
                  <Ionicons
                    name={'power'}
                    size={200}
                    color={
                      intendedPlaying
                        ? 'rgba(255, 211, 105, 0.75)'
                        : 'rgba(0, 255, 0, 0.75)'
                    }
                  />
                </ImageBackground>
              ) : (
                <ImageBackground
                  source={trackOffImage}
                  imageStyle={styles.image}
                  style={[
                    styles.image,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <Ionicons
                    // name={'power-outline'}
                    name={'power'}
                    size={200}
                    color={
                      intendedPlaying
                        ? 'rgba(255, 211, 105, 0.75)'
                        : 'rgba(0, 255, 0, 0.75)'
                    }
                  />
                </ImageBackground>
              )}
            </View>
          </TouchableOpacity>
        </View>
        {/* </View> */}
        <View style={{width: width}} />
      </Animated.View>
    );
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: intendedPlaying
        ? // playbackState === State.Playing
          'rgba(151, 65, 23, 1)'
        : 'rgba(34, 40, 48, 1)',
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <View style={styles.mainContainer}>
        <View style={{width: width}}>
          <RNBackdrop />
          <Animated.FlatList
            ref={soundsSlider}
            data={sounds}
            renderItem={renderSounds}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {x: scrollX},
                  },
                },
              ],
              {useNativeDriver: true},
            )}
          />
        </View>

        {/* <View style={styles.powerControls}>
          <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
            <Ionicons
              // name={playbackState === State.Playing ? 'power' : 'power'}
              name={'power'}
              size={140}
              style={{marginTop: 25}}
              color={
                // playbackState === State.Playing
                intendedPlaying ? '#FFD369' : 'rgba(0, 255, 0, 0.65)'
              }
            />
          </TouchableOpacity>
        </View>*/}
      </View>
      {/* <TimeLeftModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        hours={hours}
        minutes={minutes}
        setHours={setHours}
        setMinutes={setMinutes}
      /> */}
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Set Countdown Timer</Text>
              <TimePicker
                textColor={'black'}
                value={{hours, minutes}}
                onChange={handleChange}
              />
              <View style={styles.modalBottomButtons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.textStyle}>Back</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Set Timer</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            {/* <Ionicons name="ellipsis-horizontal" size={90} color="#777777" /> */}
            {/* <Ionicons name="time-outline" size={80} color="#777777" /> */}
            <Ionicons name="timer-outline" size={90} color="#777777" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AmbientPlayer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    marginTop: 80,
    backgroundColor: 'rgba(122, 158, 199, 1)',
    // width: '80%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBottomButtons: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    width: '50%',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    // backgroundColor: 'rgba(122, 158, 199, 1)',
    backgroundColor: '#393E46',
    // borderWidth: 1,
  },
  textStyle: {
    color: '#777777',
    textAlign: 'center',
  },
  imageWrapper: {
    width: 360,
    height: 450,
    marginBottom: 15,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.34,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    borderRadius: 70,
  },
  powerControls: {
    flexDirection: 'row',
    width: '100%',
    // justifyContent: 'space-between',
    justifyContent: 'center',
    // marginTop: 15,
  },
  bottomContainer: {
    borderTopColor: '#393E46',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
  },
});