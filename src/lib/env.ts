type SanitizedValue = string | number | boolean

/**
 * loops through an object of any depth and calls the callback function for every string, number or boolean value
 * @param obj input object
 * @param callback callback function that gets called for every string, number or boolean value
 * @returns void
 */
export function doSanitized(obj: Record<string, any>, callback: (key: string, value: SanitizedValue) => void): void {
  const loopRecursively = (obj: Record<string, any>,
    key?: string | null) => {
    if (typeof obj === 'string' && !!key) {
      callback(key, obj)
    } else {
      for (const k in obj) {
        if (typeof obj[k] === 'string' || typeof obj[k] === 'boolean' || typeof obj[k] === 'number') {
          callback(k, obj[k])
        } else if (typeof obj[k] === 'object') {
          loopRecursively(obj[k], key)
        }
      }
    }
  }

  loopRecursively(obj, null)
}

export function deepCopy(obj: Record<string, any>): any {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Creates a string that can be used in a .env file
 * @param key key
 * @param value value
 * @returns string
 */
export function createEnvString(
  key: string,
  value: string | boolean | number,
): string {
  return `${key}="${value}"\n`
}
