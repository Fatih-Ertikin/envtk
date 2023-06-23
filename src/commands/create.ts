import {Args} from '@oclif/core'
import {BaseCommand} from '../lib/base-command'
import {createEnvFile} from '../lib/file-utils'

/** arguments */
const OUTPUT_ARG = 'output'

export default class Create extends BaseCommand<typeof Create> {
  static description = 'create a .env file using env vars loaded from a script or existing .env files'

  static examples = [
    {
      command: 'envtk create ".env" -s ./load-env.js',
      description: 'Create .env file with env variables returned from script',
    },
    {
      command: 'envtk create ".env" -s ./load-env.js -e .defaults.env',
      description:
        ' Create .env file with env variables returned from script and include defaults from ".defaults.env"',
    },
  ]

  static args = {
    [OUTPUT_ARG]: Args.file({
      description: 'path for the output file',
      required: true,
      exists: false,
    }),
  }

  public async run(): Promise<any> {
    const {args, flags} = await this.parse(Create)

    const outputPath = args[OUTPUT_ARG] // output path of new .env file

    if (flags.envFile) {
      this.loadEnvironmentFile(flags.envFile)
    }

    if (flags.script) {
      await this.loadUserScriptValues(flags.script)
    }

    const envObj = Object.fromEntries(this.environment) // create object because createEnvFile doesn't work with maps
    createEnvFile(envObj, outputPath)

    if (flags.json) {
      return envObj
    }

    this.exit(0)
  }
}
