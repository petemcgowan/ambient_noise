import Sound from 'react-native-sound'
import { Image } from 'react-native'

import videoPosterPath1 from '../../assets/images/posters/BigOceanWater.jpg'
import videoPosterPath2 from '../../assets/images/posters/WindowPlaneView.jpg'
import videoPosterPath3 from '../../assets/images/posters/HotAirBalloonatNightTurkey.jpg'
import videoPosterPath4 from '../../assets/images/posters/nightWavesAndSun.jpg'

const sounds = [
  {
    videoBackground: require('../../assets/videos/BigOceanWater.mp4'),
    videoPoster: require('../../assets/images/posters/BigOceanWater.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath1).uri,
    timerDialogBackgroundColor: '#136a53',
    timerDialogFontColor: '#d5e5ea',
    timerControlsFontColor: '#d5e5ea',
    playingSound: new Sound(
      'pink_brown_900hz_lc_noise_together_mini.mp3',
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load the ocean water sound', error)
          return
        }
      }
    ),
    id: '1',
    playing: false,
  },
  {
    videoBackground: require('../../assets/videos/WindowPlaneView.mp4'),
    videoPoster: require('../../assets/images/posters/WindowPlaneView.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath2).uri,
    timerDialogBackgroundColor: '#4d94ca',
    timerDialogFontColor: '#afb7ad',
    timerControlsFontColor: '#afb7ad',
    playingSound: new Sound(
      'brown_900hz_lc_noise_mini.mp3',
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load the plane window sound', error)
          return
        }
      }
    ),
    id: '2',
    playing: false,
  },
  {
    videoBackground: require('../../assets/videos/HotAirBalloonatNightTurkey.mp4'),
    videoPoster: require('../../assets/images/posters/HotAirBalloonatNightTurkey.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath3).uri,
    timerDialogBackgroundColor: '#47819d',
    timerDialogFontColor: '#faaf32',
    timerControlsFontColor: '#faaf32',
    playingSound: new Sound(
      'noise_brown_v3_131_600_tighter_slopes_mini.mp3',
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load the night in Turkey sound', error)
          return
        }
      }
    ),
    id: '3',
    playing: false,
  },
  {
    videoBackground: require('../../assets/videos/nightWavesAndSun.mp4'),
    videoPoster: require('../../assets/images/posters/nightWavesAndSun.jpg'),
    videoPosterUri: Image.resolveAssetSource(videoPosterPath4).uri,
    timerDialogBackgroundColor: '#2c5056',
    timerDialogFontColor: '#e4af91',
    timerControlsFontColor: '#e4af91',
    playingSound: new Sound(
      'brown_900hz_lc_noise_mod_mini.mp3',
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load the night waves sound', error)
          return
        }
      }
    ),
    id: '4',
    playing: false,
  },
]

export default sounds
