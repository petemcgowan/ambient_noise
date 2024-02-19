import { hasSeenIntro } from '../HasSeenIntroReducer'
import { IntroAction } from '../../actions'
import { ActionType } from '../../action-types/index'

import { it, expect, describe } from '@jest/globals'

describe('hasSeenIntro reducer', () => {
  it('should return initial state', () => {
    expect(hasSeenIntro(undefined, {} as IntroAction)).toEqual(false)
  })

  it('should set hasSeenIntro to true on UPDATE_HAS_SEEN_INTRO_VALUE', () => {
    const updateAction: IntroAction = {
      type: ActionType.UPDATE_HAS_SEEN_INTRO_VALUE,
      payload: true,
    }
    expect(hasSeenIntro(false, updateAction)).toEqual(true)
  })
})
