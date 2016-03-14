import path from 'path'

import {renderTemplate} from '../../utils'

export const templateContent = () => {
  const templatePath = path.resolve(__dirname, '../index.nunjucks')
  return renderTemplate(templatePath)
}
