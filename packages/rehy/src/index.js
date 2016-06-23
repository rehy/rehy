/* global GA */
import { syncHistoryWithStore } from 'react-router-redux'

import { appendDevPanel } from 'redux-devtools-preset'
import createStore from './store'
import polyfillIntl from './polyfill-intl'

import initCordova from './entry/cordova'

function getAppNode({ appNode }) {
  if (appNode) {
    return appNode
  }
  return document.getElementById('app')
}

function bootstrap(opts) {
  const { history, initialState, reducers, prepareMiddleware } = opts
  const appNode = getAppNode(opts)

  const store = createStore({ history, initialState, reducers, prepareMiddleware })
  const enhancedHistory = syncHistoryWithStore(history, store)

  appendDevPanel({ rootNode: appNode, store })
  initCordova({ store })

  if (process.env.GOOGLE_ANALYTICS_ID && process.env.NODE_ENV === 'production' && window.GA) {
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

export default function (opts) {
  return polyfillIntl().then(() => bootstrap(opts))
}
