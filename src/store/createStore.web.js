/* @flow */
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
// import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from '~/reducers'

let _store
export default () => {
  if (_store) {
    return _store
  }

  _store = createStore(
    // reducerPersisted,
    rootReducer,
    applyMiddleware(loggerMiddleware, promiseMiddleware, thunkMiddleware)
  )
  // const _persistor = persistStore(_store) // TODO export
  return _store
}
