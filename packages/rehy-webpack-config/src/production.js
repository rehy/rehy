import path from 'path'

import _ from 'lodash'

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack'
import WebpackConfig from 'webpack-config'

import config from './base'

export default config.merge((config) => {
  const cssLoader = _.find(config.module.loaders, ['id', 'css'])
  return {
    cssLoader: {
      loader: ExtractTextPlugin.extract('style', 'css'),
    },
  }
}).merge({
  devtool: 'hidden-source-map',
  module: {
    loaders: [],
  },

  plugins: [
    new ExtractTextPlugin('[name]-[hash].css'),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        booleans: true,
        cascade: true,
        comparisons: true,
        conditionals: true,
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
        evaluate: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        loops: true,
        screw_ie8: true,
        sequences: true,
        unused: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ],
})
