import chalk from 'chalk'
import exit from 'exit'
import interpret from 'interpret'
import Liftoff from 'liftoff'
import yargs from 'yargs'

import cliOptions from './cli-options'

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

var parser = yargs.usage(usage, cliOptions)
const opts = parser.argv

const handleArguments = (env) => {
  if (!env.configPath) {
    log.error(chalk.red('No rehyfile found'))
    exit(1)
  }

  console.log(env.configPath)

  const exported = require(env.configPath)
  console.log(exported)
  console.log(process.cwd())
}

export default () => {
  cli.launch({
    configPath: opts.rehyfile,
  }, handleArguments)
}
