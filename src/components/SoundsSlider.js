import React, { useEffect, useRef, useState } from "react";
import sounds, { knockOnSound, knockOffSound } from "../model/data";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import Video from "react-native-video";
const { width, height } = Dimensions.get("window");
import styled from "styled-components/native";

import CountdownTimer from "./CountdownTimer";
import TimerControls from "./TimerControls";
// import SoundsSlider from './SoundsSlider';
import VideoBackground from "./VideoBackground";

export default function SoundsSlider({
  playing,
  setPlaying,
  played,
  setPlayed,
  timerVisible,
  setTimerVisible,
}) {
  console.log("SoundsSlider: start");
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const soundsSliderRef = useRef(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  sounds[songIndex].playingSound.setVolume(0.9);
  sounds[songIndex].playingSound.setNumberOfLoops(-1);
  console.log("Setting playing Sound volume:songIndex:" + songIndex);

  useEffect(() => {
    console.log("SoundsSlider useEffect called");
    console.log(
      "SoundsSlider useEffect window width:" + width + "/height:" + height
    );
    console.log(
      "SoundsSlider useEffect, videoBackground:" +
        sounds[songIndex].videoBackground +
        ", songIndex:" +
        songIndex
    );
    scrollX.addListener(({ value }) => {
      console.log("scrollX Listener, value:" + value + ", width:" + width);
      const index = Math.round(value / width);
      if (index !== songIndex) {
        if (sounds[songIndex].playingSound._playing) {
          // if previous sound if playing, stop it
          sounds[songIndex].playingSound.stop();
          // play the newly selected sound
          sounds[index].playingSound.play();
        }

        console.log(
          "SCROLLX:Setting song index on swipe():" +
            index +
            ", songIndex was:" +
            songIndex
        );
        setSongIndex(index);
      }
    });

    return () => {
      console.log("releasing sounds / listeners in useEffect");
      // TODO Do I really need this or does just pausing work?
      // sounds[songIndex].playingSound.release();
      // playingSound.release();
      scrollX.removeAllListeners();
    };
  }, [scrollX /*playingSound*/, songIndex, playing]);

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: playing ? "rgba(151, 65, 23, 1)" : "rgba(34, 40, 48, 1)",
    },
    backgroundVideo: {
      height: height,
      position: "absolute",
      top: 0,
      left: 0,
      alignItems: "stretch",
      bottom: 0,
      right: 0,
    },
  });

  const togglePlayback = () => {
    if (sounds[songIndex].playingSound._playing) {
      console.log("songIndex:" + songIndex + " is playing");
    } else {
      console.log("songIndex:" + songIndex + " is NOT playing");
    }

    if (sounds[songIndex].playingSound._playing) {
      sounds[songIndex].playingSound.stop();
      setPlaying(false);
      setTimerVisible(false);
      // TODO This isn't synchronized
      // knockOffSound.play();
      console.log("stop called");
    } else {
      // knockOnSound.play();
      setPlaying(true);
      console.log("play called for songIndex:" + songIndex);
      sounds[songIndex].playingSound.play((success) => {
        if (success) {
          console.log("successfully finished playing");
        } else {
          console.log("playback failed due to audio decoding errors");
        }
      });
    }
  };

  const onVideoError = () => {
    console.log("onVideoError has been called");
  };

  const onVideoLoaded = () => {
    console.log("onVideoLoaded has been called");
  };

  const renderSounds = ({ index, item }) => {
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
            posterResizeMode={"cover"}
            style={dynamicStyles.backgroundVideo}
            onError={onVideoError}
            muted={true}
            repeat={true}
            onLoad={onVideoLoaded}
            paused={!playing}
            resizeMode={"cover"}
            rate={0.7}
            // ignoreSilentSwitch={'obey'}
          />
          <View style={styles.powerControls}>
            {/* <View style={styles.powerControls}> */}
            <TouchableOpacity
              style={styles.powerIcon}
              onPress={() => togglePlayback()}
            >
              {/* <View> */}
              {playing ? (
                <Ionicons
                  name={"power"}
                  size={250}
                  style={styles.powerIcon}
                  // style={{paddingLeft: width / 24}}
                  color={
                    playing
                      ? "rgba(0, 255, 0, 0.75)"
                      : "rgba(255, 211, 105, 0.75)"
                  }
                />
              ) : (
                <Ionicons
                  // name={'power-outline'}
                  name={"power"}
                  size={250}
                  // style={{paddingLeft: width / 24}}
                  style={styles.powerIcon}
                  color={
                    playing
                      ? "rgba(0, 255, 0, 0.75)"
                      : "rgba(255, 211, 105, 0.75)"
                  }
                />
              )}
              {/* </View> */}
            </TouchableOpacity>
            {/* </View> */}
          </View>
          {/* <Wrapper> */}
          <View styles={styles.timerCountdown}>
            {timerVisible ? (
              <View style={styles.timerCountdown}>
                {/* <Text>Timer Is Visible</Text> */}
                <CountdownTimer
                  hours={hours}
                  setHours={setHours}
                  minutes={minutes}
                  setMinutes={setMinutes}
                  togglePlayback={togglePlayback}
                  setTimerVisible={setTimerVisible}
                />
              </View>
            ) : (
              <View style={styles.timerCountdown}>
                {/* <Text>Timer Is Hiding, like a big Jessy</Text> */}
              </View>
            )}
          </View>
          {/* </Wrapper> */}
        </Animated.View>
        <View styles={styles.timerControls}>
          <TimerControls
            timerVisible={timerVisible}
            setTimerVisible={setTimerVisible}
            hours={hours}
            setHours={setHours}
            minutes={minutes}
            setMinutes={setMinutes}
            playing={playing}
            togglePlayback={togglePlayback}
          />
        </View>
      </View>
    );
  };

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
  );
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
    flexBasis: "25%",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  timerControls: {
    flexBasis: "18%",
    marginBottom: 15,
  },
  powerControls: {
    // width: 360,
    flexBasis: "57%",
    width: width,
    justifyContent: "center",
    alignItems: "center",
    // height: 450,
    // marginBottom: 15,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.34,
    elevation: 3,
  },
  powerIcon: {
    // width: '100%',
    opacity: 0.85,
    paddingTop: 30,
    paddingLeft: width / 37, // Ionicons don't centre properly without help
    height: "100%",
    // alignItems: 'center',
    borderRadius: 70,
  },
  // powerControls: {
  //   flexDirection: 'row',
  //   width: '100%',
  //   // justifyContent: 'space-between',
  //   justifyContent: 'center',
  //   // marginTop: 15,
  // },
});
