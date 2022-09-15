---
title: Create a Session that uses Vonage Video Media Router
description: Use the Vonage Video API Java SDK to learn how to create a session. Sessions allow participants to use audio, video, and messaging functionality in your application.
product: video
---

## Creating a session that uses the Vonage Video Media Router

The following code session that uses the Vonage Video Media Router:

```java
// Set the following constants to your Vonage Video API key and API secret.
OpenTok sdk = new OpenTok(APP_ID, API_SECRET);
SessionProperties sessionProperties = new SessionProperties.Builder()
  .mediaMode(MediaMode.ROUTED)
  .build();
Session session = sdk.createSession(sessionProperties);
String sessionId = session.getSessionId();
```

Use the session ID in an Vonage Video client library to connect to an Vonage Video session.

You will also need to generate a token for each user connecting to the Vonage Video session. See [Connection Token Creation](/video/tutorials/create-token) for information on the `generateToken()` method.

The [Vonage Video Media Router](/video/guides/create-session#the-media-router-and-media-modes) provides the following benefits:

* The Vonage Video Media Router can decrease bandwidth usage in multiparty sessions. (When the mediaMode property is set to MediaMode.RELAYED, each client must send a separate audio-video stream to each client subscribing to it.)
* The Vonage Video Media Router can improve the quality of the user experience through [audio fallback and video recovery](https://www.vonage.com/communications-apis/video/features). With these features, if a client's connectivity degrades to a degree that it does not support video for a stream it's subscribing to, the video is dropped on that client (without affecting other clients), and the client receives audio only. If the client's connectivity improves, the video returns.
* The Vonage Video Media Router supports the [archiving feature](https://www.vonage.com/communications-apis/video/features), which lets you record, save, and retrieve Vonage Video sessions.
