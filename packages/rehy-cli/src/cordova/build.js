import fs from 'fs'
import path from 'path'

import _ from 'lodash'
import mkdirp from 'mkdirp'

import * as webpack from '../webpack'
import {renderTemplate} from '../utils'

import cordovaBuildPlugin from './webpack-plugin'

const renderConfigXML = ({templatePath, templateContext}) => {
  const templateFilename = templatePath || 'config.xml.nunjucks'
  return renderTemplate(templateFilename, templateContext)
}

const prepareBuildFolder = ({buildDir, configXML = {}}) => {
  mkdirp.sync(path.join(buildDir, 'www'))

  const xmlContent = renderConfigXML(configXML)
  fs.writeFileSync(path.join(buildDir, 'config.xml'), xmlContent, 'utf8')
}

export default ({app, cordovaConfig, webpackConfig}) => {
  const buildDir = path.join(process.cwd(), '.rehy/local/cordova-build')
  prepareBuildFolder({
    buildDir,
    configXML: {
      templateContext: {
        ...app,
        ...cordovaConfig,
      },
    },
  })

  webpack.build(webpack.config.merge(webpackConfig).merge((config) => {
    delete config.output.publicPath  // eslint-disable-line
    return {
      plugins: [
        cordovaBuildPlugin({
          cordovaDir: buildDir,
          sourcePath: config.output.path,
        }),
      ],
    }
  })).catch(console.log.bind(console))
}
