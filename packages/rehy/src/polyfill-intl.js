import _ from 'lodash'

export default () => {
  if (_.get(window, 'Intl')) {
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
