
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
* [`envtk plugins`](#envtk-plugins)
* [`envtk plugins:install PLUGIN...`](#envtk-pluginsinstall-plugin)
* [`envtk plugins:inspect PLUGIN...`](#envtk-pluginsinspect-plugin)
* [`envtk plugins:install PLUGIN...`](#envtk-pluginsinstall-plugin-1)
* [`envtk plugins:link PLUGIN`](#envtk-pluginslink-plugin)
* [`envtk plugins:uninstall PLUGIN...`](#envtk-pluginsuninstall-plugin)
* [`envtk plugins:uninstall PLUGIN...`](#envtk-pluginsuninstall-plugin-1)
* [`envtk plugins:uninstall PLUGIN...`](#envtk-pluginsuninstall-plugin-2)
* [`envtk plugins:update`](#envtk-pluginsupdate)
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

## `envtk plugins`

List installed plugins.

```
USAGE
  $ envtk plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ envtk plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `envtk plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ envtk plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ envtk plugins:add

EXAMPLES
  $ envtk plugins:install myplugin 

  $ envtk plugins:install https://github.com/someuser/someplugin

  $ envtk plugins:install someuser/someplugin
```

## `envtk plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ envtk plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ envtk plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/inspect.ts)_

## `envtk plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ envtk plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ envtk plugins:add

EXAMPLES
  $ envtk plugins:install myplugin 

  $ envtk plugins:install https://github.com/someuser/someplugin

  $ envtk plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/install.ts)_

## `envtk plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ envtk plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ envtk plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/link.ts)_

## `envtk plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ envtk plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ envtk plugins:unlink
  $ envtk plugins:remove
```

## `envtk plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ envtk plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ envtk plugins:unlink
  $ envtk plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/uninstall.ts)_

## `envtk plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ envtk plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ envtk plugins:unlink
  $ envtk plugins:remove
```

## `envtk plugins:update`

Update installed plugins.

```
USAGE
  $ envtk plugins:update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/update.ts)_

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
