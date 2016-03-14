import assert from 'assert'
import path from 'path'

import _ from 'lodash'
import pathExists from 'path-exists'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import webpackConfigBase from 'rehy-webpack-config'

export {default as config} from './config'
export {default as runDevServer} from './dev-server'

export const build = (config = config) => {
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
