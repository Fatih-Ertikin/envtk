import {Args} from '@oclif/core'
import {config} from 'dotenv'

import {existsSync} from 'node:fs'
import {spawn} from 'node:child_process'
import {getAbsolutePath, runUserScript} from '../lib/file-utils'
import {parseEnv, deepCopy} from '../lib/env'
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
      command: 'async-env run "npm run dev" -s ./load-env.js',
      description: 'Run command with env variables returned from script',
    },
    {
      command: 'async-env run "npm run dev" -s ./load-env.js -e .env',
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

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Run)

    const COMMAND = args[CMD_ARG] // Command the user wants to run
    let ENVIRONMENT = deepCopy(process.env) // Current environment vars

    if (!flags.envFile || !flags.script) {
      this.warn(
        'No flags given. command will still be executed but no new environment variables will be loaded (current process.env will be used).',
      )
    }

    const loadEnvFile = () => {
      if (!flags.envFile) {
        throw new Error('tried to load env file without flag present, this error should not occur!')
      }

      const envFilePath = getAbsolutePath(flags.envFile)
      if (existsSync(envFilePath)) {
        // parse using dotenv.config
        const parseResult = config({
          path: envFilePath,
        })

        if (parseResult.error || !parseResult.parsed) {
          this.error(`Failed to parse input .env: ${parseResult.error}`, {
            exit: 1,
          })
        }

        // add parsed env vars to current environment
        const defaults = parseEnv(parseResult.parsed)
        ENVIRONMENT = deepCopy({
          ...ENVIRONMENT,
          ...defaults,
        })
      }
    }

    if (flags.envFile) {
      await this.executeAction('Reading user specified env file', loadEnvFile)
    }

    const loadUserScript = async () => {
      if (!flags.script) {
        throw new Error('tried to run user script without flag present, this error should not occur!')
      }

      // run user script with env vars
      const content = await runUserScript(flags.script, ENVIRONMENT)

      // parse user content
      const parsedContent = parseEnv(content)

      // add content to env vars
      ENVIRONMENT = deepCopy({
        ...ENVIRONMENT,
        ...parsedContent,
      })
    }

    if (flags.script) {
      await this.executeAction('Executing user script and getting', loadUserScript)
    }

    const runUserCommand = () => {
      spawn(COMMAND, {env: ENVIRONMENT, stdio: 'inherit'})
    }

    if (args[CMD_ARG] && !flags.json) {
      await this.executeAction('Run specified command', runUserCommand)
    }

    if (flags.json) {
      return ENVIRONMENT
    }

    this.exit(1)
  }
}
