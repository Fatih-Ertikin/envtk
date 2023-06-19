import {Args} from '@oclif/core'
import {execSync} from 'node:child_process'
import {BaseCommand} from '../lib/base-command'

/** arguments */
const CMD_ARG = 'command' as const

/**
 * Oclif command class
 */
export default class Run extends BaseCommand<typeof Run> {
  static description = 'run a given command with loaded env variables';

  static examples = [
    {
      command: 'envtk run "npm run dev" -s ./load-env.js',
      description: 'Run command with env variables returned from script',
    },
    {
      command: 'envtk run "npm run dev" -s ./load-env.js -e .env',
      description:
        ' Run command with env variables returned from script and include defaults from ".env"',
    },
  ];

  static args = {
    [CMD_ARG]: Args.string({
      name: 'command',
      required: true,
      description: 'command to run with the loaded environment variables',
    }),
  };

  public async run(): Promise<any> {
    const {args, flags} = await this.parse(Run)

    const USER_COMMAND = args[CMD_ARG] // Command the user wants to run

    if (flags.envFile) {
      await this.executeAction('Reading user specified env file', () =>
        this.loadEnvironmentFile(flags.envFile!),
      )
    }

    if (flags.script) {
      await this.executeAction('Executing user script', () => this.loadUserScriptValues(flags.script))
    }

    const envObj = Object.fromEntries(this.environment) as Record<string, any> // create object from map because exec expects an object

    if (args[CMD_ARG]) {
      await this.executeAction('Run specified command', () => execSync(USER_COMMAND, {env: envObj, stdio: 'inherit'}))
    }

    if (flags.json) {
      return envObj
    }

    this.exit(1)
  }
}
