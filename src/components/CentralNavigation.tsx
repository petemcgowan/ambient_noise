import { NavigationContainer } from '@react-navigation/native'
// import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { useSelector } from 'react-redux'

import { State } from '../redux/index'
import AmbientPlayer from '../screens/AmbientPlayer'
import Onboarding from '../screens/onboarding/Onboarding'

const AppStack = createStackNavigator()

export default function CentralNavigation() {
  const hasSeenIntro = useSelector((state: State) => state.hasSeenIntro)

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!hasSeenIntro && (
          <AppStack.Screen name="Onboarding" component={Onboarding} />
        )}
        <AppStack.Screen name="AmbientPlayer" component={AmbientPlayer} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

// {!hasSeenIntro && (
//   <AppStack.Screen name="Onboarding" component={Onboarding} />
// )}

// <AppStack.Screen name="Onboarding" component={Onboarding} />
