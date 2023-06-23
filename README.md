
# Envtk - environment toolkit
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)


CLI tool to asynchronously load environment variables from a script and:
- run another command with those variables as environment (for example starting a node project)
- output the resulting environment variables as a new .env file
- use existing .env files to load defaults into a user script
- output the result as JSON in the terminal




## Installation

Install envtk with npm:

```bash
  $ npm install -g envtk
```  
## Quickstart

running a command with environment variables from a script:
```bash
  $ envtk run printenv --script=myScript.js
  ENV_VALUE_FROM_SCRIPT="abc123"
```

creating a new .env file with environment variables from a script:
```bash
  $ envtk create ".new.env" --script=myScript.js
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

# Usage

  <!-- usage -->
```sh-session
$ npm install -g envtk
$ envtk COMMAND
running command...
$ envtk (--version)
envtk/0.0.0-development linux-x64 node-v18.16.0
$ envtk --help [COMMAND]
USAGE
  $ envtk COMMAND
...
```
<!-- usagestop -->

  # Commands

  <!-- commands -->
* [`envtk create OUTPUT`](#envtk-create-output)
* [`envtk help [COMMANDS]`](#envtk-help-commands)
* [`envtk run COMMAND`](#envtk-run-command)

## `envtk create OUTPUT`

create a .env file using env vars loaded from a script or existing .env files

```
USAGE
  $ envtk create OUTPUT [--json] [-s <value>] [-e <value>] [-v]

ARGUMENTS
  OUTPUT  path for the output file

FLAGS
  -e, --envFile=<value>  path to .env file with defaults to include
  -s, --script=<value>   path to .(mjs|js) script.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  create a .env file using env vars loaded from a script or existing .env files

EXAMPLES
  Create .env file with env variables returned from script

    $ envtk create ".env" -s ./load-env.js

  Create .env file with env variables returned from script and include defaults from ".defaults.env"

    $ envtk create ".env" -s ./load-env.js -e .defaults.env
```

_See code: [dist/commands/create.ts](https://github.com/Fatih-Ertikin/envtk/blob/v0.0.0-development/dist/commands/create.ts)_

## `envtk help [COMMANDS]`

Display help for envtk.

```
USAGE
  $ envtk help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for envtk.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `envtk run COMMAND`

run a given command with loaded env variables

```
USAGE
  $ envtk run COMMAND [--json] [-s <value>] [-e <value>] [-v]

ARGUMENTS
  COMMAND  command to run with the loaded environment variables

FLAGS
  -e, --envFile=<value>  path to .env file with defaults to include
  -s, --script=<value>   path to .(mjs|js) script.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  run a given command with loaded env variables

EXAMPLES
  Run command with env variables returned from script

    $ envtk run "npm run dev" -s ./load-env.js

  Run command with env variables returned from script and include defaults from ".env"

    $ envtk run "npm run dev" -s ./load-env.js -e .env
```

_See code: [dist/commands/run.ts](https://github.com/Fatih-Ertikin/envtk/blob/v0.0.0-development/dist/commands/run.ts)_
<!-- commandsstop -->


## `envtk create OUTPUT`

create a .env file using env vars loaded from a script or existing .env files

```
USAGE
  $ envtk create OUTPUT [--json] [-s <value>] [-e <value>] [-v]

ARGUMENTS
  OUTPUT  path for the output file

FLAGS
  -e, --envFile=<value>  path to .env file with defaults to include
  -s, --script=<value>   path to .(mjs|js) script.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  create a .env file using env vars loaded from a script or existing .env files

EXAMPLES
  Create .env file with env variables returned from script

    $ envtk create ".env" -s ./load-env.js

  Create .env file with env variables returned from script and include defaults from ".defaults.env"

    $ envtk create ".env" -s ./load-env.js -e .defaults.env
```

_See code: [dist/commands/create.ts](https://github.com/Fatih-Ertikin/envtk/blob/v0.0.0-development/dist/commands/create.ts)_

## `envtk help [COMMANDS]`

Display help for envtk.

```
USAGE
  $ envtk help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for envtk.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_
