/* @flow */
import { createElement } from 'react'
import { pure, compose, lifecycle } from 'recompose'
import connector from './connector'
import firebase from 'firebase'
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
          // does not work
        }
      }
      return createElement(props.noAuth, { auth: props, commands })
    }
  }
})
