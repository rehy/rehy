import React from 'react'
import ReactDOM from 'react-dom'

export default ({ appNode, store }) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    const DevTools = require('.').default
    const debugNode = document.createElement('DIV')
    appNode.parentNode.insertBefore(debugNode, appNode.nextSibling)
    ReactDOM.render(<DevTools store={store} />, debugNode)
  }
}
