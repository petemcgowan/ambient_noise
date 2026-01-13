import React, {useState, useMemo, useEffect} from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
import PagerView from 'react-native-pager-view'
import TimerControls from '../components/TimerControls'
import CountdownTimer from '../components/CountdownTimer'
import {Ionicons} from '@react-native-vector-icons/ionicons'
import Video, {ResizeMode} from 'react-native-video'
import {useInstantPlayer} from '../hooks/useInstantPlayer'
import {StatusBadge} from './StatusBadge' // <--- We need this back
import {useSelector} from 'react-redux' // <--- RESTORED
import {getLocalPath} from '../services/FileService' // <--- RESTORED

const {width, height} = Dimensions.get('window')

// --- SUB-COMPONENT ---
const SlideItem = ({
  item,
  index,
  activeIndex,
  isPlaying,
  intentionalVideoPlay,
  downloadedFiles, // <--- RESTORED PROP
}) => {
  const isCurrent = index === activeIndex
  const showVideoComponent = isCurrent

  // RESTORED: Logic to switch between Local File and HLS Stream
  const source = useMemo(() => {
    // 1. Check Disk Cache (This is what makes it Offline Ready)
    if (item.videoFile?.uri && downloadedFiles[item.videoFile.uri]) {
      return {uri: 'file://' + getLocalPath(item.videoFile.uri)}
    }
    // 2. HLS Stream (Fallback)
    if (item.hlsPlaylist?.uri) {
      return item.hlsPlaylist
    }
    // 3. Fallback URL
    return item.videoFile ? item.videoFile : {uri: item.videoFile?.uri}
  }, [item, downloadedFiles])

  // Determine Local Status for the Badge
  // If the video is on disk, we are offline ready.
  const isLocal = !!(item.videoFile?.uri && downloadedFiles[item.videoFile.uri])
  console.log('isLocal:', isLocal)
  console.log(
    'downloadedFiles[item.videoFile.uri]:',
    downloadedFiles[item.videoFile.uri],
  )

  // Resolve Poster
  const posterSource = item.videoPoster
    ? item.videoPoster
    : {uri: item.videoPosterUri}

  return (
    <View style={styles.videoContainer}>
      {/* LAYER 1: POSTER */}
      <Image source={posterSource} style={styles.video} resizeMode="cover" />

      {/* LAYER 2: VIDEO */}
      {showVideoComponent && source && (
        <Video
          source={source}
          style={styles.absoluteVideo}
          resizeMode={ResizeMode.COVER}
          muted={true}
          repeat={true}
          ignoreSilentSwitch="ignore"
          playInBackground={false}
          playWhenInactive={false}
          paused={!isPlaying || !intentionalVideoPlay}
        />
      )}

      {/* RESTORED STATUS BADGE */}
      {isCurrent && <StatusBadge isLocal={isLocal} isVisible={isCurrent} />}
    </View>
  )
}

interface CategorySliderProps {
  data: any[]
  isActiveCategory: boolean
  title: string
  isPlaying: boolean
  onTogglePlay: (playing: boolean) => void
}

const CategorySlider = ({
  data,
  isActiveCategory,
  title,
  isPlaying,
  onTogglePlay,
}: CategorySliderProps) => {
  const [songIndex, setSongIndex] = useState(0)
  const [intentionalVideoPlay, setIntentionalVideoPlay] = useState(true)

  // RESTORED: Get cache state from Redux
  // @ts-ignore
  const downloadedFiles = useSelector(state => state.cache.downloadedFiles)

  // Timer State
  const [timerVisible, setTimerVisible] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const togglePlayback = (forcePlay?: boolean) => {
    let newState
    if (typeof forcePlay === 'boolean') {
      newState = forcePlay
    } else {
      newState = !isPlaying
    }

    onTogglePlay(newState)

    if (timerVisible && !newState) {
      setTimerVisible(false)
      setHours(0)
      setMinutes(0)
      setSeconds(0)
    }
  }

  useInstantPlayer(data[songIndex], isPlaying, data[songIndex].volume || 1.0)

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        orientation="horizontal"
        onPageSelected={e => setSongIndex(e.nativeEvent.position)}>
        {data.map((item, index) => {
          if (Math.abs(songIndex - index) > 1) return <View key={index} />

          return (
            <View style={styles.page} key={index}>
              <SlideItem
                item={item}
                index={index}
                activeIndex={songIndex}
                isPlaying={isPlaying}
                intentionalVideoPlay={intentionalVideoPlay}
                downloadedFiles={downloadedFiles} // <--- Pass it down
              />
            </View>
          )
        })}
      </PagerView>

      {/* CONTROLS OVERLAY */}
      <View style={styles.powerControls}>
        <TouchableOpacity
          style={styles.powerIcon}
          onPress={() => togglePlayback()}>
          <Ionicons
            name={'power'}
            size={250}
            style={styles.powerIcon}
            color={
              isPlaying ? 'rgba(191, 215, 234, 0.75)' : 'rgba(11, 57, 84, 1)'
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.timerCountdown}>
        {timerVisible && (
          <CountdownTimer
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            togglePlayback={togglePlayback}
            setTimerVisible={setTimerVisible}
            timerControlsFontColor={data[songIndex]?.timerControlsFontColor}
          />
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
          playing={isPlaying}
          togglePlayback={togglePlayback}
          intentionalVideoPlay={intentionalVideoPlay}
          setIntentionalVideoPlay={setIntentionalVideoPlay}
          timerDialogBackgroundColor={
            data[songIndex]?.timerDialogBackgroundColor
          }
          timerDialogFontColor={data[songIndex]?.timerDialogFontColor}
          songIndex={songIndex}
          rainSounds={data}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'black'},
  pagerView: {flex: 1, width: '100%', height: '100%'},
  page: {flex: 1},
  videoContainer: {flex: 1, width: '100%', height: '100%'},
  video: {width: '100%', height: '100%'},
  absoluteVideo: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  timerCountdown: {
    flexBasis: '20%',
    marginBottom: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: '20%',
    right: 0,
  },
  timerControls: {
    flexBasis: '18%',
    marginBottom: height * 0.045,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
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
    marginTop: height * 0.02,
    justifyContent: 'flex-start',
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  powerIcon: {
    opacity: 0.85,
    paddingTop: height * 0.02,
    height: '100%',
    borderRadius: 70,
  },
})

export default CategorySlider
