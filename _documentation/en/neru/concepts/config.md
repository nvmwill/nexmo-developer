---
title: Configuration File
description: This documentation describes the NeRu Configuration File
navigation_weight: 6
---

# NeRu Configuration File

The `init` command of the NeRu CLI creates a `neru.yml` file. This `neru.yml` file contains information about your project and its instances:

```yml
project:
    name: neru-test-app
instances:
    name: eu-dev-test-app
    runtime: nodejs
    region: euw1
    application-id: fcd08ece-f3c2-4adf-bf84-5ba8a1c86e0e
    configuration:
        contact:
            number: "44700000000"
            type: "phone"
    secrets: []
```

Under the `configuration` key you can add information that you would want to pass to your instances for example a Vonage number.