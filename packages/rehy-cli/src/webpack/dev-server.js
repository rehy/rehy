import assert from 'assert'

import _ from 'lodash'
import pathExists from 'path-exists'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import baseConfig from './config'

const runDevServer = (inputConfig) => {
  const config = baseConfig.merge(inputConfig)
  assert(!_.isEmpty(config.devServer))
  assert(pathExists.sync(config.output.path))
  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler, config.devServer)
  server.listen(8080, 'localhost')
}

export default runDevServer
