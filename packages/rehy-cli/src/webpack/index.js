import path from 'path'

import _ from 'lodash'
import webpack from 'webpack'

import webpackConfigBase from './config'

const rootPath = (...args) => path.resolve(__dirname, '../..', ...args)

const outputPath = '.rehy/local/webpack-dist'

export default (opts) => {
  const {webpackConfig} = opts
  const config = webpackConfigBase
    .merge({
      resolveLoader: {
        root: rootPath('node_modules'),
      },
    })
    .merge(webpackConfig)
    .merge({
      output: {
        path: outputPath,
      },
    })
  const compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
        return
      }
      const jsonStats = stats.toJson()
      if (stats.hasErrors()) {
        reject(jsonStats.errors)
      } else {
        resolve(stats)
      }
    })
  })
}
