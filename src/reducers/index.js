/* @flow */
import { combineReducers } from 'redux'
import auth, { type State as AuthState } from './auth'

export type State = {
  auth: AuthState
}

const originalReducer = combineReducers({
  auth
})

const RESET_ALL = 'root/reset-all'

export const resetAll = () => ({ type: RESET_ALL })

export default (state: State, action: any) => {
  if (action.type === RESET_ALL) {
    return originalReducer(undefined, action)
  } else {
    return originalReducer(state, action)
  }
}
