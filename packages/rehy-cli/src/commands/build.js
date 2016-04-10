import _ from 'lodash'

import {DefinePlugin} from 'webpack'

import cordovaBulid from '../cordova'

const extendForGoogleAnalytics = ({app, cordovaConfig, webpackConfig}) => {
  const googleAnalyticsId = _.get(app, 'googleAnalyticsId')
  if (googleAnalyticsId === 'UA-xxxxxxxx-x') {
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

const extendForSplashScreen = ({app, cordovaConfig, webpackConfig}) => {
  cordovaConfig.plugins.push({
    name: 'cordova-plugin-splashscreen',
    spec: '~3.2.1',
  })
}

export default ({config}) => {
  _.defaults(config.cordovaConfig, {plugins: []})
  _.defaults(config.webpackConfig, {plugins: []})
  extendForGoogleAnalytics(config)
  extendForSplashScreen(config)

  cordovaBulid(config).catch(console.log.bind(console))
}
