import webpack from 'webpack'

import config from './base'

export default config.merge({
  debug: true,
  devtool: 'eval',
  output: {
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
})
