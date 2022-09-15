---
title: Create a relayed session
description: Use the Vonage Video API Java SDK to learn how to create a session. Sessions allow participants to use audio, video, and messaging functionality in your application.
product: video
---

## Creating a relayed session

Here is Java sample code that creates a new session with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to relayed:

``` java
// Set the following constants to your Vonage Video APP ID and API secret.

OpenTok sdk = new OpenTok(APP_ID, API_SECRET);
Session session = sdk.createSession();
String sessionId = session.getSessionId();
```

In a relayed session, clients will attempt to send streams directly between each other. However, if clients cannot connect due to firewall restrictions, the session uses the Vonage Video TURN server to relay audio-video streams.

**Important:** Some features, such as archiving, are only available in routed (not relayed) sessions. See the previous section for instructions on creating a routed session.
