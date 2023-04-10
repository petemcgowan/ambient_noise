import React, { useEffect, useState } from 'react'

import Sound from 'react-native-sound'

import SoundsSlider from '../components/SoundsSlider'
import { actionCreators } from '../redux/index'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

Sound.setCategory('Playback')

const AmbientPlayer = () => {
  const [timerVisible, setTimerVisible] = useState(false)

  const dispatch = useDispatch()
  const { updateHasSeenIntro } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    // Has seen intro, now turn off onboarding
    updateHasSeenIntro(true)
  }, [])

  return (
    <SoundsSlider
      timerVisible={timerVisible}
      setTimerVisible={setTimerVisible}
    />
  )
}

export default AmbientPlayer
