---
title: Getting Started
description: This documentation describes getting started with Neru
meta_title: NeRu Getting Started
---

# Getting Started with NeRu

Ready to get started with NeRu? Here is a step by step guide to get you going:


## 1. Create a Vonage API Account

If you do not already have a Vonage API account you can create one via the [Dashboard](https://dashboard.nexmo.com/sign-up). This allows you to authenticate with NeRu. Once your account is created you will be given an API Key and Secret.

## 2. Setup Your Development Environment

Your development environment will depend on which runtime you are using, but this guide will be for Node.JS:

* For the Node.JS SDK:
    * Node 16 or above installed.
* For the Python SDK:
    * Python 3.10 or above installed.

## 3. Download the NeRu CLI

You will need the NeRu CLI for configuring, debugging, deploying NeRu projects. To continue [install the NeRu CLI](/neru/guides/cli). Make sure the NeRu CLI is installed by running:

```
neru
```

## 4. Configure the NeRu CLI

Make sure you are running the latest version of the NeRu CLI:

```
neru version
```

The current version of the NeRu CLI will be printed out to the terminal, if there is a new version available you will be prompted to update. Once that is done, configure the NeRu CLI:

```
neru configure
```

This will prompt you for your Vonage API Key and Secret. You can get these from the Vonage API [Dashboard](https://dashboard.nexmo.com). You will also be prompted for a default region.

## 5. Create a Vonage Application

You now need to create a Vonage [Application](/conversation/concepts/application). You will do so with the NeRu CLI. Create your project directory if you've not already done so, run the following command in your terminal:

```sh
mkdir neru-app
```

Change into the directory:

```sh
cd neru-app
```

Create a Vonage application:

```sh
neru app create --name "neru-app"
```

## 6. Create a NeRu Project

In your `neru-app` folder, run:

```sh
neru init
```

* Choose project name (You can leave it with the folder name as default by pressing enter)
* Choose the application you created earlier
* Choose runtime environment - `nodejs16`
* Choose a region
* Choose the instance name - `dev`
* Choose the template for this sample - `AkiraQuizVoice`

This will create a NeRu project and download the `AkiraQuizVoice` template. It will create the NeRu configuration file (neru.yml).

## 7. Adapt your NeRu Project

The `AkiraQuizVoice` template is a voice quiz you can play by calling a Vonage number linked to your Vonage application. Buy and link a number to your application:

* [Buy a number](https://dashboard.nexmo.com/buy-numbers) if you do not already have one.
* Find your application in the [Dashboard](https://dashboard.nexmo.com/voice/your-applications).
* Click on the application in the Your Applications list. Then click on the Numbers tab.
* Click the Link button to link a Vonage number with that application.

Now that you have a number linked to your Vonage application, update the configuration file: 

* Open the neru.yml file in a text editor
* Update the configuration object with the number you bought earlier, and linked to your application.
* Ensure you have both the `rtc` and `messages` capabilities.

Your file should look similar to this, with `$VONAGE_NUMBER` being your Vonage number:

```yml
project:
    name: neru-app
instance:
    name: dev
    runtime: nodejs16
    region: aws.euw1
    application-id: d9725658-1dcb-4e99-80b5-5ec1b75f47dc
    capabilities: [rtc, messaging]
    entrypoint: [node, index.js]
    configurations:
        contact:
            number: "$VONAGE_NUMBER"
            type: "phone"
debug:
    name: quiz
    entrypoint: [nodemon, --inspect, index.js]
```

## 8. Debug Your NeRu Project

Now you are ready to run your project locally. Start the NeRu debugger:

```
neru debug
```

You can now call your Vonage number to try out the project. The above configuration file is using `nodemon` to watch for changes to the `index.js` file and reload the application. 

## 9. Deploy Your NeRu Project

After testing your project locally, you can now deploy it to the NeRu infrastructure. By deploying you are creating an instance of your project - a running service that is built from the current version of the code in the folder you specify with the current configuration (neru.yml). To deploy, run:

```
neru deploy
```

Once the deployment is complete you should see two URLs in which your application is accessible, similar to the following:

* `https://api-$REGION.vonage.com/v1/neru/i/neru-$API_KEY-$PROJECT_NAME-$INSTANCE_NAME/`
* `https://neru-$API_KEY-$PROJECT_NAME-$INSTANCE_NAME/.$REGION.serverless.vonage.com`

The second URL is useful when you are deploying projects which are dependent on the URL's path such as static sites. 

## 10. View Your Project on the NeRu Dashboard

Once you deploy, your project and deployments can be viewed on the [NeRu dashboard](https://dashboard.nexmo.com/serverless).

![Screenshot of the neru dashboard home page](/images/neru/neru-dashboard-home.png)

You can click on your deployed instance which will give you access to logs, events, your instance's configuration, and deployment history.

![Screenshot of the neru dashboard instance page](/images/neru/neru-dashboard-instance.png)

