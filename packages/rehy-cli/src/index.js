import path from 'path'

import chalk from 'chalk'
import exit from 'exit'
import interpret from 'interpret'
import Liftoff from 'liftoff'
import nunjucks from 'nunjucks'
import tildify from 'tildify'
import yargs from 'yargs'

import {version as cliVersion} from '../package.json'

import cliOptions from './cli-options'
import cordovaBulid from './cordova'

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

const usage =
  '\n' + chalk.bold('Usage:') +
  ' rehy ' + chalk.blue('[options]') + ' tasks'

const parser = yargs.usage(usage, cliOptions)
const opts = parser.argv

const handleArguments = (env) => {
  if (!env.configPath) {
    log.error(chalk.red('No rehyfile found'))
    exit(1)
  }

  if (opts.version) {
    log.info('CLI version', cliVersion)
    exit(0)
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

  const exported = require(env.configPath)
  log.info('Using rehyfile', chalk.magenta(tildify(env.configPath)))

  cordovaBulid({})
}

export default () => {
  cli.launch({
    configPath: opts.rehyfile,
  }, handleArguments)
}
