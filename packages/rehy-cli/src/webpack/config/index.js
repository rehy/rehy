import path from 'path'

import validate from 'webpack-validator'

import webpackConfigBase from 'rehy-webpack-config'

const webpackOutputPath = '.rehy/local/webpack-output'

export default validate(webpackConfigBase.extend({
  [path.resolve(__dirname, './[env].js')]: ({default: config}) => {
    return config
  },
})
.merge({
  output: {
    path: path.join(process.cwd(), webpackOutputPath),
  },
}))
