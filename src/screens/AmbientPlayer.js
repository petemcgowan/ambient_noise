import React, { useEffect, useRef, useState } from 'react'
// import {Animated} from 'react-native';
// import Video from 'react-native-video';

import {
    SafeAreaView,
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
} from 'react-native'
import Sound from 'react-native-sound'

import sounds, { knockOnSound, knockOffSound } from '../model/data'
import { LogBox } from 'react-native'
import SoundsSlider from '../components/SoundsSlider'
import { actionCreators } from '../redux/index'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

Sound.setCategory('Playback')
const { width, height } = Dimensions.get('window')
// LogBox.ignoreLogs(['Sending']);
// LogBox.ignoreAllLogs();

const AmbientPlayer = () => {
    const [timerVisible, setTimerVisible] = useState(false)

    const [playing, setPlaying] = useState(false)

    const dispatch = useDispatch()
    const { updateHasSeenIntro } = bindActionCreators(actionCreators, dispatch)

    knockOnSound.setVolume(0.5)
    knockOffSound.setVolume(0.5)

    useEffect(() => {
        // Has seen intro, now turn off onboarding
        updateHasSeenIntro(true)
        console.log(
            'AmbientPlayer useEffect window width:' +
                width +
                '/height:' +
                height
        )
        console.log('SoundsSlider: useEffect')
    }, [])

    // const dynamicStyles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     backgroundColor: playing ? 'rgba(151, 65, 23, 1)' : 'rgba(34, 40, 48, 1)',
    //   },
    // });
    // <SafeAreaView style={dynamicStyles.container}>
    //   </SafeAreaView>
    // <View style={dynamicStyles.container}>
    return (
        <SoundsSlider
            playing={playing}
            setPlaying={setPlaying}
            timerVisible={timerVisible}
            setTimerVisible={setTimerVisible}
        />
    )
}

export default AmbientPlayer

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
