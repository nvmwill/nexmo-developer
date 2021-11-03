---
title: NeRu Configuration File
description: This documentation describes the NeRu configuration file
meta_title: NeRu Configuration File
---

# NeRu Configuration File

The NeRu Configuration file (`neru.yml`), gives information to the NeRu platform on how to debug and deploy your application. It is a YAML file which has objects to allow you to configure where your instances are deployed, which Vonage application you are connected to and so on. Here is an example configuration file:

```partial
source: _partials/neru/manifest.md
```

## Project

A project is a namespace for grouping instances. 

### Name

`name` is a unique string identifier for your project. You can have multiple instances within a project, in a one project to many instances relationship. For example, an instance for running your production code, an instance running your development code, and an instance for staging.

To have multiple instances, create a new configuration file, e.g. `prod.yml`, and ensure that the project name is the same. To deploy different configuration files you can pass the path to the different configuration files to the [deploy CLI command](/neru/guides/deploying#how-to-deploy).

## Instance

An instance is your code running on the NeRu platform. To run your code, the platform needs some information on where to run it and how to run it. 

### Name

`name` is a unique string identifier for your instance. This allows you to differentiate when you have multiple instances in your project. The name of the instance has no bearing on what environment your instance will be running, this is controlled by the `region`.

### Runtime

`runtime` is the language you have built your source code with, the available options are:

* `nodejs16`
* `python3`

### Region

`region` is where the instance will run. The current available regions are:

* EU - `aws.euw1`
* US - `aws.use1`
* APAC - `aws.apse1`

### Application ID

`application-id` is the Vonage Application ID that the instance will be connected to, this will allow NeRu to set the application's callbacks for you and access linked numbers.

### Entrypoint

`entrypoint` is used to give commands to NeRu on how to run your application. `entrypoint` takes a string array which is then run to start your application. For example, to run my application I would use:

```
node index.js
```

This will become:

```
entrypoint: [node, index.js]
```

The first item is the command to be run, followed by any flags or parameters

### Capabilities

`capabilities` map to the capabilities available for Vonage Applications, the available options are:

* voice
* messaging
* rtc

> Note: You cannot use the voice capability and rtc capability at the same time.

### Configurations

`configurations` allows you to optionally pass information to your application's code as NeRu injects them for you. They will be available on the environment, so the above example will be available as:

```
process.env.NERU_CONFIGURATIONS.contact;
```

### Secrets

`secrets` allows you to optionally expose secrets you have created with the CLI already to the instance. For more information on creating and managing secrets view the [NeRu secrets guide](/neru/guides/secrets).


## Debug

The debug object gives information to the NeRu CLI on how to run your application in debug mode. For more information on debugging, view the [NeRu debugging guide](/neru/guides/debugging).

### Name

`name` allows you to give your debugger a name so the generated debug URL is static, rather than randomized when the debugger starts.

### Entrypoint

`entrypoint` for debug works the same as the [instance entrypoint](/guides/manifest#entrypoint). This gives you the flexibility to have a separate debug workflow for example including a file watcher to restart the application when changes are made:

```
nodemon --inspect index.js
```

Becomes:

```
entrypoint: [nodemon, --inspect, index.js]
```


