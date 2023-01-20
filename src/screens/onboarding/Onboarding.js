import ViewPager from "@react-native-community/viewpager";
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { View } from "react-native";

import Footer from "../../components/onboarding/Footer";
import Page from "../../components/onboarding/Page";

// const selectUnitsVideo = require('../../../assets/videos/onboarding/1_SelectUnits.mp4');
// const selectValuesVideo = require('../../../assets/videos/onboarding/2_SelectValues.mp4');
const launchScreenImage = require("../../../assets/images/onboarding/launch_screen.png");
const pinkNoiseImage = require("../../../assets/images/onboarding/1_PinkNoise2.png");
const brownNoiseImage = require("../../../assets/images/onboarding/2_BrownNoise2.png");
const useHelpVideo = require("../../../assets/videos/onboarding/3_HowToUse.mp4");
const getResultsVideo = require("../../../assets/videos/onboarding/4_HowToTimer.mp4");

const Onboarding = () => {
  const pagerRef = useRef(null);
  const navigation = useNavigation();

  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };

  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
        <View key="1">
          <Page
            backgroundColor="#339c5e"
            title="Ambient Noise"
            videoLink={null}
            imageLink={launchScreenImage}
            description="Welcome!  This app will help you study, sleep, block out noises and relax..."
          />
          <Footer
            backgroundColor="#07689f"
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(1);
            }}
          />
        </View>
        <View key="2">
          <Page
            backgroundColor="#339c5e"
            title="Pink Noise"
            videoLink={null}
            imageLink={pinkNoiseImage}
            description="Consists of all frequences that are audible to the human ear.  Energy is more intense at lower frequences"
          />
          <Footer
            backgroundColor="#07689f"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(0);
            }}
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(2);
            }}
          />
        </View>
        <View key="3">
          <Page
            backgroundColor="#339c5e"
            title="Brown Noise"
            videoLink={null}
            imageLink={brownNoiseImage}
            description="Higher energy at lower frequencies.  Deeper and stronger than white noise "
          />
          <Footer
            backgroundColor="#07689f"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(1);
            }}
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(3);
            }}
          />
        </View>
        <View key="4">
          <Page
            backgroundColor="#07689f"
            title="Use the system"
            videoLink={useHelpVideo}
            imageLink={null}
            description="Use the system Description"
          />
          <Footer
            backgroundColor="#339c5e"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(2);
            }}
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(4);
            }}
          />
        </View>
        <View key="5">
          <Page
            backgroundColor="#07689f"
            title="Use the Timer"
            videoLink={getResultsVideo}
            imageLink={null}
            description="Use The Timer description"
          />
          <Footer
            backgroundColor="#339c5e"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(2);
            }}
            rightButtonLabel="Continue"
            rightButtonPress={() => {
              navigation.navigate("AmbientPlayer");
            }}
          />
        </View>
      </ViewPager>
    </View>
  );
};

export default Onboarding;
