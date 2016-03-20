import path from 'path'

import {spawn} from 'child-process-promise'
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

      const spawnOpts = {
        stdio: 'inherit',
        cwd: cordovaDir,
        env: {
          ...process.env,
          PATH: process.env.PATH + ':' + path.join(require.resolve('cordova'), '../../.bin')
        },
      }
      if (!await pathExists(path.join(cordovaDir, 'platforms'))) {
        await spawn('cordova', ['prepare'], spawnOpts)
      }

      await spawn('cordova', args, spawnOpts)
    })
  }
}

export default createPlugin
