/* global store */

export const UPDATE_PRODUCT = '@@rehy-billing/UPDATE_PRODUCT'
const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product,
})

export const UPDATE_PRODUCT_BATCH = '@@rehy-billing/UPDATE_PRODUCT_BATCH'
export const updateProductBatch = (products) => ({
  type: UPDATE_PRODUCT_BATCH,
  payload: products,
})

export const ORDER_PRODUCT = '@@rehy-billing/ORDER_PRODUCT'
export const orderProduct = (productId) => {
  return (dispatch) => {
    store.order(productId).then((product) => {
      dispatch({
        type: ORDER_PRODUCT,
        payload: product,
      })
    }).error((error) => {
      console.log(error)  // eslint-disable-line no-console
    })
  }
}

const REFRESH_STORE = '@@rehy-billing/REFRESH_STORE'
export function refreshStore(productIds = []) {
  return (dispatch) => {
    if (process.env.NODE_ENV === 'development') {
      if (typeof store === 'undefined') {
        // eslint-disable-next-line no-alert
        window.alert('`store` is undefined, please ensure `cordova-plugin-billing` is installed and this action is called after `deviceready`')
      }
      store.verbosity = store.DEBUG
      try {
        dispatch({
          type: REFRESH_STORE,
        })
      } catch (err) {
        // eslint-disable-next-line no-alert
        window.alert(err)
      }
    }

    productIds.forEach((id) => {
      store.register({
        id,
        type: store.NON_CONSUMABLE,
      })
      store.when(id).approved((product) => {
        dispatch(updateProduct(product))
        product.finish()
      })
      store.when(id).owned((product) => {
        dispatch(updateProduct(product))
      })
      store.when(id).updated((product) => {
        dispatch(updateProduct(product))
      })
    })

    store.ready(() => {
      console.log('\\o/ STORE READY \\o/')  // eslint-disable-line no-console
    })

    store.error((e) => {
      console.log(`Store error ${e.code} : ${e.message}`)  // eslint-disable-line no-console
    })

    store.refresh()
  }
}
