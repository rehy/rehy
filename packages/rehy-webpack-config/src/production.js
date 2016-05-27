import _ from 'lodash'

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack'

import baseConfig from './base'

export default baseConfig.merge((config) => {
  const cssLoader = _.find(config.module.loaders, ['id', 'css'])
  cssLoader.loader = ExtractTextPlugin.extract('style', 'css')
  return config
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

    // TODO https://github.com/webpack/webpack/issues/1082
    // new webpack.optimize.DedupePlugin(),
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
