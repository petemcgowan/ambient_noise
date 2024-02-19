import React, { useRef, useState } from 'react'
import ViewPager from 'react-native-pager-view'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

import Footer from '../components/Footer'
import Page from '../../components/onboarding/Page'

// const selectUnitsVideo = require('../../../assets/videos/onboarding/1_SelectUnits.mp4');
// const selectValuesVideo = require('../../../assets/videos/onboarding/2_SelectValues.mp4');
const launchScreenImage = require('../../../assets/images/onboarding/launch_screen.png')
const pinkNoiseImage = require('../../../assets/images/onboarding/1_PinkNoise2.png')
const brownNoiseImage = require('../../../assets/images/onboarding/2_BrownNoise2.png')
const howToUseVideo = require('../../../assets/videos/onboarding/3_HowToUse.mp4')
const howToTimerVideo = require('../../../assets/videos/onboarding/4_HowToTimer.mp4')

const Onboarding = () => {
  const pagerRef = useRef(null)
  const navigation = useNavigation()
  // const [pageNumber, setPageNumber] = useState(0)

  const handlePageChange = (pageNumber: number) => {
    pagerRef.current.setPage(pageNumber)
    // setPageNumber(pageNumber)
  }

  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
        <View key="1">
          <Page
            backgroundColor="#339c5e"
            // pageNumber={pageNumber}
            color="white"
            title="Welcome to Ambient Noise!"
            videoLink={null}
            imageLink={launchScreenImage}
            description="This app will help you sleep, study, block out noises and relax..."
          />
          <Footer
            backgroundColor="#07689f"
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(1)
            }}
          />
        </View>
        <View key="2">
          <Page
            backgroundColor="#339c5e"
            // pageNumber={pageNumber}
            color="pink"
            title="Pink Noise"
            videoLink={null}
            imageLink={pinkNoiseImage}
            description="Consists of all frequences audible to the human ear.  Energy is more intense at lower frequences"
          />
          <Footer
            backgroundColor="#07689f"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(0)
            }}
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(2)
            }}
          />
        </View>
        <View key="3">
          <Page
            backgroundColor="#339c5e"
            // pageNumber={pageNumber}
            color="Sienna"
            title="Brown Noise"
            videoLink={null}
            imageLink={brownNoiseImage}
            description="Most low frequency dominant.  Deeper and stronger than white/pink noise "
          />
          <Footer
            backgroundColor="#07689f"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(1)
            }}
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(3)
            }}
          />
        </View>
        <View key="4">
          <Page
            backgroundColor="#07689f"
            // pageNumber={pageNumber}
            color="white"
            title="Feel the noise"
            videoLink={howToUseVideo}
            imageLink={null}
            description="Swipe to change sounds. Click to start"
          />
          <Footer
            backgroundColor="#339c5e"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(2)
            }}
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(4)
            }}
          />
        </View>
        <View key="5">
          <Page
            backgroundColor="#07689f"
            // pageNumber={pageNumber}
            color="white"
            title="Use the Timer"
            videoLink={howToTimerVideo}
            imageLink={null}
            description="Hit the clock icon to set a timer for sleep"
          />
          <Footer
            backgroundColor="#339c5e"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(3)
            }}
            rightButtonLabel="Continue"
            rightButtonPress={() => {
              navigation.navigate('AmbientPlayer')
            }}
          />
        </View>
      </ViewPager>
    </View>
  )
}

export default Onboarding
