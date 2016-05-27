import test from 'ava'
import validate from 'webpack-validator'

import webpackConfig from '../src'

test(t => {
  validate(webpackConfig.toObject())
  t.pass()
})
