import fs from 'fs'
import path from 'path'

import _ from 'lodash'
import mkdirp from 'mkdirp'
import nunjucks from 'nunjucks'

const renderConfigXML = ({templatePath, templateContent}) => {
  const templateFilename = templatePath || path.join(__dirname, 'config.xml.nunjucks')
  const templateString = fs.readFileSync(templateFilename, 'utf8')
  return nunjucks.renderString(templateString, templateContext)
}

const prepareBuildFolder = ({buildDir, configXML = {}}) => {
  mkdirp.sync(path.join(buildDir, 'www'))

  const xmlContent = renderConfigXML(configXML)
  fs.writeFileSync(path.join(buildDir, 'config.xml'), xmlContent, 'utf8')
}

export default (opts) => {
  const buildDir = '.rehy/local/cordova-build'
  prepareBuildFolder({buildDir})
}
