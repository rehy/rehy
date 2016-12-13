import {hashHistory} from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom'

import rehy from 'rehy'

import * as reducers from './reducers'
import App from './containers/app'

async function main() {
  const {appNode, store, history} = await rehy({
    history: hashHistory,
    reducers,
    prepareMiddleware({middleware, applicableMiddleware, applyMiddleware}) {
      return [
        ...middleware,
        applyMiddleware(...applicableMiddleware),
      ]
    },
  })

  ReactDOM.render((
    <App store={store} history={history}/>
  ), appNode)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.trace('Uncaught error')
  // eslint-disable-next-line no-alert
  alert(`Unknown Error!\nPlease contact our support.\n\n${err.stack}`)
})
