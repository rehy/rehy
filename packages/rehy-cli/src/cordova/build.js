import path from 'path'

import _ from 'lodash'
import cpy from 'cpy'
import fs from 'mz/fs'
import manageTranslations from 'react-intl-translations-manager'
import mkdirp from 'mkdirp-then'
import shell from 'shelljs'

import WebpackCleanupPlugin from 'webpack-cleanup-plugin'

import * as webpack from '../webpack'
import { renderTemplate } from '../utils'

import CordovaBuildPlugin from './webpack-plugin'

const renderConfigXML = ({ templatePath, templateContext }) => {
  const templateFilename = templatePath || 'config.xml.nunjucks'
  return renderTemplate(templateFilename, templateContext)
}

const prepareBuildFolder = async (opts) => {
  const { buildDir, messagesDir, rootDir, configXML = {} } = opts
  await mkdirp(messagesDir)
  await mkdirp(path.join(buildDir, 'www'))

  await cpy([
    'icon.png',
    'splash.png',
  ], buildDir, { cwd: rootDir })

  shell.cp('-R', path.join(__dirname, 'hooks'), buildDir)

  const xmlContent = renderConfigXML(configXML)
  await fs.writeFile(path.join(buildDir, 'config.xml'), xmlContent, 'utf8')
}

export default async ({ app, cordovaConfig, intlConfig, webpackConfig }) => {
  const rootDir = process.cwd()
  const buildDir = path.join(rootDir, '.rehy/local/cordova-build')
  const messagesDir = path.join(rootDir, '.rehy/local/intl-messages')
  await prepareBuildFolder({
    buildDir,
    messagesDir,
    rootDir,
    configXML: {
      templateContext: {
        ...app,
        ...cordovaConfig,
      },
    },
  })

  await webpack.build(webpack.config.merge(webpackConfig).merge((config) => {
    // eslint-disable-next-line no-param-reassign
    delete config.output.publicPath
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
  }).merge(() => {
    if (_.isEmpty(intlConfig)) {
      return {}
    }
    return {
      plugins: [
        function intlPlugin() {
          this.plugin('done', () => {
            manageTranslations({
              translationsDirectory: 'messages/',
              ...intlConfig,
              messagesDirectory: messagesDir,
            })
          })
        },
      ],
      babel: {
        plugins: [
          ['react-intl', {
            messagesDir,
          }],
        ],
      },
    }
  }))
}
