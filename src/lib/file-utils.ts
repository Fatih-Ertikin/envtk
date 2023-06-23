import {isFunction} from 'lodash'
import {existsSync, writeFileSync} from 'node:fs'
import {basename, extname, isAbsolute, join} from 'node:path'
import {NoValidScriptError} from './errors'
import {createEnvString, doSanitized} from './env'

/**
 * Gets the absolute path from a relative or absolute path
 * @param path path
 * @returns absolute paht
 */
export function getAbsolutePath(path: string): string {
  const cwd = process.cwd()
  return isAbsolute(path) ? path : join(cwd, path)
}

/**
 * Checks a file path against a given set of extensions
 * @param path path of a file
 * @param allowedExtensions array of allowed extensions
 * @returns whether the given file path is of one of the allowed extensions
 */
export function checkFileExtension(
  path: string,
  allowedExtensions: string[],
): boolean {
  const absolutePath = getAbsolutePath(path)
  const fileName = basename(path)
  const fileExt = fileName.startsWith('.') ? fileName : extname(absolutePath) // extname doesn't work with files starting with . (.env, .gitignore, etc)
  return allowedExtensions.includes(fileExt)
}

/**
 * Writes a given object to a .env file with correct key value pair formatting
 * @param inputObject any key value pair (object) containing primitive values (booleans, numbers, string). Can be of any nesting level
 * @param outputPath output path where to write the .env file to
 * @returns void
 */
export function createEnvFile(
  inputObject: Record<string, any>,
  outputPath: string,
): void {
  // 1. Create writable stream on output path
  let fileContent = ''

  // 2. recursive function to write obj in kvp format to stream
  doSanitized(inputObject, (key, value) => {
    const envString = createEnvString(key, value)
    // 3. write input object to file
    fileContent += envString
  })

  writeFileSync(outputPath, fileContent)
}

/**
 * Runs a script with given parameters and returns the result
 * @param path path to the .(c)js script
 * @param args object args passed to the script
 * @returns script result
 * @throws {NoValidScriptError} when the script could not be found, is not a js script, or does not export a default function
 */
export async function runUserScript(
  path: string,
  args?: Record<string, any>,
): Promise<any> {
  const allowedExtensions = ['.js', '.cjs']

  const scriptPath = getAbsolutePath(path)

  if (!existsSync(scriptPath)) {
    throw new NoValidScriptError({
      message: `Could not find script file at location: ${scriptPath}`,
      suggestions: ['check if the script does exist at the given location'],
      ref: 'http://www.google.com',
    })
  }

  if (!checkFileExtension(scriptPath, allowedExtensions)) {
    throw new NoValidScriptError({
      message: `file extension is not one of: ${allowedExtensions.join(',')}`,
      suggestions: ['check if the scripts has a .js or .cjs extension'],
      ref: 'http://www.google.com',
    })
  }

  const userScript = (await import(scriptPath)).default

  if (!isFunction(userScript)) {
    throw new NoValidScriptError({
      suggestions: [
        'check if the scripts default export is a function',
        'check if commonJS exports are used (ES6 exports dont work yet)',
      ],
      ref: 'http://www.google.com',
    })
  }

  const result = await userScript(args)

  return result
}
