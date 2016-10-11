import path from 'path'

import 'loud-rejection/register'

import _ from 'lodash'
import chalk from 'chalk'
import cpy from 'cpy'
import emptyDir from 'empty-dir'
import exit from 'exit'
import interpret from 'interpret'
import Joi from 'joi'
import Liftoff from 'liftoff'
import minimatch from 'minimatch'
import tildify from 'tildify'
import yargs from 'yargs'

import { version as cliVersion } from '../package.json'

import cliOptions from './cli-options'
import * as commands from './commands'

// Set env var for ORIGINAL cwd
// before anything touches it
process.env.INIT_CWD = process.cwd()

const log = console

const cli = new Liftoff({
  name: 'rehy',
  extensions: interpret.jsVariants,
})

cli.on('require', (name) => {
  log.info('Requiring external module', chalk.magenta(name))
})

const usage = `\n${chalk.bold('Usage:')} rehy <command> ${chalk.blue('[options]')}`

const parser = yargs
  .usage(usage, cliOptions)
  .command('new', 'Create project')
  .command('dev', 'Development server')
  .command('check-updates', 'Check updates for Cordova plugins')
  .command('inspect-size', 'Inspect size of Webpack bundle')
  .help()
const opts = parser.argv

const schema = Joi.object().keys({
  app: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.object().keys({
      email: Joi.string().required(),
      url: Joi.string().required(),
    }),
    googleAnalyticsId: Joi.string(),
  }),
  cordovaConfig: Joi.object().keys({
    id: Joi.string().required(),
    version: Joi.string().required(),
    versionCode: Joi.number().integer(),
    engines: Joi.object(),
    plugins: [Joi.object(), Joi.array().items(Joi.object().keys({
      name: Joi.string().required(),
      spec: Joi.string().required(),
      variables: Joi.array().items(Joi.object().keys({
        name: Joi.string().required(),
        value: Joi.string().required(),
      })),
    }))],
    preferences: Joi.object(),
  }),
  intlConfig: Joi.object().keys({
    languages: Joi.array(),
  }),
  webpackConfig: Joi.object(),
  remotedevConfig: Joi.object(),
})

const handleArguments = (env) => {
  if (opts.version) {
    log.info('CLI version', cliVersion)
    exit(0)
  }

  if (!env.configPath) {
    log.error(chalk.red('No rehyfile found'))
    exit(1)
  }

  // Chdir before requiring gulpfile to make sure
  // we let them chdir as needed
  if (process.cwd() !== env.cwd) {
    process.chdir(env.cwd)
    log.info(
      'Working directory changed to',
      chalk.magenta(tildify(env.cwd))
    )
  }

  // eslint-disable-next-line global-require,import/no-dynamic-require
  const exported = require(env.configPath)
  log.info('Using rehyfile', chalk.magenta(tildify(env.configPath)))

  const result = Joi.validate(exported, schema)
  if (result.error) {
    log.error(result.error)
    process.exit(-1)
  }

  const subCommand = _.camelCase(_.get(opts._, [0], 'build'))
  commands[subCommand]({
    config: exported,
  })
}

const emptyDirFilter = (filepath) => !minimatch(filepath, '.git')

export default () => {
  if (opts.help) {
    parser.showHelp()
    return
  }
  switch (_.head(opts._)) {
    case 'new':
      if (emptyDir.sync(process.cwd(), emptyDirFilter)) {
        cpy(['.*', '**'], process.cwd(), {
          cwd: path.join(__dirname, '../project-template'),
          parents: true,
        })
      } else {
        log.info('Directory is not empty')
      }
      return
    default:
  }
  cli.launch({
    configPath: opts.rehyfile,
  }, handleArguments)
}
