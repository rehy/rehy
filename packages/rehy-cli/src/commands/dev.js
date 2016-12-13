import assert from 'assert'

import _ from 'lodash'
import remotedev from 'remotedev-server'

import * as webpack from '../webpack'
import {normalizeConfig} from './build'

export default ({config}) => {
  normalizeConfig(config)

  const {webpackConfig} = config
  assert(!_.isEmpty(webpackConfig))
  webpack.runDevServer(webpack.config.merge(webpackConfig))
  remotedev(config.remotedevConfig)
}
