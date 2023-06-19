
# Async env
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)


CLI tool to asynchronously load environment variables from a script and:
- run another command with those variables as environment (for example starting a node project)
- output the resulting environment variables as a new .env file
- use existing .env files to load defaults into a user script
- output the result as JSON in the terminal




## Installation

Install async-env with npm:

```bash
  $ npm install -g async-env
```  
## Quickstart

running a command with environment variables from a script:
```bash
  $ async-env run printenv --script=myScript.js
  ENV_VALUE_FROM_SCRIPT="abc123"
```

creating a new .env file with environment variables from a script:
```bash
  $ async-env create ".new.env" --script=myScript.js
```  
`.new.env`:
```
ENV_VALUE_FROM_SCRIPT="abc123"
```
## Table of contents
* [Motives](#Motives)
* [Usage/examples](#Usage/Examples)


## Motives

I noticed that a lot of populair frameworks, infrastructure tooling or other 3rd party services make use of environment variables or .env files but provide no way to load them from a 3rd pary secret manager (for example [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html)).

While tooling like [dotenv-vault](https://www.dotenv.org/docs/quickstart) provides alot of functionality for safely managing secrets/environment variables, not everyone uses or can use dotenv-vault. This project aims to be a simple alternative tool for retrieving your secrets from wherever: a 3rd pary API, encrypted database, whatever and then passing those variables to the next step in your startup/deploy pipeline.
## Usage/Examples
async-env has 2 commands:
- run <- runs a command with the new environment variables
- create <- creates a new .env file with the new environment variables

### Using a script to (asynchronously) retrieve and set new environment variables:
Create javascript file `my-script.js`:
```javascript

// function to get env vars from a 3rd party api
const getSomethingFromApi = async () => ({
    value: "abc123"
});

async function getSomethingFromApi() {  
    const secrets = await getSomethingFromApi();
   
    return {
        MY_SECRET: secrets.value 
    };
}
module.exports = getSomethingFromApi // <- default export the function
```
Then in the terminal execute the `run` command:
```bash
$ async-env run printenv -s ./my-script.js # <- use script flag (-s/--script)
```

Output:
```
MY_SECRET: "abc123"
```
Because we ran "printenv" the current environment variables get printed to the terminal.
If would for example start a node project, that node project would have access to `process.env.MY_SECRET`

### load env variables from a user script and write to new .env file
Create javascript file `my-script.js`:
```javascript

// function to get env vars from a 3rd party api
const getSomethingFromApi = async () => ({
    value: "abc123"
});

async function getSomethingFromApi() {  
    const secrets = await getSomethingFromApi();
   
    return {
        MY_SECRET: secrets.value 
    };
}
module.exports = getSomethingFromApi // <- default export the function
```
Then in the terminal run the `create` command:
```bash
$ async-env create ./.new-file.env -s ./my-script.js 
```

Output file `.new-file.env`:
```
MY_SECRET: "abc123"
```
Because we ran "printenv" the current environment variables get printed to the terminal.
