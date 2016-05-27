import _ from 'lodash'
import path from 'path'

import validate from 'webpack-validator'

import webpackConfigBase from 'rehy-webpack-config'

const webpackOutputPath = '.rehy/local/webpack-output'

const validateConfig = (config) => {
  if (process.env.WEBPACK_VALIDATE_SKIP) {
    return config
  }
  return validate(config)
}

export default validateConfig(webpackConfigBase.extend({
  [path.resolve(__dirname, './[env].js')]: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.module.loaders = config.module.loaders.map((loader) => _.omit(loader, 'id'))
    return config
  },
})
.merge({
  output: {
    path: path.join(process.cwd(), webpackOutputPath),
  },
}).toObject())
