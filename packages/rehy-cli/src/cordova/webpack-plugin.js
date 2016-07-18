import path from 'path'

import cpy from 'cpy'
import del from 'del'
import pathExists from 'path-exists'

import { spawn } from '../utils'

function CordovaBuildPlugin(opts) {
  this.opts = opts
}

CordovaBuildPlugin.prototype.apply = function apply(compiler) {
  const { cordovaDir, sourcePath } = this.opts

  const args = process.env.NODE_ENV === 'production' ? ['build', '--release'] : ['build']
  const blacklistPatterns = process.env.NODE_ENV === 'production' ? [
    '!stats.json',
    '!*.map',
  ] : []

  compiler.plugin('done', async (stats) => {
    if (stats.hasErrors()) {
      return
    }

    const wwwDir = path.join(cordovaDir, 'www')
    await del(['**'], { cwd: wwwDir })
    await cpy(['*', ...blacklistPatterns], wwwDir, { cwd: sourcePath })

    const spawnOpts = {
      cwd: cordovaDir,
    }
    if (!await pathExists(path.join(cordovaDir, 'platforms'))) {
      await spawn('cordova', ['prepare'], spawnOpts)
    }

    await spawn('cordova', args, spawnOpts)
  })
}

export default CordovaBuildPlugin
