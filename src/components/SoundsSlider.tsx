import React, { useEffect, useRef, useState } from 'react'
import sounds from '../model/data'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  Animated,
  NativeModules,
} from 'react-native'

import Video from 'react-native-video'
import CountdownTimer from './CountdownTimer'
import TimerControls from './TimerControls'

const { width, height } = Dimensions.get('window')

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
  // const soundsSliderRef = useRef(null)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [intentionalVideoPlay, setIntentionalVideoPlay] = useState(true)

  sounds[songIndex].playingSound.setVolume(0.9)
  sounds[songIndex].playingSound.setNumberOfLoops(-1)

  useEffect(() => {
    if (Platform.OS === 'android') {
      NativeModules.ExoPlayerModule.preparePlaylist([
        'pink_brown_900hz_lc_noise_together_mini',
        'brown_900hz_lc_noise_mini',
        'noise_brown_v3_131_600_tighter_slopes_mini',
        'brown_900hz_lc_noise_mod_mini',
      ])
    }

    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width)
      if (index === sounds.length) {
        // end of slides
        console.log('END OF SLIDES', songIndex)
        // scroll back to the top
        // soundsSliderRef.current.scrollToOffset({
        //   offset: 0,
        //   animated: true,
        // })
      } else {
        if (index !== songIndex) {
          if (Platform.OS === 'android') {
            NativeModules.ExoPlayerModule.switchTrack(index)
          }

          if (Platform.OS === 'ios') {
            if (sounds[songIndex].playingSound._playing) {
              // if previous sound if playing, stop it
              sounds[songIndex].playingSound.stop()
              // play the newly selected sound
              sounds[index].playingSound.play()
            }
          }

          setSongIndex(index)
        }
      }
    })

    return () => {
      scrollX.removeAllListeners()
    }
  }, [scrollX, songIndex, playing])

  const togglePlayback = () => {
    if (Platform.OS === 'android') {
      NativeModules.ExoPlayerModule.isTrackPlaying((isPlaying: boolean) => {
        if (isPlaying) {
          NativeModules.ExoPlayerModule.pauseTrack()
          setPlaying(false)
          if (timerVisible) setTimerVisible(false)
        } else {
          setPlaying(true)
          NativeModules.ExoPlayerModule.playTrack()
        }
      })
    }

    if (Platform.OS === 'ios') {
      if (sounds[songIndex].playingSound._playing) {
        sounds[songIndex].playingSound.stop()
        setPlaying(false)
        if (timerVisible) setTimerVisible(false)
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
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true } // Set to false, adjust according to your needs
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {sounds.map((video, index) => (
          <View style={styles.videoContainer} key={index}>
            {Platform.OS === 'ios' && (
              <Video
                source={video.videoBackground}
                style={styles.video}
                muted={true}
                volume={0.5}
                rate={0.6}
                repeat={true}
                // buffered={true}
                paused={!playing || !intentionalVideoPlay}
                resizeMode="cover"
              />
            )}
            {Platform.OS === 'android' && (
              <Video
                source={video.videoBackground}
                style={styles.video}
                poster={sounds[songIndex].videoPosterUri}
                posterResizeMode="cover"
                muted={true}
                volume={0.5}
                rate={0.6}
                repeat={true}
                // buffered={true}
                paused={!playing || !intentionalVideoPlay}
                resizeMode="cover"
              />
            )}
          </View>
        ))}
      </Animated.ScrollView>
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
              playing ? 'rgba(11, 57, 84, 1)' : 'rgba(191, 215, 234, 0.75)'
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
              timerControlsFontColor={sounds[songIndex].timerControlsFontColor}
            />
          </View>
        ) : (
          <View style={styles.timerCountdown}></View>
        )}
      </View>
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
          songIndex={songIndex}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerCountdown: {
    flexBasis: '20%',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: '20%', // Adjusted according to the actual size of timerControls
    right: 0,
  },
  timerControls: {
    flexBasis: '18%',
    marginBottom: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  scrollView: {
    height: height * 0.7,
    flexDirection: 'row',
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
  powerControls: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    marginRight: width * 0.2,
    marginLeft: width * 0.2,
    justifyContent: 'flex-start',
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
  videoContainer: {
    width: width - 1,
    height: height,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  powerIcon: {
    opacity: 0.85,
    paddingTop: 20,
    height: '100%',
    borderRadius: 70,
  },
})
