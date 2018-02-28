/* @flow */
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
// import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import createSecureStore from 'redux-persist-expo-securestore'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from '~/reducers'

const storage = createSecureStore()
const config = {
  key: 'root',
  storage
}

let _store
export default () => {
  if (_store) {
    return _store
  }

  const reducerPersisted = persistReducer(config, rootReducer)
  _store = createStore(
    reducerPersisted,
    applyMiddleware(promiseMiddleware, thunkMiddleware)
  )
  const _persistor = persistStore(_store) // TODO export
  return _store
}
