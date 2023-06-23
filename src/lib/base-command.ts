import {Command, Flags, Interfaces} from '@oclif/core'
import {getAbsolutePath, runUserScript} from './file-utils'
import {existsSync} from 'node:fs'
import {config} from 'dotenv'
import {doSanitized} from './env'
import {constantCase} from 'change-case'
import {ERROR_CODES} from './errors'

/** flags */
const SCRIPT_FLAG = 'script' as const
const ENV_FILE_FLAG = 'envFile' as const
const SILENT_FLAG = 'silent' as const

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<
  (typeof BaseCommand)['baseFlags'] & T['flags']
>;
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>;

export abstract class BaseCommand<T extends typeof Command> extends Command {
  static enableJsonFlag = true

  // base flags that every inherited command has access to
  static baseFlags = {
    [SCRIPT_FLAG]: Flags.file({
      char: 's',
      description: 'path to .(mjs|js) script.',
      exists: true,
      required: false,
    }),
    [ENV_FILE_FLAG]: Flags.file({
      char: 'e',
      description: 'path to .env file with defaults to include',
      exists: true,
      required: false,
    }),
    [SILENT_FLAG]: Flags.boolean({
      default: false,
      required: false,
    }),
  };

  protected flags!: Flags<T>;
  protected args!: Args<T>;
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

    // Oclif has no "oneOf" option to require atleast one of a given set of flags
    // So we validate that manually here
    if (!flags[ENV_FILE_FLAG] && !flags[SCRIPT_FLAG]) {
      this.error('No flags passed', {
        exit: 1,
        message: 'Atleast one of the following flags must be given: -s, -e',
        code: ERROR_CODES.NO_VALID_FLAGS,
        suggestions: ['run "envtk run --help for more info"'],
      })
    }

    // Initialize environment with a copy of the current process.env
    const copy = JSON.parse(JSON.stringify(process.env))
    this.environment = new Map(Object.entries(copy))
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
      // DONT change keys to CONSTANT_CASE to keep env vars exactly as inputted from file
      for (const [key, value] of Object.entries(result.parsed)) {
        this.environment.set(key, value)
      }
    } else {
      throw new Error(`Could not find .env file at ${envFilePath}`)
    }
  }

  protected async loadUserScriptValues(path: string): Promise<void> {
    // run user script with current env vars
    const envObj = Object.fromEntries(this.environment) as Record<string, any> // create object from map because exec doesn't work with maps
    const content = await runUserScript(path, envObj)

    // parse script result:
    // Every key whose value is not a string, boolean or number gets removed
    const parsedContent: Record<string, boolean | string | number> = {}
    doSanitized(content, (key, value) => {
      parsedContent[key] = value
    })

    // add result to environment map and change keys to CONSTANT_CASE
    for (const [key, value] of Object.entries(parsedContent)) {
      this.environment.set(constantCase(key), value)
    }
  }
}
