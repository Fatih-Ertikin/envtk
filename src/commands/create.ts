import {Args} from '@oclif/core'
import {BaseCommand} from '../lib/base-command'

/** arguments */
const OUTPUT_ARG = 'output'

export default class Create extends BaseCommand<typeof Create> {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static args = {
    [OUTPUT_ARG]: Args.file({
      description: 'path for the output file',
      required: true,
      exists: false,
    }),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Create)

    this.error('NOT IMPLEMENTED YET', {exit: 1})
  }
}
