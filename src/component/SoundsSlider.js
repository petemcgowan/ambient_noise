import React, {useRef} from 'react';
import sounds, {knockOnSound, knockOffSound} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';

const {width} = Dimensions.get('window');

export default function SoundsSlider({
  scrollX,
  songIndex,
  playing,
  setPlaying,
}) {
  const soundsSliderRef = useRef(null);

  const togglePlayback = index => {
    if (sounds[songIndex].playingSound._playing) {
      console.log('songIndex:' + songIndex + ' is playing');
    } else {
      console.log('songIndex:' + songIndex + ' is NOT playing');
    }

    if (sounds[songIndex].playingSound._playing) {
      sounds[songIndex].playingSound.stop();
      setPlaying(false);
      knockOffSound.play();
      console.log('stop called');
    } else {
      knockOnSound.play();
      setPlaying(true);
      console.log('play called for index songIndex:' + songIndex);
      sounds[songIndex].playingSound.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  };

  const renderSounds = ({index, item}) => {
    return (
      <Animated.View>
        <View style={styles.imageWrapper}>
          {/* <View style={styles.powerControls}> */}
          <TouchableOpacity onPress={() => togglePlayback(index)}>
            <View>
              {playing ? (
                <Ionicons
                  name={'power'}
                  size={250}
                  style={styles.image}
                  color={
                    playing
                      ? 'rgba(0, 255, 0, 0.75)'
                      : 'rgba(255, 211, 105, 0.75)'
                  }
                />
              ) : (
                <Ionicons
                  // name={'power-outline'}
                  name={'power'}
                  size={250}
                  style={styles.image}
                  color={
                    playing
                      ? 'rgba(0, 255, 0, 0.75)'
                      : 'rgba(255, 211, 105, 0.75)'
                  }
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={{width: width}} />
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      ref={soundsSliderRef}
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
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    opacity: 0.85,
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
  imageWrapper: {
    // width: 360,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
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
});
