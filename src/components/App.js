/* @flow */
import React from 'react'
import styled from 'styled-components/primitives'
import { Button } from 'react-native'
import { Provider } from 'react-redux'
import WithAuth from '~/hocs/WithAuth'
import createStore from '~/store/createStore'

const store = createStore()

const View = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const WithCredential = ({ commands }: { commands: { logout: Function } }) => {
  return (
    <View>
      <Button
        title="Start"
        onPress={() => {
          // TODO: Start your app
        }}
      />
      <Button
        title="Logout"
        onPress={() => {
          commands.logout()
        }}
      />
    </View>
  )
}

const AsAnonyomous = ({ commands }: { commands: { logout: Function } }) => {
  return (
    <View>
      <TitleText>Logged in as anonymous</TitleText>
      <Button
        title="Start"
        onPress={() => {
          // TODO: Start with anonymous login
        }}
      />
      <Button onPress={commands.logout} title="Logout" />
    </View>
  )
}

const NoAuth = ({
  commands
}: {
  commands: { loginToFacebook: Function, loginAsAnonymous: Function }
}) => {
  return (
    <View>
      <TitleText>No Auth</TitleText>
      <Button onPress={commands.loginAsAnonymous} title="Login (anonymous)" />
      <Button onPress={commands.loginToFacebook} title="Login with Facebook" />
    </View>
  )
}

export default () => (
  <Provider store={store}>
    <WithAuth
      withCredential={WithCredential}
      asAnonyomous={AsAnonyomous}
      noAuth={NoAuth}
    />
  </Provider>
)

const TitleText = styled.Text`
  font-size: 32;
  color: palevioletred;
`
