import {constantCase} from 'change-case'

export function parseEnv(obj: Record<string, any>): Record<string, string | number | boolean> {
  const result: Record<string, string | number | boolean> = {}

  const writeObj = (obj: Record<string, any>,
    key?: string | null) => {
    if (typeof obj === 'string' && !!key) {
      const newKey = constantCase(key).toUpperCase()
      result[newKey] = obj
    } else {
      for (const k in obj) {
        if (typeof obj[k] === 'string' || typeof obj[k] === 'boolean' || typeof obj[k] === 'number') {
          const newKey = constantCase(k).toUpperCase()
          result[newKey] = obj[k]
        } else if (typeof obj[k] === 'object') {
          writeObj(obj[k], key)
        }
      }
    }
  }

  writeObj(obj, null)
  return result
}

export function deepCopy(obj: Record<string, any>): any {
  return JSON.parse(JSON.stringify(obj))
}
