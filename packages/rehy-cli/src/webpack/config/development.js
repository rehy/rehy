import webpackConfigBase from 'rehy-webpack-config'

import { htmlWebpackPlugin } from './production'

export default webpackConfigBase.merge({
  plugins: [
    htmlWebpackPlugin,
  ],
})
