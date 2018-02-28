/* @flow */
import { buildActionCreator, createReducer } from 'hard-reducer'
const { createAction } = buildActionCreator({ prefix: 'firebaseAuth/' })

type FirebaseUser = {
  isAnonymous: boolean
}

export const authorizedWithCredential = createAction(
  'authorized',
  (credential: string) => credential
)

export const notAuthorized = createAction('not-authorized')

export const authStateChanged = createAction(
  'authStateChanged',
  (user: FirebaseUser | void) => user
)

// State

export type State = {
  authState: 'authWithCredential' | 'asAnonyomous' | 'noAuth',
  credential: string | null,
  currentUser: FirebaseUser | null
}

const initialState: State = {
  authState: 'noAuth',
  credential: null,
  currentUser: null
}

export default createReducer(initialState)
  .case(authStateChanged, (state, user) => {
    console.log('auth state change: reducer', user)
    if (user && user.isAnonymous) {
      return {
        ...state,
        authState: 'asAnonyomous',
        currentUser: user
      }
    } else if (user == null) {
      return {
        ...state,
        authState: 'noAuth',
        currentUser: user
      }
    } else {
      return {
        ...state,
        currentUser: user
      }
    }
  })
  .case(authorizedWithCredential, (state, payload) => {
    return {
      ...state,
      authState: 'authWithCredential',
      credential: payload
    }
  })
  .case(notAuthorized, state => {
    return {
      ...state,
      authState: 'noAuth',
      auth: null
    }
  })
