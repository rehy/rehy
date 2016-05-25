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
    path: 'dist',
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
    publicPath,
  },
  module: {
    loaders: [
      {
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
      },
      {
        test: /\.(gif|png)$/,
        loader: 'url-loader',
        query: {
          limit: 10240,
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['node_modules'],
  },
  resolveLoader: {
    root: [
      path.join(require.resolve('babel-loader'), '../..'),
    ],
  },
  stats,
  plugins: [
  ],
  devServer: {
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
