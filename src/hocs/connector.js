/* @flow */
import { bindActionCreators } from 'redux'
import { pure, compose, type HOC } from 'recompose'
import { connect } from 'react-redux'
import type { State as RootState } from '~/reducers'

export default function connector<A: Object, B: Object, C>(
  selector: (RootState, C) => A,
  actions: B
): HOC<A & B, C> {
  const connector = connect(selector, dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  }))
  return compose(connector, pure)
}
