import debounce from 'lodash/debounce'
import get from 'lodash/get'

import {UPDATE_PRODUCT, UPDATE_PRODUCT_BATCH} from './actions'

export default function(opts = {wait: 100, maxWait: 1000}) {
  const {wait, maxWait} = opts
  let payloads = []

  function batchUpdate(dispatch) {
    if (payloads.length === 0) {
      return undefined
    }
    const payload = payloads
    payloads = []
    return dispatch({
      type: UPDATE_PRODUCT_BATCH,
      payload,
    })
  }

  const debounced = debounce(batchUpdate, wait, {maxWait})

  return ({dispatch}) => next => (action) => {
    const actionType = get(action, 'type')
    if (actionType === UPDATE_PRODUCT) {
      payloads.push(action.payload)
      return debounced(dispatch)
    }
    return next(action)
  }
}
