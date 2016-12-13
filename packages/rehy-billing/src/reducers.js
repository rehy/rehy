import {UPDATE_PRODUCT, UPDATE_PRODUCT_BATCH} from './actions'

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT: {
      const product = action.payload
      return {
        ...state,
        [product.id]: product,
      }
    }
    case UPDATE_PRODUCT_BATCH: {
      return action.payload.reduce((r, product) => {
        return {
          ...r,
          [product.id]: product,
        }
      }, state)
    }
    default:
      return state
  }
}
