import React, { useState, useEffect, useRef, useContext } from 'react'
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import SlideComponent from '../components/SlideComponent'
import BottomSheet from 'reanimated-bottom-sheet'
import { State } from '../redux/index'
import { useSelector } from 'react-redux'

const launchScreenImage = require('../../assets/images/onboarding/launch_screen.png')
const pinkNoiseImage = require('../../assets/images/onboarding/PinkNoiseSquare.png')
const brownNoiseImage = require('../../assets/images/onboarding/BrownSquarev2.jpg')
const howToUseVideo = require('../../assets/videos/onboarding/OceanIntroVideo_Use.mp4')
const howToTimerVideo = require('../../assets/videos/onboarding/FireIntroVideo_Timer.mp4')

const { width, height } = Dimensions.get('window')

const slides = [
  {
    component: SlideComponent,
    title: 'Welcome to Ambient Noise',
    type: 'image',
    description:
      'This app will help you • sleep • study • block out noise  • relax...\n\n',
    image: launchScreenImage,
    videoLink: null,
    color: 'rgb(38, 27, 21)',
  },
  {
    component: SlideComponent,
    title: 'Pink Noise',
    type: 'image',
    description: `Sounds like: • Gentle River Flow • Soft rumbling thunder • Strong waterfalls • Ocean Waves\n\nUse it for: • Relaxation • A sleep aid • Noise blocking • Improved focus`,
    image: pinkNoiseImage,
    videoLink: null,
    color: 'rgb(9, 21, 39)',
  },
  {
    component: SlideComponent,
    title: 'Brown Noise',
    type: 'image',
    description:
      'Sounds like: • Rainfall • Distant Traffic • Rustling Leaves • Wind  \n\nUse it for: • Falling asleep faster • Staying asleep longer • Blocking noise • Improving memory',
    image: brownNoiseImage,
    videoLink: null,
    color: 'rgb(25, 26, 29)',
  },
  {
    component: SlideComponent,
    title: 'Feel the noise',
    type: 'video',
    description: `Swipe to change sounds. Click power to start.  Click video to stop video`,
    image: null,
    videoLink: howToUseVideo,
    color: 'rgb(25, 26, 29)',
  },
  {
    component: SlideComponent,
    title: 'Use the Timer',
    type: 'video',
    description: 'Hit the clock icon to set a timer for sleep',
    image: null,
    videoLink: howToTimerVideo,
    color: 'rgb(38, 27, 21)',
  },
]

const OnboardingDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const navigation = useNavigation()
  const [backgroundColor, setBackgroundColor] = useState('#000')
  const hasSeenIntro = useSelector((state: State) => state.hasSeenIntro)
  // const hasSeenIntro = false
  const onScroll = (event: any) => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    )
    if (slide !== activeSlide) {
      setActiveSlide(slide)

      if (slide > slides.length - 1) {
        console.log('Slides end reached')
      } else {
        setBackgroundColor(slides[slide].color)
        console.log('slides[slide].color:' + slides[slide].color)
      }
    }
  }

  const onStartNowPress = () => {
    navigation.navigate('AmbientPlayer')
  }

  useEffect(() => {}, [])

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <View style={styles.topContainer}>
        <ScrollView
          style={styles.scrollView}
          horizontal
          pagingEnabled
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          {slides.map((slide, index) => {
            const SlideComponent = slide.component
            return (
              <SlideComponent
                type={slide.type}
                key={index}
                title={slide.title}
                description={slide.description}
                image={slide.image}
                videoLink={slide.videoLink}
                hasSeenIntro={hasSeenIntro}
              />
            )
          })}
        </ScrollView>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <Text
              key={index}
              style={index === activeSlide ? styles.activeDot : styles.dot}
            >
              •
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={onStartNowPress}>
          <Text style={styles.buttonText}>Start Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'space-around',
  },
  topContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 0.72,
    paddingTop: height * 0.02,
    // flex: 0.82,
  },
  bottomContainer: {
    flex: 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: width * 0.6,
    height: height * 0.06,
    backgroundColor: 'rgb(76, 175, 80)',
    paddingHorizontal: width * 0.05,
    marginBottom: width * 0.05,
    borderRadius: 30,
    elevation: 5, // for Android
    shadowOffset: {
      // for iOS
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flex: 0.08,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  dot: {
    fontSize: RFPercentage(6.8),
    color: '#888',
    marginHorizontal: width * 0.02,
  },
  activeDot: {
    fontSize: RFPercentage(6.8),
    color: '#FFF',
    marginHorizontal: width * 0.02,
  },
  buttonText: {
    color: '#FFF',
    fontSize: RFPercentage(2.7),
    textAlign: 'center',
  },
})

export default OnboardingDeck
