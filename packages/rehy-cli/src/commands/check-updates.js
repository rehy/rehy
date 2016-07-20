import path from 'path'

import { spawn } from '../utils'

export default () => {
  const rootDir = process.cwd()
  const buildDir = path.join(rootDir, '.rehy/local/cordova-build')

  spawn('cordova-check-plugins', ['--unconstrain-versions'], {
    cwd: buildDir,
  })
}
