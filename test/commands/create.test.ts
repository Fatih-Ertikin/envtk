/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {expect, test} from '@oclif/test'
import {cwd} from 'node:process'
import {extname, join} from 'node:path'
import {existsSync,  unlinkSync} from 'node:fs'
import {constantCase} from 'change-case'
import {getEnvFileContent} from '../helpers/test-functions'

const mockSecrets = require('../helpers/mock-data')
const PRINT = !process.env.CI
const SCRIPT_PATH = join(cwd(), 'test', 'files', 'async.cjs')
const ENV_FILE_PATH = join(cwd(), 'test', 'files', '.test.env')
const OUTPUT_PATH = join(cwd(), 'test', 'files', 'output.env')

describe('create', () => {
  beforeEach(done => {
    if (existsSync(OUTPUT_PATH)) {
      unlinkSync(OUTPUT_PATH)
    }

    done()
  })

  test
  .stdout({print: PRINT})
  .command(['create', OUTPUT_PATH, '-s', SCRIPT_PATH])
  .exit(0)
  .it(
    'should create a new .env file with env vars from user script (-s) flag',
    (ctx, done) => {
      // 1. check if file actually got created
      const fileExists =
          existsSync(OUTPUT_PATH) && extname(OUTPUT_PATH) === '.env'
      expect(fileExists).to.be.true

      // 3. load file as object
      const result = getEnvFileContent(OUTPUT_PATH)

      // 3. Check if all mock secrets (that the script returns) are present in file
      for (const [key, value] of Object.entries(mockSecrets)) {
        const expectedKey = constantCase(key)
        expect(result[expectedKey]).to.equal(value as any)
      }

      done()
    },
  )

  test
  .stdout({print: PRINT})
  .command(['create', OUTPUT_PATH, '-e', ENV_FILE_PATH])
  .exit(0)
  .it(
    'should create a new .env file with env vars from existing env file (-e) flag',
    (ctx, done) => {
      // 1. check if file actually got created
      const fileExists =
          existsSync(OUTPUT_PATH) && extname(OUTPUT_PATH) === '.env'
      expect(fileExists).to.be.true

      // 3. load output file as json object
      const outputResult = getEnvFileContent(OUTPUT_PATH)

      // 4. load input file as json object
      const inputFile = getEnvFileContent(ENV_FILE_PATH)

      // 3. Check if values from inputted .env file are present in output file
      for (const [key, value] of Object.entries(inputFile)) {
        const expectedKey = constantCase(key)
        expect(outputResult[expectedKey]).to.equal(value as any)
      }

      done()
    },
  )

  test
  .stdout({print: PRINT})
  .command(['create', OUTPUT_PATH, '-e', ENV_FILE_PATH])
  .exit(0)
  .it(
    'should create a new .env file with env vars from user script (-s) flag',
    (ctx, done) => {
      // 1. check if file actually got created
      const fileExists =
          existsSync(OUTPUT_PATH) && extname(OUTPUT_PATH) === '.env'
      expect(fileExists).to.be.true

      // 3. load output file as json object
      const outputResult = getEnvFileContent(OUTPUT_PATH)

      // 4. load input file as json object
      const inputFile = getEnvFileContent(ENV_FILE_PATH)

      // 3. Check if values from inputted .env file are present in output file
      for (const [key, value] of Object.entries(inputFile)) {
        const expectedKey = constantCase(key)
        expect(outputResult[expectedKey]).to.equal(value as any)
      }

      done()
    },
  )
})
