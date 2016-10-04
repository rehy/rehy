import isFunction from 'lodash/isFunction'

import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { devMiddleware } from 'redux-devtools-preset'
import { responsiveStoreEnhancer } from 'redux-responsive'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import * as baseReducers from './reducers'

export default ({ history, initialState, reducers, prepareMiddleware, rootNode }) => {
  const rootReducer = combineReducers({
    ...baseReducers,
    ...reducers,
  })
  const middleware = [responsiveStoreEnhancer]
  const applicableMiddleware = [routerMiddleware(history), thunk]
  const preparedMiddleware = isFunction(prepareMiddleware) ? prepareMiddleware({
    middleware, applicableMiddleware, applyMiddleware,
  }) : [...middleware, applyMiddleware(...applicableMiddleware)]

  if (process.env.NODE_ENV === 'development') {
    preparedMiddleware.push(...devMiddleware({ rootNode }))
  }

  const store = createStore(rootReducer, initialState, compose(...preparedMiddleware))
  return store
}
