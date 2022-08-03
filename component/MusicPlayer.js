import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  Image,
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
  RepeatMode,
  State,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import RNBackdrop from './RNBackdrop';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
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

const togglePlayback = async playbackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack !== null) {
    if (playbackState === State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
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
const MusicPlayer = () => {
  // const audio = new Audio(
  //   'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
  // );
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const [trackImage, setTrackImage] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState('off');

  const soundsSlider = useRef(null);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);

  const [value, setValue] = React.useState(0);
  // const [playing, toggle] = useAudio(url);

  const handleChange = (value: {hours: number, minutes: number}) => {
    setHours(value.hours);
    setMinutes(value.minutes);
    console.log(
      'value.hours' + value.hours + ', value.minutes:' + value.minutes,
    );
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, image} = track;
      setTrackTitle(title);
      setTrackImage(image);
    }
  });

  Ionicons.loadFont();
  MaterialCommunityIcons.loadFont();

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  useEffect(() => {
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
          <Image source={trackImage} style={styles.image} />
        </View>
      </Animated.View>
    );
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        playbackState === State.Playing
          ? 'rgba(151, 65, 23, 1)'
          : 'rgba(34, 40, 48, 1)',
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <View style={styles.mainContainer}>
        <View style={{width: width}}>
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

        <View style={styles.powerControls}>
          <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
            <Ionicons
              name={playbackState === State.Playing ? 'power' : 'power'}
              size={140}
              style={{marginTop: 25}}
              color={
                playbackState === State.Playing
                  ? '#FFD369'
                  : 'rgba(0, 255, 0, 0.65)'
              }
            />
          </TouchableOpacity>
        </View>
      </View>
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
            <Text style={styles.modalText}>Countdown Timer (on)</Text>
            <TimePicker
              textColor={'black'}
              value={{hours, minutes}}
              onChange={handleChange}
            />
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
      </Modal>

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

export default MusicPlayer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  imageWrapper: {
    width: 220,
    height: 280,
    marginBottom: 15,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#EEEEEE',
  },
  progressContainer: {
    height: 40,
    width: 350,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLabelContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelTxt: {
    color: '#fff',
  },
  powerControls: {
    flexDirection: 'row',
    width: '100%',
    // justifyContent: 'space-between',
    justifyContent: 'center',
    // marginTop: 15,
  },
  artist: {
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
    color: '#EEEEEE',
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
