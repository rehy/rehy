import {IndexRoute, Route} from 'react-router'
import React from 'react'

import HomePage from './home-page'
import PageNotFound from './not-found-page'
import Root from './root'

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={HomePage} />
    <Route path="*" component={PageNotFound} />
  </Route>
)
