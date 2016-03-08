import {syncHistoryWithStore} from 'react-router-redux'

import appendDebugPanel from './dev-tools/append-debug-pannel'
import createStore from './store'
import polyfillIntl from './polyfill-intl'

export default async ({appNode, ...storeProps}) => {
  await polyfillIntl()

  const store = createStore(...storeProps)
  const history = syncHistoryWithStore(storeProps.history, store)
  appendDebugPanel({appNode, store})

  return {
    store,
    history,
  }
}
