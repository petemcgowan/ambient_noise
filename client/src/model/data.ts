import {Image} from 'react-native'

import noisePosterPath1 from '../../assets/images/posters/BigOceanWater.jpg'
import noisePosterPath2 from '../../assets/images/posters/WindowPlaneView.jpg'
import noisePosterPath3 from '../../assets/images/posters/bigBalloonDay1080_1920_60fps.jpeg'
import noisePosterPath4 from '../../assets/images/posters/waves_and_rocks_1080_1920_30fps.jpeg'

import * as Assets from './AudioAssets'

const noiseSounds = [
  {
    id: 'noise-1',
    // Video Data
    videoFile: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/OceanWater-1080_1920_24fps.mp4`,
    },
    hlsPlaylist: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/welcome/BigOceanWater.m3u8`,
    },
    videoFileSize: 19476185,
    videoPoster: require('../../assets/images/posters/BigOceanWater.jpg'),
    videoPosterUri: Image.resolveAssetSource(noisePosterPath1).uri,

    // UI Colors
    timerDialogBackgroundColor: '#136a53',
    timerDialogFontColor: '#d5e5ea',
    timerControlsFontColor: '#d5e5ea',

    audioFile: Assets.NoisePink,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/pink_brown_900hz_lc_noise_together_mini.ogg',
    volume: 0.6,
  },
  {
    id: 'noise-2',
    videoFile: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/Airplane_1080_1920_30fps.mp4`,
    },
    hlsPlaylist: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/welcome/WindowPlaneView.m3u8`,
    },
    videoFileSize: 13590068,
    videoPoster: require('../../assets/images/posters/WindowPlaneView.jpg'),
    videoPosterUri: Image.resolveAssetSource(noisePosterPath2).uri,

    timerDialogBackgroundColor: '#47819d',
    timerDialogFontColor: '#afb7ad',
    timerControlsFontColor: '#afb7ad',

    audioFile: Assets.NoiseBrown1,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/brown_900hz_lc_noise_mini.ogg',
    volume: 0.6,
  },
  {
    id: 'noise-3',
    videoFile: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/bigBalloonDay1080_1920_60fps.mp4`,
    },
    hlsPlaylist: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/welcome/bigBalloonDay1080_1920_60fps.m3u8`,
    },
    videoFileSize: 12057604,
    videoPoster: require('../../assets/images/posters/bigBalloonDay1080_1920_60fps.jpeg'),
    videoPosterUri: Image.resolveAssetSource(noisePosterPath3).uri,

    timerDialogBackgroundColor: '#47819d',
    timerDialogFontColor: '#faaf32',
    timerControlsFontColor: '#faaf32',

    audioFile: Assets.NoiseBrown2,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/noise_brown_v3_131_600_tighter_slopes_mini.ogg',
    volume: 0.6,
  },
  {
    id: 'noise-4',
    videoFile: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/waves_and_rocks_1080_1920_30fps.mp4`,
    },
    hlsPlaylist: {
      uri: `https://d2lxk2a39jwsfn.cloudfront.net/hls/welcome/waves_and_rocks_1080_1920_30fps.m3u8`,
    },
    videoFileSize: 9769331,
    videoPoster: require('../../assets/images/posters/waves_and_rocks_1080_1920_30fps.jpeg'),
    videoPosterUri: Image.resolveAssetSource(noisePosterPath4).uri,

    timerDialogBackgroundColor: 'rgb(38, 27, 21)',
    timerDialogFontColor: '#fff',
    timerControlsFontColor: '#fff',

    audioFile: Assets.NoiseBrown3,
    remoteAudioUrl:
      'https://d2lxk2a39jwsfn.cloudfront.net/audio/brown_900hz_lc_noise_mod_mini.ogg',
    volume: 0.6,
  },
]

export default noiseSounds
