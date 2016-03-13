import assert from 'assert'
import path from 'path'

import _ from 'lodash'
import pathExists from 'path-exists'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import webpackConfigBase from 'rehy-webpack-config'

const webpackOutputPath = '.rehy/local/webpack-output'

export const config = webpackConfigBase
  .merge({
    output: {
      path: path.join(process.cwd(), webpackOutputPath),
    },
  })

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

export const runDevServer = (config = config) => {
  assert(!_.isEmpty(config.devServer))
  assert(pathExists.sync(config.output.path))
  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler, config.devServer)
  server.listen(8080, 'localhost')
}
