oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g async-env
$ async-env COMMAND
running command...
$ async-env (--version)
async-env/0.0.0 linux-x64 node-v18.16.0
$ async-env --help [COMMAND]
USAGE
  $ async-env COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`async-env hello PERSON`](#async-env-hello-person)
* [`async-env hello world`](#async-env-hello-world)
* [`async-env help [COMMANDS]`](#async-env-help-commands)
* [`async-env plugins`](#async-env-plugins)
* [`async-env plugins:install PLUGIN...`](#async-env-pluginsinstall-plugin)
* [`async-env plugins:inspect PLUGIN...`](#async-env-pluginsinspect-plugin)
* [`async-env plugins:install PLUGIN...`](#async-env-pluginsinstall-plugin-1)
* [`async-env plugins:link PLUGIN`](#async-env-pluginslink-plugin)
* [`async-env plugins:uninstall PLUGIN...`](#async-env-pluginsuninstall-plugin)
* [`async-env plugins:uninstall PLUGIN...`](#async-env-pluginsuninstall-plugin-1)
* [`async-env plugins:uninstall PLUGIN...`](#async-env-pluginsuninstall-plugin-2)
* [`async-env plugins update`](#async-env-plugins-update)

## `async-env hello PERSON`

Say hello

```
USAGE
  $ async-env hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/Development/async-env/blob/v0.0.0/dist/commands/hello/index.ts)_

## `async-env hello world`

Say hello world

```
USAGE
  $ async-env hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ async-env hello world
  hello world! (./src/commands/hello/world.ts)
```

## `async-env help [COMMANDS]`

Display help for async-env.

```
USAGE
  $ async-env help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for async-env.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `async-env plugins`

List installed plugins.

```
USAGE
  $ async-env plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ async-env plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `async-env plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ async-env plugins:install PLUGIN...

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
  $ async-env plugins add

EXAMPLES
  $ async-env plugins:install myplugin 

  $ async-env plugins:install https://github.com/someuser/someplugin

  $ async-env plugins:install someuser/someplugin
```

## `async-env plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ async-env plugins:inspect PLUGIN...

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
  $ async-env plugins:inspect myplugin
```

## `async-env plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ async-env plugins:install PLUGIN...

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
  $ async-env plugins add

EXAMPLES
  $ async-env plugins:install myplugin 

  $ async-env plugins:install https://github.com/someuser/someplugin

  $ async-env plugins:install someuser/someplugin
```

## `async-env plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ async-env plugins:link PLUGIN

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
  $ async-env plugins:link myplugin
```

## `async-env plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ async-env plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ async-env plugins unlink
  $ async-env plugins remove
```

## `async-env plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ async-env plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ async-env plugins unlink
  $ async-env plugins remove
```

## `async-env plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ async-env plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ async-env plugins unlink
  $ async-env plugins remove
```

## `async-env plugins update`

Update installed plugins.

```
USAGE
  $ async-env plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
