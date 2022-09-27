---
title: Setting Up Authentication
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Setting Up Authentication

Pull up your blank **app.js** file in your code editor — most of the remaining steps will involve adding code to this file.

In order to connect to a Vonage Video session, the client will need access to some authentication credentials — an **APP ID**, **Session ID**, and **Token**.

In a production application, these credentials should be generated using a [server SDK](/video/server-sdks/overview), but to speed things up we will hard code the values for now.

1. Start by copying the following code block and adding it to your app.js file:

```js
// replace these values with those generated in your Video API account
var appID = "YOUR_APP_ID";
var sessionId = "YOUR_SESSION_ID";
var token = "YOUR_TOKEN";

// (optional) add server code here
initializeSession();
```

2.  You'll need to adjust the code above by hard coding the values for the `appID`, `sessionId` and `token`. To do this, log into your [Video API account](https://www.tokbox.com/account/user/signup), either create a new Vonage Video API project or use an existing Vonage Video API project, then go to your project page and scroll down to the **Project Tools** section — from there, you can generate a Session ID and Token manually. Use the project's API Key along with the Session ID and Token you generated to replace `YOUR_APP_ID`, `YOUR_SESSION_ID` and `YOUR_TOKEN` in the code above (be sure to leave the quotation marks.)

> **Important:** You can continue to get the session ID and token values from your Account during testing and development, but before you go into production you must set up a server.

For more information on sessions, [tokens](/video/guides/create-token), and servers, check out [Video API Basics](/video/overview).
