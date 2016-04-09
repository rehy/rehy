import path from 'path'

import _ from 'lodash'
import cpy from 'cpy'
import fs from 'mz/fs'
import mkdirp from 'mkdirp-then'
import shell from 'shelljs'

import {DefinePlugin} from 'webpack'
import WebpackCleanupPlugin from 'webpack-cleanup-plugin'

import * as webpack from '../webpack'
import {renderTemplate} from '../utils'

import CordovaBuildPlugin from './webpack-plugin'

const renderConfigXML = ({templatePath, templateContext}) => {
  const templateFilename = templatePath || 'config.xml.nunjucks'
  return renderTemplate(templateFilename, templateContext)
}

const prepareBuildFolder = async (opts) => {
  const {buildDir, rootDir, configXML = {}} = opts
  await mkdirp(path.join(buildDir, 'www'))

  await cpy([
    'icon.png',
    'splash.png',
  ], buildDir, { cwd: rootDir })

  shell.cp('-R', path.join(__dirname, 'hooks'), buildDir)

  const xmlContent = renderConfigXML(configXML)
  await fs.writeFile(path.join(buildDir, 'config.xml'), xmlContent, 'utf8')
}

export default async ({app, cordovaConfig, webpackConfig}) => {
  const googleAnalyticsId = _.get(app, 'googleAnalyticsId')
  if (googleAnalyticsId === 'UA-xxxxxxxx-x') {
    delete app.googleAnalyticsId
  } else if (googleAnalyticsId) {
    cordovaConfig.plugins.push({
      name: 'cordova-plugin-ga',
      spec: '~1.3.0',
    })

    _.defaults(webpackConfig, {plugins: []})
    webpackConfig.plugins.push(new DefinePlugin({
      'process.env': {
        GOOGLE_ANALYTICS_ID: JSON.stringify(googleAnalyticsId),
      },
    }))
  }

  const rootDir = process.cwd()
  const buildDir = path.join(rootDir, '.rehy/local/cordova-build')
  await prepareBuildFolder({
    buildDir,
    rootDir,
    configXML: {
      templateContext: {
        ...app,
        ...cordovaConfig,
      },
    },
  })

  await webpack.build(webpack.config.merge(webpackConfig).merge((config) => {
    delete config.output.publicPath  // eslint-disable-line
    const sourcePath = config.output.path
    return {
      plugins: [
        new WebpackCleanupPlugin(),
        new CordovaBuildPlugin({
          cordovaDir: buildDir,
          sourcePath,
        }),
      ],
    }
  }))
}
