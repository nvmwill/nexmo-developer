---
title: NeRu Training
description: To follow along with in the NeRu Training session
meta_title: NeRu CLI
---

# NeRu Training

Thanks for coming to the NeRu training session. 

Session outline:

* Overview of NeRu (+ Questions)
* Demo (+ Questions)
* Set up an example project
* Debugging
* Add a feature to the example project
* Open questions/feedback

## NeRu Overview

* NeRu
* Providers
    * State
* Deploying
    * Config file
    * Sessions
    * Instance
* Debugging

## Demo

NeRu demo from Max.

## Example project

If you haven't installed the NeRu CLI yet please do so:

https://vonage-neru.herokuapp.com/neru/cli

Run `neru configure` if you have not yet.

Run `neru version` and update the CLI if prompted.

Create a folder:

`mkdir neru-test-app`

Change directory into the folder:

`cd neru-test-app`

Create a new Vonage application:

`neru app create --name "Test app"`

Buy and/or link a number to the new application via the API dashboard or using the Vonage CLI:

`vonage apps:link APPLICATION_ID --number=YOUR_VONAGE_NUMBER`

Create a neru project:

`neru init`

Choose the `VonagePark` template. When it completes, install the dependencies:

`npm install`

Open the folder in VSCode and edit the `neru.yml` file to include the contact configuration:

```yml
    ...
    configurations:
        contact:
            number: "$YOUR_VONAGE_NUMBER"
            type: "phone"
```

Debug the project locally:

`neru debug`

Now you are ready to call your Vonage number.

## Debug

Attach the VSCode debugger to your debug session:

https://vonage-neru.herokuapp.com/neru/debugging

Set breakpoints in your code and call your Vonage number again.

## Deploy

Now you are ready to deploy:

`neru deploy`

This will deploy your project to the NeRu platform. Once it is complete, visit the NeRu dashboard and view your project:

https://dashboard.serverless.vonage.com/

## Add a Feature

## Feedback

Thanks for attending the training, we would love your feedback on the training and NeRu. Please post in the training slack channel. Any feedback is welcome, but here are some talking points to consider:

* What applications do you think will be easier to build now with NeRu?

* How did you find using NeRu compared to writing a similar application (Voice API/Messages API) normally?

* Can you think of any projects for clients you worked on recently that could have benefitted from using NeRu?

* What features would you like to see added to NeRu?

* Any NeRu concepts you didn't understand?

* Did you find the NeRu debugging useful?

* Are you able to volunteer some time to develop a sample use case with NeRu, to build on what you’ve learnt?



