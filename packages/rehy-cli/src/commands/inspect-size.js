import path from 'path'

import {spawn} from '../utils'

export default () => {
  const rootDir = process.cwd()
  const webpackJSON = path.join(rootDir, '.rehy/local/webpack-output/stats.json')

  spawn('webpack-bundle-size-analyzer', [webpackJSON])
}
