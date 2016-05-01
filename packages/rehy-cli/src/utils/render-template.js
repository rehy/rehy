import fs from 'fs'
import path from 'path'

import _ from 'lodash'
import nunjucks from 'nunjucks'

const renderTemplate = (templatePath, templateContext) => {
  const templateFilename = _.startsWith(templatePath, '/') ? templatePath : path.join(
    __dirname, '../templates', templatePath)
  const templateString = fs.readFileSync(templateFilename, 'utf8')
  return nunjucks.renderString(templateString, templateContext)
}

export default renderTemplate
