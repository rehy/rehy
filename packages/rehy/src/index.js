import {syncHistoryWithStore} from 'react-router-redux'

import appendDebugPanel from './dev-tools/append-debug-panel'
import createStore from './store'
import polyfillIntl from './polyfill-intl'

export default async (opts) => {
  const {appNode, history, initialState, reducers, prepareMiddleware} = opts

  await polyfillIntl()

  const store = createStore({history, initialState, reducers, prepareMiddleware})
  const enhancedHistory = syncHistoryWithStore(history, store)
  appendDebugPanel({appNode, store})

  return {
    store,
    history: enhancedHistory,
  }
}
