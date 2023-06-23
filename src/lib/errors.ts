import {CLIError, PrettyPrintableError} from '@oclif/core/lib/errors'

import {parse} from 'node:path'

const GITHUB_LINK = 'https://github.com/Fatih-Ertikin/envtk'

export const enum ERROR_CODES {
  NO_VALID_SCRIPT = '10',
  NO_FILE = '20',
  WRONG_FILE_EXT = '30',
  NO_VALID_FLAGS = '40'
}

export class NoValidScriptError extends CLIError {
  constructor(path: string) {
    const config: PrettyPrintableError = {
      code: ERROR_CODES.NO_VALID_SCRIPT,
      message: 'Default export is not a function.',
    }
    super(`Script: "${path}" could not be executed`, config)
  }
}

export class NonExistingFileError extends CLIError {
  constructor(filetype: string, path: string) {
    const config: PrettyPrintableError = {
      code: ERROR_CODES.NO_FILE,
      message: `No file found at path: ${path}`,
      suggestions: ['Check if the file exists at path'],
      ref: GITHUB_LINK,
    }

    const title = `Could not find ${filetype}!`
    super(title, config)
  }
}

export class WrongFileExtensionError extends CLIError {
  constructor(path: string, allowedExtensions: string[]) {
    const suggestions = allowedExtensions.map(ext => {
      const fileName = parse(path).name
      return `Change the file: "${path}" to "${fileName}.${ext}"`
    })

    const config: PrettyPrintableError = {
      code: ERROR_CODES.WRONG_FILE_EXT,
      message: `file extension: "${path}" is not one of: ${allowedExtensions.join(',')}`,
      suggestions: suggestions,
      ref: GITHUB_LINK,
    }

    const title = `File: "${path}" has invalid extension!`
    super(title, config)
  }
}
