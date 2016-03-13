import assert from 'assert'

import _ from 'lodash'

import * as webpack from '../webpack'

export default ({config: {webpackConfig}}) => {
  assert(!_.isEmpty(webpackConfig))
  webpack.runDevServer(webpack.config.merge(webpackConfig))
}
