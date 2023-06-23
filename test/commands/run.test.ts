import {test} from '@oclif/test'
import {join} from 'node:path'
import {cwd} from 'node:process'
import {checkObjectContains, getEnvFileContent} from '../helpers/test-functions'

// eslint-disable-next-line unicorn/prefer-module
const mockSecrets = require('../helpers/mock-data')
const PRINT = !process.env.CI
const DUMMY_COMMAND = process.platform === 'win32' ? 'rem' : 'true'
const SCRIPT_PATH = join(cwd(), 'test', 'files', 'async.cjs')
const ENV_FILE_PATH = join(cwd(), 'test', 'files', '.test.env')

describe('run', () => {
  test
  .stdout({print: PRINT})
  .command(['run',
    DUMMY_COMMAND,
    '-s',
    SCRIPT_PATH,
    '--json'])
  .it('should user commmand with env vars from script (-s flag)', (ctx, done) => {
    const output = JSON.parse(ctx.stdout) // parse output because we use the --JSON flag

    checkObjectContains(output, mockSecrets, true) // output of script files should be CONSTANT_CASE

    done()
  })

  test
  .stdout({print: PRINT})
  .command(['run',
    DUMMY_COMMAND,
    '-e',
    ENV_FILE_PATH,
    '--json'])

  .it('should user commmand with env vars from .env file  (-e flag)', (ctx, done) => {
    // parse output because we use the --JSON flag
    const output = JSON.parse(ctx.stdout)

    // get the expected variables which where loaded from the .env file specified in the "-e" flag
    const inputEnvFile = getEnvFileContent(ENV_FILE_PATH)

    checkObjectContains(output, inputEnvFile, true) // vars from passed .env file should be CONSTANT_CASE

    done()
  })

  test
  .stdout({print: PRINT})
  .command(['run',
    DUMMY_COMMAND,
    '-e',
    ENV_FILE_PATH,
    '-s',
    SCRIPT_PATH,
    '--json'])
  .it('should load env vars with both flags passed (file & script)', (ctx, done) => {
    // parse output because we use the --JSON flag
    const output = JSON.parse(ctx.stdout)

    // get the expected variables which where loaded from the .env file specified in the "-e" flag
    const inputEnvFile = getEnvFileContent(ENV_FILE_PATH)

    // check if all env vars from file are present as CONSTANT_CASE env var in terminal output
    checkObjectContains(output, inputEnvFile, true)

    // check if all mock items are present as CONSTANT_CASE env var in terminal output
    checkObjectContains(output, mockSecrets, true)

    done()
  })
})
