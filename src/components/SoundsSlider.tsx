import React, { useEffect, useRef, useState } from 'react'
import sounds from '../model/data'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native'
import Video from 'react-native-video'
const { width, height } = Dimensions.get('window')

import CountdownTimer from './CountdownTimer'
import TimerControls from './TimerControls'

interface SoundsSliderProps {
  timerVisible: boolean
  setTimerVisible: (timerVisible: boolean) => void
}

export default function SoundsSlider({
  timerVisible,
  setTimerVisible,
}: SoundsSliderProps) {
  const scrollX = useRef(new Animated.Value(0)).current
  const [songIndex, setSongIndex] = useState(0)
  const soundsSliderRef = useRef(null)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [intentionalVideoPlay, setIntentionalVideoPlay] = useState(true)

  sounds[songIndex].playingSound.setVolume(0.9)
  sounds[songIndex].playingSound.setNumberOfLoops(-1)

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width)
      if (index === sounds.length) {
        // end of slides

        // scroll back to the top
        soundsSliderRef.current.scrollToOffset({
          offset: 0,
          animated: true,
        })
      } else {
        if (index !== songIndex) {
          if (sounds[songIndex].playingSound._playing) {
            // if previous sound if playing, stop it
            sounds[songIndex].playingSound.stop()
            // play the newly selected sound
            sounds[index].playingSound.play()
          }

          setSongIndex(index)
        }
      }
    })

    return () => {
      scrollX.removeAllListeners()
    }
  }, [scrollX, songIndex, playing])

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
  })

  const togglePlayback = () => {
    if (sounds[songIndex].playingSound._playing) {
      sounds[songIndex].playingSound.stop()
      setPlaying(false)
      setTimerVisible(false)
    } else {
      setPlaying(true)
      sounds[songIndex].playingSound.play((success) => {
        if (success) {
          console.log('successfully finished playing')
        } else {
          console.log('playback failed due to audio decoding errors')
        }
      })
    }
  }

  const renderSounds = () => {
    return (
      <View style={styles.cardContainer}>
        <Animated.View>
          <ImageBackground
            source={sounds[songIndex].videoPoster}
            resizeMode="cover"
            style={dynamicStyles.backgroundVideo}
          />
          <Video
            source={sounds[songIndex].videoBackground}
            // poster={sounds[songIndex].videoPoster}
            posterResizeMode={'cover'}
            style={dynamicStyles.backgroundVideo}
            muted={true}
            repeat={true}
            buffered={true}
            paused={!playing || !intentionalVideoPlay}
            resizeMode={'cover'}
            rate={0.5}
          />

          <View style={styles.powerControls}>
            <TouchableOpacity
              style={styles.powerIcon}
              onPress={() => togglePlayback()}
            >
              <Ionicons
                name={'power'}
                size={250}
                style={styles.powerIcon}
                color={
                  playing
                    ? 'rgba(0, 255, 0, 0.75)'
                    : 'rgba(255, 211, 105, 0.75)'
                }
              />
            </TouchableOpacity>
          </View>

          <View style={styles.timerCountdown}>
            {timerVisible ? (
              <View style={styles.timerCountdown}>
                <CountdownTimer
                  hours={hours}
                  minutes={minutes}
                  seconds={seconds}
                  togglePlayback={togglePlayback}
                  setTimerVisible={setTimerVisible}
                  timerControlsFontColor={
                    sounds[songIndex].timerControlsFontColor
                  }
                />
              </View>
            ) : (
              <View style={styles.timerCountdown}></View>
            )}
          </View>
        </Animated.View>
        <View style={styles.timerControls}>
          <TimerControls
            setTimerVisible={setTimerVisible}
            hours={hours}
            setHours={setHours}
            minutes={minutes}
            setMinutes={setMinutes}
            seconds={seconds}
            setSeconds={setSeconds}
            playing={playing}
            togglePlayback={togglePlayback}
            intentionalVideoPlay={intentionalVideoPlay}
            setIntentionalVideoPlay={setIntentionalVideoPlay}
            timerDialogBackgroundColor={
              sounds[songIndex].timerDialogBackgroundColor
            }
            timerDialogFontColor={sounds[songIndex].timerDialogFontColor}
          />
        </View>
      </View>
    )
  }

  return (
    <Animated.FlatList
      ref={soundsSliderRef}
      data={sounds}
      renderItem={renderSounds}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: { x: scrollX },
            },
          },
        ],
        { useNativeDriver: true }
      )}
    />
  )
}

// export const Wrapper = styled.View`
//   justify-content: space-between;
//   /* padding: 20px; */
//   align-items: center;
//   flex-direction: column;
// `;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexGrow: 0,
  },
  timerCountdown: {
    flexBasis: '25%',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerControls: {
    flexBasis: '18%',
    marginBottom: 15,
  },
  powerControls: {
    flexBasis: '57%',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.34,
    elevation: 3,
  },
  powerIcon: {
    opacity: 0.85,
    paddingTop: 30,
    paddingLeft: width / 37, // Ionicons don't centre properly without help
    height: '100%',
    borderRadius: 70,
  },
})
