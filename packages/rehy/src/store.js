import defaults from 'lodash/defaults'
import isFunction from 'lodash/isFunction'

import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { responsiveStoreEnhancer } from 'redux-responsive'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import * as baseReducers from './reducers'

const defaultDevToolsOptions = {
  hostname: process.env.npm_package_remotedev_hostname || 'localhost',
  port: Number(process.env.npm_package_remotedev_port) || 8000,
}

export default ({ history, initialState, reducers, prepareMiddleware, devTools }) => {
  const devToolsOpts = defaults(devTools, defaultDevToolsOptions)
  const rootReducer = combineReducers({
    ...baseReducers,
    ...reducers,
  })
  const middleware = [responsiveStoreEnhancer]
  const applicableMiddleware = [routerMiddleware(history), thunk]
  const preparedMiddleware = isFunction(prepareMiddleware) ? prepareMiddleware({
    middleware, applicableMiddleware, applyMiddleware,
  }) : [...middleware, applyMiddleware(...applicableMiddleware)]

  const store = createStore(rootReducer, initialState, composeWithDevTools(devToolsOpts)(...preparedMiddleware))
  return store
}
