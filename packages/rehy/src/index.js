import {syncHistoryWithStore} from 'react-router-redux'

import appendDebugPanel from './dev-tools/append-debug-panel'
import createStore from './store'
import polyfillIntl from './polyfill-intl'

import initCordova from './entry/cordova'

function getAppNode({appNode}) {
  if (appNode) {
    return appNode
  }
  return document.getElementById('app')
}

export default async (opts) => {
  const {history, initialState, reducers, prepareMiddleware} = opts
  const appNode = getAppNode(opts)

  await polyfillIntl()

  const store = createStore({history, initialState, reducers, prepareMiddleware})
  const enhancedHistory = syncHistoryWithStore(history, store)

  appendDebugPanel({appNode, store})
  initCordova({store})

  if (window.GA && process.env.GOOGLE_ANALYTICS_ID) {
    GA.startTrackerWithId(process.env.GOOGLE_ANALYTICS_ID)
    enhancedHistory.listen(location => {
      GA.trackView(location.pathname)
    })
  }

  return {
    appNode,
    store,
    history: enhancedHistory,
  }
}
