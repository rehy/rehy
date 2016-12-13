import test from 'ava'
import validate from 'webpack-validator'

import webpackConfig from '../src'
import productionConfig from '../src/production'

test((t) => {
  validate(webpackConfig.toObject())
  t.pass()
})

test('validate production config', (t) => {
  const config = productionConfig.toObject()
  validate(config)
  t.is(config.module.loaders.length, 4)
})
