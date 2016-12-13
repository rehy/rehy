import HtmlWebpackPlugin from 'html-webpack-plugin'
import StatsPlugin from 'stats-webpack-plugin'

import webpackConfigBase from 'rehy-webpack-config'

import {renderTemplate} from '../../utils'

const templateContent = () => renderTemplate('cordova.nunjucks')

const htmlMinifyConfig = {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  useShortDoctype: true,
}

export const htmlWebpackPlugin = new HtmlWebpackPlugin({
  templateContent,
  minify: htmlMinifyConfig,
  inject: true,
})

export default webpackConfigBase.merge({
  plugins: [
    htmlWebpackPlugin,
    new StatsPlugin('stats.json'),
  ],
})
