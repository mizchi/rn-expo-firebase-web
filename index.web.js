/* @flow */
import { AppRegistry } from 'react-native'
import App from './App'

AppRegistry.registerComponent('App', () => App)
AppRegistry.runApplication('App', {
  rootTag: window.document.getElementById('react-root')
})
