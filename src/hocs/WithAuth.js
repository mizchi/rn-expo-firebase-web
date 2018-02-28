/* @flow */
import Expo from 'expo'
import { createElement } from 'react'
import { pure, compose, lifecycle } from 'recompose'
import connector from './connector'
import firebase from 'firebase'
import facebookConfig from '~/config/facebook'
import * as AuthActions from '~/reducers/auth'

export default compose(
  connector(s => s.auth, {
    ...AuthActions
  }),
  lifecycle({
    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        this.props.actions.authStateChanged(user)
      })
    }
  }),
  pure
)(props => {
  switch (props.authState) {
    case 'withCredential': {
      const commands = {
        async logout() {
          await firebase.auth().signOut()
        }
      }
      return createElement(props.withAuth, { commands })
    }
    case 'asAnonyomous': {
      const commands = {
        async logout() {
          await firebase.auth().signOut()
        }
      }
      return createElement(props.asAnonyomous, { commands })
    }
    case 'noAuth': {
      const commands = {
        async loginAsAnonymous() {
          try {
            await firebase.auth().signInAnonymously()
          } catch (error) {
            // Show toast message
            // Login failed because of trying count or server setting
            console.error(error)
          }
        },
        async loginToFacebook() {
          const {
            type,
            token
          } = await Expo.Facebook.logInWithReadPermissionsAsync(
            facebookConfig.APP_ID,
            {
              permissions: ['public_profile']
            }
          )

          if (type === 'success') {
            // Build Firebase credential with the Facebook access token.
            const credential = firebase.auth.FacebookAuthProvider.credential(
              token
            )

            // Sign in with credential from the Facebook user.
            try {
              await firebase.auth().signInWithCredential(credential)
              props.actions.authorized(credential)
            } catch (error) {
              // TODO: notify error
              props.actions.notAuthorized()
              console.error(error)
            }
          }
        }
      }
      return createElement(props.noAuth, { auth: props, commands })
    }
  }
})
