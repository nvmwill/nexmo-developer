---
title: Introducing the Vonage Client SDK V-App Demo Projects
description: To showcase the multi-platform functionality of the SDKs and the
  Conversation API we have built the V-App!
thumbnail: /content/blog/introducing-the-vonage-client-sdk-v-app-demo-projects/v-app-demo.png
author: abdul-ajetunmobi
published: true
published_at: 2022-08-25T15:08:48.246Z
updated_at: 2022-08-25T08:59:22.943Z
category: announcement
tags:
  - conversation-api
  - client-sdk
  - opensource
comments: true
spotlight: false
redirect: ""
canonical: ""
outdated: false
replacement_url: ""
---
The [Vonage Client SDKs](https://developer.nexmo.com/client-sdk/overview) for Android, iOS, and Web in conjunction with the [Conversation API](https://developer.vonage.com/conversation/overview) helps you build voice and messaging capabilities into your applications. To showcase the multi-platform functionality of the SDKs and the Conversation API we have built the V-App! The V-App is an end-to-end application on all 3 platforms, but we didn't stop there! To support the applications, we also built a backend using Node.JS. This blog will have a brief overview of how the different components are built, if you want to jump ahead you can check out [the code on GitHub](https://github.com/nexmo-community/clientsdk-the-v-app).

## The V-App Backend

As mentioned earlier the backend client is built using Node.JS, and once running it handles RTC webhook events from Vonage which are generated when users are added to conversations, messages are sent, and more. The backend client uses a Postgres database to store events from the webhook to avoid having to query the Conversation API too frequently. The V-App also supports calling, so the backend client also has a voice answer route that returns an NCCO:

```javascript
webhookRoutes.get('/voice/answer', async (req, res) => {
  var ncco = [{"action": "talk", "text": "No destination user - hanging up"}];
  var username = req.query.to;
  if (username) {
    ncco = [
      {
        "action": "talk",
        "text": "Connecting you to " + username
      },
      {
        "action": "connect",
        "endpoint": [
          {
            "type": "app",
            "user": username
          }
        ]
      }
    ]
  }
  res.json(ncco);
});
```

Thanks to having a database attached, the backend client also supports user accounts! Once a user has signed up, and on subsequent logins, the backend will return a JWT in the response that can be used to authenticate with the Client SDKs:

```
{
  "user": {
    "id": "USR-44326d04-cd82-41f5-ad24-315c2a2eac41",
    "name": "Alice",
    "display_name": "alice"
  },
  "token": "ey...dg",
  "users": [{ ... },
  "conversations": [{ ... }]
}
```

The [GitHub repository](https://github.com/nexmo-community/clientsdk-the-v-app) includes a `.env-sample` file to ensure you have the correct secrets, as well as support for deploying with docker. But, read on to learn about how you can deploy the backend seamlessly.

## The V-App Clients

The V-App application is available as native applications on Android, iOS, and Web each using the platform's respective Vonage Client SDK. The Android app is built using Kotlin, the iOS app is built in Swift and UIKit, and the Web app is built using Javascript and the [Vonage Client SDK Web Components](https://github.com/nexmo-community/clientsdk-ui-js). 

As mentioned earlier the applications support user accounts:

![Login screen for the web client](/content/blog/introducing-the-vonage-client-sdk-v-app-demo-projects/login.png)

Once logged in, you can start a conversation between two or more registered users:

![Web and iOS client messaging](/content/blog/introducing-the-vonage-client-sdk-v-app-demo-projects/clients-chat.png)

Chats also support sending images:

![Android client sending an image](/content/blog/introducing-the-vonage-client-sdk-v-app-demo-projects/chat-img.jpeg)

If text chats aren't enough, V-App supports calling too:

![Web and iOS client calling](/content/blog/introducing-the-vonage-client-sdk-v-app-demo-projects/clients-call.png)

The set-up instructions for the clients are available on [GitHub](https://github.com/nexmo-community/clientsdk-the-v-app). To make it easier to try the V-App out, we built one more thing!

## The Vonage CLI Scaffold Plugin

To seamlessly download, setup and run all 3 clients and the backend, you can install the [`scaffold` plugin](https://github.com/vonage/cli-plugin-scaffold) for the Vonage CLI:

```
vonage plugins:install @vonage/cli-plugin-scaffold
```

Once installed you can bootstrap the V-App using the following command, specifying which clients you want to download:

```
vonage scaffold:vapp --platforms=web,ios,android --backend=docker
```

You can run the help command to see the different options available to you:

```
vonage scaffold:vapp --help
```

Since the Vonage CLI is already authenticated with Vonage, the plugin can create a new Vonage application and configure the webhooks ready to be used by the V-App. The clients are also downloaded and their dependencies installed:

![CLI plugin downloading the clients](/content/blog/introducing-the-vonage-client-sdk-v-app-demo-projects/plugin-clients.png)

The plugin also deploys the backend client locally using docker, and configures the clients with the deployment's URL:

![CLI plugin deploying with docker](/content/blog/introducing-the-vonage-client-sdk-v-app-demo-projects/plugin-docker.png)

Give the V-App a go, then come join the conversation on our Vonage [Community Slack](https://developer.vonage.com/community/slack) or send us a message on [Twitter](https://twitter.com/VonageDev).
