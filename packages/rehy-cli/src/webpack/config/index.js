import path from 'path'

import webpackConfigBase from 'rehy-webpack-config'

const webpackOutputPath = '.rehy/local/webpack-output'

export default webpackConfigBase
  .extend({
    [path.resolve(__dirname, './[env].js')]: ({default: config}) => {
      return config
    },
  })
  .merge({
    output: {
      path: path.join(process.cwd(), webpackOutputPath),
    },
  })
