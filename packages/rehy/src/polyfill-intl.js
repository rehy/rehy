import get from 'lodash/get'

export default () => {
  if (get(window, 'Intl')) {
    return Promise.resolve(false)
  }

  return new Promise((resolve) => {
    require.ensure([
      'intl',
    ], (require) => {
      require('intl')
      resolve(true)
    })
  })
}
