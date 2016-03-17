import path from 'path'

import {spawn} from 'mz/child_process'
import cpy from 'cpy'
import pathExists from 'path-exists'

function createPlugin({cordovaDir, sourcePath}) {
  return function() {
    const args = process.env.NODE_ENV === 'production' ? ['build', '--release'] : ['build']
    const blacklistPatterns = process.env.NODE_ENV === 'production' ? [
      '!stats.json',
      '!*.map',
    ] : []

    this.plugin('done', async () => {
      cpy(['*', ...blacklistPatterns], path.join(cordovaDir, 'www'), {
        cwd: sourcePath,
      })

      if (!await pathExists(path.join(cordovaDir, 'platforms'))) {
        await spawn('cordova', ['prepare'], {
          stdio: 'inherit',
          cwd: cordovaDir,
        })
      }

      await spawn('cordova', args, {
        stdio: 'inherit',
        cwd: cordovaDir,
      })
    })
  }
}

export default createPlugin
