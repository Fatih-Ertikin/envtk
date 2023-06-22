import {expect} from '@oclif/test'
import {constantCase} from 'change-case'
import {config} from 'dotenv'
import {readFileSync} from 'node:fs'
import {inspect} from 'node:util'

export  function getEnvFileContent(path: string): Record<string, any> {
  const result = config({path})
  if (result.error || !result.parsed)
    throw new Error(
      `Couldn't parse content of file ${path}. Content = ${readFileSync(path, {
        encoding: 'utf-8',
      })}`,
    )
  return result.parsed
}

export function checkObjectContains(obj: Record<string, any>, expected: Record<string, any>, isConstantCase: boolean): void {
  for (const [key, value] of Object.entries(expected)) {
    const expectedKey = isConstantCase ? constantCase(key) : key
    expect(obj[expectedKey]).to.equal(value)
  }
}

export function inspectObj(obj: Record<string, any>): void {
  console.log(inspect(obj, {showHidden: false, depth: null, colors: true}))
}
