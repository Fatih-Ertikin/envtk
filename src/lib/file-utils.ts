import {constantCase} from 'change-case'
import {isFunction} from 'lodash'
import {createWriteStream, existsSync} from 'node:fs'
import {basename, extname, isAbsolute, join, resolve} from 'node:path'
import {NoValidScriptError} from './errors'

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
export function checkFileExtension(path: string, allowedExtensions: string[]): boolean {
  const absolutePath = getAbsolutePath(path)
  const fileName = basename(path)
  const fileExt = fileName.startsWith('.') ? fileName : extname(absolutePath) // extname doesn't work with files starting with . (.env, .gitignore, etc)
  return allowedExtensions.includes(fileExt)
}

/**
   * Creates a string in kev value format (with a = delimiter)
   * @param key Key string, automtically gets converted to SCREAMING_SNAKE_CASE
   * @param value value object, can only be primitive values (strings, booleans, numbers)
   * @returns string in .env format
   */
function createEnvString(key: string, value: string | boolean | number): string {
  const ENV_KEY = constantCase(key).toUpperCase()
  const ENV_VAL = value
  return `${ENV_KEY}="${ENV_VAL}"\n`
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
  const stream = createWriteStream(resolve(outputPath.toString()))

  // 2. recursive function to write obj in kvp format to stream
  const writeObj = (obj: Record<string, any>,
    key?: string | null) => {
    if (typeof obj === 'string' && !!key) {
      const envString = createEnvString(key, obj)
      stream.write(envString)
    } else {
      for (const k in obj) {
        if (typeof obj[k] === 'string' || typeof obj[k] === 'boolean' || typeof obj[k] === 'number') {
          const envString = createEnvString(k, obj[k])
          stream.write(envString)
        } else if (typeof obj[k] === 'object') {
          writeObj(obj[k], key)
        }
      }
    }
  }

  // 3. write input object to file
  writeObj(inputObject, null)
}

/**
 * Runs a script with given parameters and returns the result
 * @param path path to the .(c)js script
 * @param args object args passed to the script
 * @returns script result
 * @throws {NoValidScriptError} when the script could not be found, is not a js script, or does not export a default function
 */
export async function runUserScript(path: string, args?: Record<string, any>): Promise<any> {
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
      suggestions: ['check if the scripts default export is a function', 'check if commonJS exports are used (ES6 exports dont work yet)'],
      ref: 'http://www.google.com',
    })
  }

  const result = await userScript(args)

  return result
}
