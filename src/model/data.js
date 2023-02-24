import Sound from "react-native-sound";
// import VideoBackground from "../components/VideoBackground";
import React from "react";

export const knockOnSound = new Sound(
  "on2sample.mp3",
  Sound.MAIN_BUNDLE,
  (error) => {
    if (error) {
      console.log("failed to load the knock on sound", error);
      return;
    }
  }
);

export const knockOffSound = new Sound(
  "off2sample.mp3",
  Sound.MAIN_BUNDLE,
  (error) => {
    if (error) {
      console.log("failed to load the knock off sound", error);
      return;
    }
  }
);

const sounds = [
  {
    videoBackground: require("../../assets/videos/HotAirBalloonatNightTurkey.mp4"),
    // videoBackground2: (
    //   <VideoBackground
    //     videoBackground={require("../../assets/videos/HotAirBalloonatNightTurkey.mp4")}
    //     playing={false}
    //   />
    // ),
    videoPoster: require("../../assets/images/posters/HotAirBalloonatNightTurkey.jpg"),
    videoPosterRemote:
      "https://ambientnoise.s3.amazonaws.com/videoPosters/HotAirBalloonatNightTurkey.jpg",
    timerDialogBackgroundColor: "#47819d",
    timerDialogFontColor: "#faaf32",
    timerControlsFontColor: "#faaf32",
    playingSound: new Sound(
      "noise_brown_v3_131_600_tighter_slopes_mini.mp3",
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log("failed to load the noise sound", error);
          return;
        }
      }
    ),
    // color: "#5f1ddd",
    id: "1",
  },
  {
    videoBackground: require("../../assets/videos/nightWavesAndSun.mp4"),
    // videoBackground2: (
    //   <VideoBackground
    //     videoBackground={require("../../assets/videos/nightWavesAndSun.mp4")}
    //     playing={false}
    //   />
    // ),
    videoPoster: require("../../assets/images/posters/nightWavesAndSun.jpg"),
    videoPosterRemote:
      "https://ambientnoise.s3.amazonaws.com/videoPosters/nightWavesAndSun.jpg",
    timerDialogBackgroundColor: "#2c5056",
    timerDialogFontColor: "#e4af91",
    timerControlsFontColor: "#e4af91",
    playingSound: new Sound(
      "brown_900hz_lc_noise_mod_mini.mp3",
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log("failed to load the noise sound", error);
          return;
        }
      }
    ),
    id: "2",
    // color: "#ffb77a",
  },
  {
    videoBackground: require("../../assets/videos/BigOceanWater.mp4"),
    // videoBackground2: (
    //   <VideoBackground
    //     videoBackground={require("../../assets/videos/BigOceanWater.mp4")}
    //     playing={false}
    //   />
    // ),
    videoPoster: require("../../assets/images/posters/BigOceanWater.jpg"),
    videoPosterRemote:
      "https://ambientnoise.s3.amazonaws.com/videoPosters/BigOceanWater.jpg",
    timerDialogBackgroundColor: "#136a53",
    timerDialogFontColor: "#d5e5ea",
    timerControlsFontColor: "#d5e5ea",
    playingSound: new Sound(
      "pink_brown_900hz_lc_noise_together_mini.mp3",
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log("failed to load the noise sound", error);
          return;
        }
      }
    ),
    // color: "#CFE3E2",
    id: "3",
  },
  {
    videoBackground: require("../../assets/videos/WindowPlaneView.mp4"),
    // videoBackground2: (
    //   <VideoBackground
    //     videoBackground={require("../../assets/videos/WindowPlaneView.mp4")}
    //     playing={false}
    //   />
    // ),
    videoPoster: require("../../assets/images/posters/WindowPlaneView.jpg"),
    videoPosterRemote:
      "https://ambientnoise.s3.amazonaws.com/videoPosters/WindowPlaneView.jpg",
    timerDialogBackgroundColor: "#4d94ca",
    timerDialogFontColor: "#afb7ad",
    timerControlsFontColor: "#afb7ad",
    playingSound: new Sound(
      "brown_900hz_lc_noise_mini.mp3",
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log("failed to load the noise sound", error);
          return;
        }
      }
    ),
    // color: "#5f9fff",
    id: "4",
  },
];

export default sounds;
