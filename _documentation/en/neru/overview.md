---
title: Overview
description: This documentation describes NeRu
meta_title: NeRu
---

# Overview (WIP)

NeRu eliminates the need to maintain your own infrastructure to use the Vonage APIs. The platform has multiple different APIs including voice, messaging, data persistence, scheduling, and more. The flexibility of the platform is a perfect fit for building use cases such as voice and message notifications, IVRs, and chatbots.

NeRu offers user friendly tooling to develop an app including a [debugger](/neru/debugging.md), templates, and samples. Checkout the [Get started with NeRu](/neru/tutorials/neru-get-started) tutorial to learn more about how to develop with NeRu. 

## Concepts

## Project

The namespace in which you manage your code and configuration. Typically, a project implements a specific piece of business logic or an application.

## Application 

The underlying [Vonage application](/application/overview), which will be associated with any running instance of your project. 

The application determines the available communication resources (phone number, WhatsApp id, in-app communication users, etc.) that your project instance can use. The application contains the keys for authentication, the mapping of webhooks for underlying Vonage channel APIs.

## Instance

The running instance of your project in a certain version and specific configuration (see package). There could be multiple instances running and the difference between them could be the code, configuration, region. Each instance exposes a unique URL which allows you to reach it.

## Package

A certain version of the code and the accompanying files that can be deployed. A deployed package is an instance of your project. The name given to it, a randomized hash, represents the version. You can use this name to roll back to any version of your project’s instance.

## Deployment

The action of deploying the code and configuration, a package, which results in a running instance of your project.

## Assets

Files that you can use multiple times in your account, across multiple projects (voice prompts, knowledgebase, images, etc.)

## NeRu Configuration File

The `init` command of the NeRu CLI creates a `neru.yml` file. This `neru.yml` file contains information about your project and its instances.

```yml
project:
    name: neru-test-app
instances:
    name: dev
    runtime: nodejs
    region: aws.euw1
    application-id: fcd08ece-f3c2-4adf-bf84-5ba8a1c86e0e
    configurations:
        contact:
            number: "44700000000"
            type: "phone"
    secrets: []
```

Under the `configurations` key you can add information that you would want to pass to your instances for example a Vonage number.