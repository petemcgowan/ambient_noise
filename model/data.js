import Sound from 'react-native-sound';

const sounds = [
  {
    title: 'Brown 900',
    artist: 'v3 Tighter Slopes',
    onImage: require('../assets/images/on/water_foamv2_on.jpg'),
    offImage: require('../assets/images/off/water_foamv2_off.jpg'),
    videoBackground: require('../assets/videos/nightWavesAndSun.mp4'),
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
    sound: 'noise_brown_v3_131_600_tighter_slopes_mini.mp3',
    // color: "#5f1ddd",
    id: '1',
  },
  {
    title: 'Brown 900',
    artist: 'LC MOD',
    onImage: require('../assets/images/on/cloudsv2_on.jpg'),
    offImage: require('../assets/images/off/cloudsv2_off.jpg'),
    videoBackground: require('../assets/videos/BigOceanWater.mp4'),
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
    sound: 'brown_900hz_lc_noise_mod_mini.mp3',
    id: '2',
    // color: "#ffb77a",
  },
  {
    title: 'PinkBrown',
    artist: 'LC Noise Together',
    onImage: require('../assets/images/on/HotAirLowerBalloonsInTheSkyv2_on.jpg'),
    offImage: require('../assets/images/off/HotAirLowerBalloonsInTheSkyv2_off.jpg'),
    videoBackground: require('../assets/videos/HotAirBalloonsFlaming.mp4'),
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
    sound: 'pink_brown_900hz_lc_noise_together_mini.mp3',
    // color: "#CFE3E2",
    id: '3',
  },
  {
    title: 'Brown 900',
    artist: 'LC Noise',
    onImage: require('../assets/images/on/blue_sky_field_of_wheat_on.jpg'),
    offImage: require('../assets/images/off/blue_sky_field_of_wheat_offv2.jpg'),
    videoBackground: require('../assets/videos/WindowPlaneView.mp4'),
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
    sound: 'brown_900hz_lc_noise_mini.mp3',
    // color: "#5f9fff",
    id: '4',
  },
];

export default sounds;
