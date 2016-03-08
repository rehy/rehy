import _ from 'lodash'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {responsiveStoreEnhancer} from 'redux-responsive'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'

import * as baseReducers from './reducers'

export default ({history, initialState, reducers, prepareMiddleware}) => {
  const rootReducer = combineReducers(_.assign({}, baseReducers, reducers))
  const middleware = [responsiveStoreEnhancer]
  const applicableMiddleware = [routerMiddleware(history), thunk]
  const preparedMiddleware = _.isFunction(prepareMiddleware) ? prepareMiddleware({middleware, applicableMiddleware, applyMiddleware}) : [...middleware, applyMiddleware(...applicableMiddleware)]

  if (process.env.NODE_ENV === 'development') {
    const dev = require('./dev-tools/middleware').default
    preparedMiddleware.push(...dev())
  }

  const store = createStore(rootReducer, initialState, compose(...preparedMiddleware))
  return store
}
