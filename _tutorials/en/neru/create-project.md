---
title: Create a NeRu Project
description: In this step you learn how to create a NeRu Project.
---

# Create a NeRu Project

In your project folder, run

```
neru init
```

- Choose project name
- Choose the application you created earlier
- Choose runtime environment - `nodejs16`
- Choose a region
- Choose the instance name - `dev`
- Skip a template

## Install the NeRu SDK

You now need to install the NeRu SDK and other dependencies, run:

```sh
npm init esnext -y
```

This will create a `package.json` file for your project, then run:

```sh
npm install -s neru-alpha express
```

This will install the NeRu SDK and Express JS.

## Configure your project 

Open the `neru.yml` file in your text editor and add an `environment` object with the number you bought earlier, the voice capability and entrypoint. Your file should look similar to this, with your own application ID and vonage number:

```yml
project:
    name: neru-test-app
instance:
    name: dev
    runtime: nodejs16
    region: aws.euw1
    application-id: $VONAGE_APPLICATION_ID
    capabilities:
        - voice
        - messaging
    environment:
        - name: VONAGE_NUMBER
          value: "44700000000"
    entrypoint: [node, index.js]
```