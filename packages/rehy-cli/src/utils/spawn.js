import path from 'path'

import { spawn } from 'child-process-promise'

export default (command, args, options) => {
  const paths = [
    process.env.PATH,
    path.resolve(require.resolve('.'), '../../../node_modules/.bin'),
  ]
  const opts = {
    stdio: 'inherit',
    env: {
      ...process.env,
      PATH: paths.join(':'),
    },
    ...options,
  }
  return spawn(command, args, opts)
}
