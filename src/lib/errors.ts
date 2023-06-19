import {CLIError, PrettyPrintableError} from '@oclif/core/lib/errors'

const enum ERROR_CODES {
  NO_VALID_SCRIPT = 10
}

export class NoValidScriptError extends CLIError {
  constructor(options: Omit<PrettyPrintableError, 'code'>) {
    const config: PrettyPrintableError = {
      ...options,
      code: ERROR_CODES.NO_VALID_SCRIPT.toString(10),
    }
    super('User provided script is invalid', config)
  }
}

