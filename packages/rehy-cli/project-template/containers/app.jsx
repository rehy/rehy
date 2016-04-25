import {Router} from 'react-router'
import React from 'react'

import Provider from 'rehy/lib/Provider'

import routes from '../routes'

export default ({store, history}) => {
  return (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  )
}
