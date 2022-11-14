import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  Modal,
  Pressable,
  Alert,
  Animated,
} from 'react-native';
import {SafeAreaView, View, Text, StyleSheet, Dimensions} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Sound from 'react-native-sound';

// import RNBackdrop from './RNBackdrop';
import TimeLeftModal from './TimeLeftModal';

import Ionicons from 'react-native-vector-icons/Ionicons';
import sounds from '../model/data';
import {TimePicker} from 'react-native-simple-time-picker';

const {width} = Dimensions.get('window');
Sound.setCategory('Playback');

const AmbientPlayer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [timerVisible, setTimerVisible] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);

  const soundsSlider = useRef(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [playingSound, setPlayingSound] = useState(
    new Sound(sounds[songIndex].sound, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the noise sound', error);
        return;
      }
    }),
  );
  const knockOnSound = new Sound('on2sample.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the knock on sound', error);
      return;
    }
  });
  const knockOffSound = new Sound(
    'off2sample.mp3',
    Sound.MAIN_BUNDLE,
    error => {
      if (error) {
        console.log('failed to load the knock off sound', error);
        return;
      }
    },
  );
  const [intendedPlaying, setIntendedPlaying] = useState(false);

  playingSound.setVolume(0.9);
  knockOnSound.setVolume(1);
  knockOffSound.setVolume(1);
  playingSound.setNumberOfLoops(-1); // loop indefinitely

  const togglePlayback = index => {
    console.log('togglePlayback, intendedPlaying:' + intendedPlaying);
    if (!intendedPlaying) {
      knockOnSound.play();
      playingSound.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    } else {
      playingSound.pause();
      knockOffSound.play();
      console.log('pause called');
    }

    setIntendedPlaying(!intendedPlaying);
    console.log('intendedPlaying:' + intendedPlaying);
  };

  const handleChange = (value: {hours: number, minutes: number}) => {
    setHours(value.hours);
    setMinutes(value.minutes);
    console.log(
      'value.hours' + value.hours + ', value.minutes:' + value.minutes,
    );
  };

  useEffect(() => {
    console.log('AmbientPlayer useEffect called');

    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      if (index !== songIndex) {
        setSongIndex(index);
        console.log('Setting song index on swipe(Scrollx):' + index);
        setPlayingSound(
          new Sound(sounds[songIndex].sound, Sound.MAIN_BUNDLE, error => {
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }
          }),
        );
        playingSound.setVolume(0.8);
        playingSound.setNumberOfLoops(-1); // loop indefinitely
      } // songIndex compare
    });

    return () => {
      console.log('releasing sounds / listeners in useEffect');
      playingSound.release();
      scrollX.removeAllListeners();
    };
  }, [scrollX, playingSound, songIndex]);

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
          <TouchableOpacity onPress={() => togglePlayback(index)}>
            <View style={{}}>
              {intendedPlaying ? (
                <ImageBackground
                  source={sounds[index].onImage}
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
                  source={sounds[index].offImage}
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
        <View style={{width: width}} />
      </Animated.View>
    );
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: intendedPlaying
        ? 'rgba(151, 65, 23, 1)'
        : 'rgba(34, 40, 48, 1)',
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <View style={styles.mainContainer}>
        <View style={{width: width}}>
          {/* <RNBackdrop /> */}
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
        <View>
          {!!timerVisible && (
            <CountdownCircleTimer
              isPlaying
              duration={124}
              size={90}
              strokeWidth={3}
              colors={[
                '#4B3B40',
                '#82735C',
                '#9DB17C',
                '#9CDE9F',
                '#D1F5BE',
                '#3C91E6',
                '#9FD356',
                '#342E37',
                '#FA824C',
              ]}
              onComplete={() => {
                console.log('ON_COMPLETE BEFORE RETURN');
                return [true, 0];
              }}>
              {({remainingTime, animatedColor}) => (
                <Animated.Text style={{color: animatedColor}}>
                  <View style={styles.timer}>
                    <View style={styles.text}>
                      <Text>Remaining time</Text>
                    </View>
                    <View style={styles.value}>
                      <Text>{formatRemainingTime(remainingTime)}</Text>
                    </View>
                  </View>
                  {renderTime}
                </Animated.Text>
              )}
            </CountdownCircleTimer>
          )}
        </View>
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
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setTimerVisible(true);
                  }}>
                  <Text style={styles.textStyle}>Set Timer</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          {/* <TouchableOpacity onPress={playPause}> */}
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

const formatRemainingTime = time => {
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${minutes}:${seconds}`;
};

const renderTime = ({remainingTime}) => {
  if (remainingTime === 0) {
    return <View style={styles.timer}>Too late...</View>;
  }

  return (
    <View style={styles.timer}>
      <View style={styles.text}>Remaining time</View>
      <View style={styles.value}>{formatRemainingTime(remainingTime)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    // fontFamily: "Montserrat";
    // flexDirection: column;
    alignItems: 'center',
  },
  text: {
    color: '#ccc',
    fontSize: 10,
  },
  value: {
    fontSize: 12,
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
