---
title: Overview
description: This documentation describes NeRu
meta_title: NeRu
---

# Overview

NeRu eliminates the need to maintain your own infrastructure to use the Vonage APIs. The platform has multiple different APIs including voice, messaging, data persistence, scheduling, and more. The flexibility of the platform is a perfect fit for building use cases such as voice and message notifications, IVRs, and chatbots.

NeRu offers user friendly tooling to develop an app, including a [debugger](/neru/guides/debugging.md), templates, and sample projects. Checkout the [requirements](/neru/overview#neru-requirements) or the [Get started with NeRu](/neru/getting-started) guide that will take you from project creation to deploying! 

## Concepts

Below are some concepts that you will encounter when working with NeRu.

### Project

The namespace in which you manage your code and configuration. Typically, a project implements a specific piece of business logic or an application.

### Application 

The underlying [Vonage application](/application/overview), which will be associated with any running instance of your project. 

The application determines the available communication resources (phone number, WhatsApp id, in-app communication users, etc.) that your project instance can use. The application contains the keys for authentication, the mapping of webhooks for underlying Vonage channel APIs.

### Providers

[Providers](/neru/providers/overview) are a way for your NeRu code to interact with the Vonage APIs or the NeRu runtime.

### Instance

The running instance of your project in a certain version and specific configuration (see package). There could be multiple instances running and the difference between them could be the code, configuration, region. Each instance exposes a unique URL which allows you to reach it.

### Session

[Sessions](/neru/guides/sessions) allow you to create and persist context within your instance seamlessly. Sessions are used to create providers and to access state.

### Package

A certain version of the code and the accompanying files that can be deployed. A deployed package is an instance of your project. The name given to it, a randomized hash, represents the version.

### Deployment

The action of [deploying](/neru/guides/deploying) the code and configuration, a package, which results in a running instance of your project.

### Secrets

[NeRu Secrets](/neru/guides/secrets) allow you to store sensitive information for use in your projects.

### Assets

Files that you can use multiple times in your account, across multiple projects (voice prompts, knowledgebase, images, etc.)

### NeRu Configuration File

The `init` command of the NeRu CLI creates a `neru.yml` file. This `neru.yml` file contains information about your project and its instances.

```partial
source: _partials/neru/manifest.md
```

You can learn more about the options available to you in the [configuration file guide](/neru/guides/manifest).

## NeRu Requirements

To use NeRu you will need:

* A Vonage API [Account](https://dashboard.nexmo.com/sign-up).
* The [NeRu CLI](/neru/guides/cli) installed.

* For the Node.JS SDK:
    * Node 16 or above installed.
* For the Python SDK:
    * Python 3.10 or above installed.