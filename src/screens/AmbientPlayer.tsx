import React, { useEffect, useState } from 'react'

import { Dimensions } from 'react-native'
import Sound from 'react-native-sound'

import { knockOnSound, knockOffSound } from '../model/data'
import SoundsSlider from '../components/SoundsSlider'
import { actionCreators } from '../redux/index'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

Sound.setCategory('Playback')
const { width, height } = Dimensions.get('window')

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
      'AmbientPlayer useEffect window width:' + width + '/height:' + height
    )
    console.log('SoundsSlider: useEffect')
  }, [])

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
