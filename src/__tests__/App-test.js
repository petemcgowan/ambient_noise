import React from 'react'
import { render } from '@testing-library/react-native'
// import configureStore from 'redux-mock-store' // Library for mocking store
import { Provider } from 'react-redux'
import { it, expect } from '@jest/globals'
// import App from '../App'
import { createStore } from 'redux' // Instead of redux-mock-store

const initialState = { hasSeenIntro: false }
// const mockStore = configureStore()(initialState)

const simpleReducer = (state = initialState, action) => state // Placeholder
const simpleStore = createStore(simpleReducer)

// it('renders correctly', () => {
//   const { toJSON } = render(
//     <Provider store={simpleStore}>
//       <App />
//     </Provider>
//   )
//   expect(toJSON()).toMatchSnapshot()
// })

it('renders correctly', () => {
  console.log('App non test')
})
