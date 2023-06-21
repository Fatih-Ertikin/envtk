/* eslint-disable @typescript-eslint/no-unused-vars */
import {expect, test} from '@oclif/test'
import {constantCase} from 'change-case'
import {config} from 'dotenv'
import {join} from 'node:path'
import {cwd} from 'node:process'
import {inspect} from 'node:util'

// eslint-disable-next-line unicorn/prefer-module
const mockSecrets = require('../helpers/mock-data')
const SCRIPT_PATH = join(cwd(), 'test', 'files', 'async.cjs')
const ENV_FILE_PATH = join(cwd(), 'test', 'files', '.test.env')

const PRINT = true
const DUMMY_COMMAND = process.platform === 'win32' ? 'rem' : 'true'

describe('run', () => {
  beforeEach(done => setTimeout(done, 500))

  test
  .stdout({print: PRINT})
  .command(['run',
    DUMMY_COMMAND, // true does nothing when put into terminal
    '-s',
    SCRIPT_PATH,
    '--json'])
  .it('should user commmand with env vars from script (-s flag)', (ctx, done) => {
    const output = JSON.parse(ctx.stdout) // parse output because we use the --JSON flag
    //  console.log(inspect(output, {showHidden: false, depth: null, colors: true}))

    // check if all mock items are present as CONSTANT_CASE env var in terminal output
    for (const [key, value] of Object.entries(mockSecrets)) {
      const expectedKey = constantCase(key)
      expect(output[expectedKey]).to.equal(value as any)
    }

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
    const fileVars = config({path: ENV_FILE_PATH})
    expect(fileVars.error).to.be.undefined // parsing file should not fail
    const expectedVariables = fileVars.parsed! // json object of the env vars in the file

    // check if all env vars from file are present as CONSTANT_CASE env var in terminal output
    for (const [key, value] of Object.entries(expectedVariables)) {
      const expectedKey = constantCase(key)
      expect(output[expectedKey]).to.equal(value as any)
    }

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
    const fileVars = config({path: ENV_FILE_PATH})
    expect(fileVars.error).to.be.undefined // parsing file should not fail
    const expectedVariables = fileVars.parsed! // json object of the env vars in the file

    // check if all env vars from file are present as CONSTANT_CASE env var in terminal output
    for (const [key, value] of Object.entries(expectedVariables)) {
      const expectedKey = constantCase(key)
      expect(output[expectedKey]).to.equal(value as any)
    }

    // check if all mock items are present as CONSTANT_CASE env var in terminal output
    for (const [key, value] of Object.entries(mockSecrets)) {
      const expectedKey = constantCase(key)
      expect(output[expectedKey]).to.equal(value as any)
    }

    done()
  })
})
