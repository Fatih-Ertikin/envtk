
/**
 * Function to retrieve environment variables (for example aws secret manager)
 * @param currentEnv a copied object of the current environment, this includes defaults passed from a .enf file (see -e flag)
 * @returns object with the env variables, values can only be strings, bools and numbers, can be of any depth, key names will be transformed into SCREAMING_SNAKE CASE
 */
async function getEnvVars(currentEnv) {
  const getSomethingFromMySecretManager = async () => ({
    SecretKey: 'secretValue', // SECRET_KEY="secretValue"
  })

  const secret = await getSomethingFromMySecretManager()

  return {
    ...secret,
    ScriptKey: 'ScriptValue', // -> SCRIPT_KEY="ScriptValue"
    enableSomething: true, // -> ENABLE_SOMETHING="true"
    SOME_NUMBER: 1, // -> SOME_NUMBER="1"
    DEEP_NESTED: {}, // will be ignored
    arr: [], // will be ignored
    somethingCrazy: new Error('this doesnt fit in env variables'), // will be ignored
  }
}

/**
 * Only commonJS exports work for now
 * The default export must be a (async) function
 */
module.exports = getEnvVars
