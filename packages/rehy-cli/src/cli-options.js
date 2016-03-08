import chalk from 'chalk'

export default {
  help: {
    alias: 'h',
    type: 'boolean',
    desc: chalk.gray(
      'Show this help.'),
  },
  rehyfile: {
    type: 'string',
    requiresArg: true,
    desc: chalk.gray(
      'Manually set path of rehyfile. Useful if you have multiple rehyfiles. ' +
      'This will set the CWD to the rehyfile directory as well.'),
  },
  cwd: {
    type: 'string',
    requiresArg: true,
    desc: chalk.gray(
      'Manually set the CWD. The search for the rehyfile, ' +
      'as well as the relativity of all requires will be from here.'),
  },
}
