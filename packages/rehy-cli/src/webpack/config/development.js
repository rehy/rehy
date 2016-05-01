import HtmlWebpackPlugin from 'html-webpack-plugin'

import webpackConfigBase from 'rehy-webpack-config'

import { renderTemplate } from '../../utils'

const templateContent = () => renderTemplate('dev.nunjucks')

export default webpackConfigBase.merge({
  plugins: [
    new HtmlWebpackPlugin({
      templateContent,
      inject: 'body',
    }),
  ],
})
