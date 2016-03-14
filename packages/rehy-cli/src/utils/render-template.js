import fs from 'fs'

import nunjucks from 'nunjucks'

const renderTemplate = (templatePath, templateContext) => {
  const templateFilename = templatePath
  const templateString = fs.readFileSync(templateFilename, 'utf8')
  return nunjucks.renderString(templateString, templateContext)
}

export default renderTemplate
