import path from 'path'

import _ from 'lodash'
import webpack from 'webpack'

import webpackConfigBase from 'rehy-webpack-config'

export default (opts) => {
  const {webpackConfigs} = opts
  const config = _.reduce(webpackConfigs, (r, webpackConfig) => {
    return r.merge(webpackConfig)
  }, webpackConfigBase)
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
