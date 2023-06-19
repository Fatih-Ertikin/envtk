import {Command, Flags, Interfaces} from '@oclif/core'
import {createSpinner} from 'nanospinner'

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
      required: false,
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
}
