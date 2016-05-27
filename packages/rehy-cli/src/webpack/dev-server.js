import assert from 'assert'

import _ from 'lodash'
import pathExists from 'path-exists'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import { renderTemplate } from '../utils'

import baseConfig from './config'

const runDevServer = (inputConfig) => {
  const config = baseConfig.merge(inputConfig)
    .merge({
      plugins: [
        new HtmlWebpackPlugin({
          templateContent() {
            return renderTemplate('dev.nunjucks')
          },
          inject: 'body',
        }),
      ],
    })
  assert(!_.isEmpty(config.devServer))
  assert(pathExists.sync(config.output.path))
  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler, config.devServer)
  server.listen(8080, 'localhost')
}

export default runDevServer
