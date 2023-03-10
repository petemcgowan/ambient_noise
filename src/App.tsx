import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { store, persistor } from './redux/store'
import SplashScreen from 'react-native-splash-screen'
import CentralNavigation from './components/CentralNavigation'

const App = () => {
    console.log('App:start')
    console.log('***Loading Fonts***')
    Ionicons.loadFont()

    useEffect(() => {
        console.log('App:useEffect')
        SplashScreen.hide()
    }, [])

    return (
        <Provider store={store}>
            <PersistGate
                loading={<Text>Loading...</Text>}
                persistor={persistor}
            >
                <CentralNavigation />
            </PersistGate>
        </Provider>
    )
}

export default App
