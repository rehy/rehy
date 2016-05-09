import webpack from 'webpack'

export config from './config'
export runDevServer from './dev-server'

// eslint-disable-next-line no-use-before-define
export const build = (config = config) => {
  const compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err)
        return
      }
      const jsonStats = stats.toJson()
      if (stats.hasErrors()) {
        reject(jsonStats.errors)
      } else {
        resolve(stats)
      }
    })
  })
}
