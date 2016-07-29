import _ from 'lodash'

import { DefinePlugin } from 'webpack'

import cordovaBulid from '../cordova'

const extendForGoogleAnalytics = ({ app, cordovaConfig, webpackConfig }) => {
  const googleAnalyticsId = _.get(app, 'googleAnalyticsId')
  if (googleAnalyticsId === 'UA-xxxxxxxx-x') {
    // eslint-disable-next-line no-param-reassign
    delete app.googleAnalyticsId
  } else if (googleAnalyticsId) {
    cordovaConfig.plugins.push({
      name: 'cordova-plugin-ga',
      spec: '~1.3.0',
    })

    webpackConfig.plugins.push(new DefinePlugin({
      'process.env': {
        GOOGLE_ANALYTICS_ID: JSON.stringify(googleAnalyticsId),
      },
    }))
  }
}

const extendForSplashScreen = ({ cordovaConfig }) => {
  cordovaConfig.plugins.push({
    name: 'cordova-plugin-splashscreen',
    spec: '~3.2.2',
  })
}

function normalizedCordovaPlugins(plugins) {
  if (_.isArray(plugins)) {
    return plugins
  }
  return _.map(plugins, (spec, name) => {
    if (_.isString(spec)) {
      return { name, spec }
    }
    return {
      ...spec,
      name,
    }
  })
}

export default ({ config }) => {
  _.defaults(config.cordovaConfig, { plugins: [] })
  _.defaults(config.webpackConfig, { plugins: [] })
  // eslint-disable-next-line no-param-reassign
  config.cordovaConfig.engines = Object.assign({
    android: '~5.2.1',
    browser: '~4.1.0',
  }, config.cordovaConfig.engines)
  // eslint-disable-next-line no-param-reassign
  config.cordovaConfig.plugins = normalizedCordovaPlugins(config.cordovaConfig.plugins)
  extendForGoogleAnalytics(config)
  extendForSplashScreen(config)

  cordovaBulid(config).catch((error) => {
    console.error(error.stack)  // eslint-disable-line no-console
    process.exit(-1)
  })
}
