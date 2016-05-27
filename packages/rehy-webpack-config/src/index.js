import path from 'path'

import { Config, ConfigEnvironment } from 'webpack-config'

ConfigEnvironment.INSTANCE.setAll({
  env() {
    return process.env.WEBPACK_ENV || process.env.NODE_ENV || 'development'
  },
})

export default new Config().extend(path.resolve(__dirname, './[env].js'))
