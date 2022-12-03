import Sound from 'react-native-sound';

export const knockOnSound = new Sound(
  'on2sample.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('failed to load the knock on sound', error);
      return;
    }
  },
);

export const knockOffSound = new Sound(
  'off2sample.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('failed to load the knock off sound', error);
      return;
    }
  },
);

const sounds = [
  {
    videoBackground: require('../../assets/videos/nightWavesAndSun.mp4'),
    playingSound: new Sound(
      'noise_brown_v3_131_600_tighter_slopes_mini.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the noise sound', error);
          return;
        }
      },
    ),
    // color: "#5f1ddd",
    id: '1',
  },
  {
    videoBackground: require('../../assets/videos/BigOceanWater.mp4'),
    playingSound: new Sound(
      'brown_900hz_lc_noise_mod_mini.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the noise sound', error);
          return;
        }
      },
    ),
    id: '2',
    // color: "#ffb77a",
  },
  {
    videoBackground: require('../../assets/videos/HotAirBalloonsFlaming.mp4'),
    playingSound: new Sound(
      'pink_brown_900hz_lc_noise_together_mini.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the noise sound', error);
          return;
        }
      },
    ),
    // color: "#CFE3E2",
    id: '3',
  },
  {
    videoBackground: require('../../assets/videos/WindowPlaneView.mp4'),
    playingSound: new Sound(
      'brown_900hz_lc_noise_mini.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the noise sound', error);
          return;
        }
      },
    ),
    // color: "#5f9fff",
    id: '4',
  },
];

export default sounds;
