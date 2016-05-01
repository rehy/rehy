import path from 'path'

import _ from 'lodash'
import chalk from 'chalk'
import cpy from 'cpy'
import emptyDir from 'empty-dir'
import exit from 'exit'
import interpret from 'interpret'
import Liftoff from 'liftoff'
import minimatch from 'minimatch'
import nunjucks from 'nunjucks'
import tildify from 'tildify'
import yargs from 'yargs'

import {version as cliVersion} from '../package.json'

import cliOptions from './cli-options'
import cordovaBulid from './cordova'
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

const usage =
  '\n' + chalk.bold('Usage:') +
  ' rehy <command> ' + chalk.blue('[options]')

const parser = yargs
  .usage(usage, cliOptions)
  .command('new', 'Create project')
  .command('dev', 'Development server')
  .help()
const opts = parser.argv

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

  const exported = require(env.configPath)
  log.info('Using rehyfile', chalk.magenta(tildify(env.configPath)))

  const subCommand = _.get(opts._, [0], 'build')
  commands[subCommand]({
    config: exported,
  })
}

const emptyDirFilter = (filepath) => {
  return !minimatch(filepath, '.git')
}

export default () => {
  if (opts.help) {
    parser.showHelp()
    return
  }
  switch (_.first(opts._)) {
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
