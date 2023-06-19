import {Command, Flags, Interfaces} from '@oclif/core'
import {createSpinner} from 'nanospinner'
import {getAbsolutePath, runUserScript} from './file-utils'
import {existsSync} from 'node:fs'
import {config} from 'dotenv'
import {parseEnv} from './env'

/** flags */
const SCRIPT_FLAG = 'script' as const
const ENV_FILE_FLAG = 'envFile' as const
const VERBOSE = 'verbose' as const

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof BaseCommand['baseFlags'] & T['flags']>
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class BaseCommand<T extends typeof Command> extends Command {
  static enableJsonFlag = true

  // base flags that every inherited command has access to
  static baseFlags = {
    [SCRIPT_FLAG]: Flags.file({
      char: 's',
      description: 'path to .(mjs|js) script.',
      exists: true,
      required: true,
    }),
    [ENV_FILE_FLAG]: Flags.file({
      char: 'e',
      description: 'path to .env file with defaults to include',
      exists: true,
      required: false,
    }),
    [VERBOSE]: Flags.boolean({
      char: 'v',
      default: false,
      required: false,
    }),
  }

  protected flags!: Flags<T>
  protected args!: Args<T>
  protected environment!: Map<string, boolean | string | number>;

  public async init(): Promise<void> {
    await super.init()
    const {args, flags} = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof BaseCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    })
    this.flags = flags as Flags<T>
    this.args = args as Args<T>
    // Initialize environment with a copy of the current process.env
    const copy = JSON.parse(JSON.stringify(process.env))
    this.environment = new Map(Object.entries(copy))
  }

  public async executeAction(title: string, action: (() => void) | (() => Promise<void>)): Promise<void> {
    // If silent, just execute action and dont log anything
    if (!this.flags[VERBOSE]) {
      await action()
      return
    }

    const spinner = createSpinner(title)

    try {
      spinner.start()
      await action()

      spinner.success({
        text: `${title}: Done`,
        mark: '✔️',
      })
    } catch (error) {
      spinner.stop({
        text: `${title}: Failed`,
        mark: '❌',
      })
      throw error
    }
  }

  protected loadEnvironmentFile(path: string): void {
    const envFilePath = getAbsolutePath(path)
    if (existsSync(envFilePath)) {
      // parse using dotenv.config
      // env file will both get returned AND put into current process.env
      const result = config({
        path: envFilePath,
      })

      if (result.error || !result.parsed) {
        this.error(`Failed to parse input .env: ${result.error}`, {
          exit: 1,
        })
      }

      // add result to environment map
      for (const [key, value] of Object.entries(result.parsed)) {
        this.environment.set(key, value)
      }
    } else {
      throw new Error(`Could not find .env file at ${envFilePath}`)
    }
  }

  protected async loadUserScriptValues(path: string): Promise<void> {
    // run user script with current env vars
    const content = await runUserScript(path, this.environment)

    // parse script result:
    // 1. All keys become CONSTANT_CASE
    // 2. Every key whose value is not a string, boolean or number gets removed
    const parsedContent = parseEnv(content)

    // add result to environment map
    for (const [key, value] of Object.entries(parsedContent)) {
      this.environment.set(key, value)
    }
  }
}
