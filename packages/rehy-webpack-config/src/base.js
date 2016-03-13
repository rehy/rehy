import assert from 'assert'
import path from 'path'

import WebpackConfig from 'webpack-config'

const rootPath = (...args) => path.resolve(__dirname, '..', ...args)

const stats = {
  assets: true,
  children: false,
  chunkModules: false,
  chunks: false,
  colors: true,
  hash: false,
  timings: true,
  version: false,
}

const publicPath = '/'

export default new WebpackConfig().merge({
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
    publicPath,
  },
  module: {
    loaders: [{
      id: 'js',
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel?cacheDirectory',
    }, {
      id: 'css',
      test: /\.css$/,
      loader: 'style!css',
    }, {
      id: 'json',
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json',
    }],
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['node_modules'],
  },
  stats,
  plugins: [
  ],
  devServer: {
    devtool: 'eval',
    hot: true,
    inline: true,
    noInfo: false,
    quiet: false,
    stats,
    historyApiFallback: {
      index: publicPath,
    },
  },
})
