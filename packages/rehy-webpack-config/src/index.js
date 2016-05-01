import path from 'path'

import WebpackConfig from 'webpack-config'

WebpackConfig.environment.setAll({
  env() {
    return process.env.WEBPACK_ENV || process.env.NODE_ENV || 'development'
  },
})

export default new WebpackConfig().extend({
  [path.resolve(__dirname, './[env].js')]: ({ default: config }) => config,
})
