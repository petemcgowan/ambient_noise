import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'

import { State } from '../redux/index'
import AmbientPlayer from '../screens/AmbientPlayer'
import OnboardingDeck from '../screens/OnboardingDeck'
const AppStack = createStackNavigator()

export default function CentralNavigation() {
  const hasSeenIntro = useSelector((state: State) => state.hasSeenIntro)
  // const hasSeenIntro = false

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* {!hasSeenIntro && (
          <AppStack.Screen name="Onboarding" component={Onboarding} />
        )} */}
        {!hasSeenIntro && (
          <AppStack.Screen name="OnboardingDeck" component={OnboardingDeck} />
        )}
        <AppStack.Screen name="AmbientPlayer" component={AmbientPlayer} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}
