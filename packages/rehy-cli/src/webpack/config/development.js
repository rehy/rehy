import HtmlWebpackPlugin from 'html-webpack-plugin'

import webpackConfigBase from 'rehy-webpack-config'

import {templateContent} from './common'

export default webpackConfigBase.merge({
  plugins: [
    new HtmlWebpackPlugin({
      templateContent,
      inject: 'body',
    }),
  ]
})
