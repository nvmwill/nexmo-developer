---
title: Create a Session that uses Vonage Video Media Router
description: Use the Vonage Video API Node.js SDK to learn how to create a session. Sessions allow participants to use audio, video, and messaging functionality in your application.
product: video
---

## Creating a session that uses the Media Router

The following Node.js code creates a session that uses the Media Router:

```js
const { Video } = require('@vonage/video');
const videoClient = new Video({
    applicationId: APP_ID,
    privateKey: PRIVATE_KEY_PATH,
    baseUrl: string
});

// The session will use the Vonage Media Router:
try {
    const session = await videoClient.createSession({ mediaMode: "routed" });
    console.log(session.sessionId);
} catch(error) {
    console.error("Error creating session: ", error);
}
```

Use the session ID in a Vonage Video client library to connect to a Vonage Video session.

<!-- OPT-TODO: You will also need to generate a token for each user connecting to the Vonage Video session. See [Connection Token Creation](/developer/guides/create-token/node/) for information on the `generateToken()` method. -->

The [Media Router](https://www.vonage.com/communications-apis/video/features) provides the following benefits:

* The Vonage Video Media Router can decrease bandwidth usage in multiparty sessions. (When the mediaMode property is set to `MediaMode.RELAYED`, each client must send a separate audio-video stream to each client subscribing to it.)
* The Vonage Video Media Router can improve the quality of the user experience through [audio fallback and video recovery](https://www.vonage.com/communications-apis/video/features). With these features, if a client's connectivity degrades to a degree that it does not support video for a stream it's subscribing to, the video is dropped on that client (without affecting other clients), and the client receives audio only. If the client's connectivity improves, the video returns.
* The Vonage Video Media Router supports the [archiving feature](/video/guides/archiving/overview), which lets you record, save, and retrieve Vonage Video sessions.
