---
title: Check publishing capabilities
description: "Learn how to publish Vonage Video API streams in your web application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream."
product: video
---

## Checking whether a client has publish capabilities
--------------------------------------------------

Once you have connected to a session, you can check if the client can publish. Check the value of the `capabilities.publish` property of the `Session` object. If it is set to 1, the client can publish:

```js
if (session.capabilities.publish == 1) {
    // The client can publish. See the next section.
} else {
    // The client cannot publish.
    // You may want to notify the user.
}
```

To publish, the client must connect to the session with a token that is assigned a role that supports publishing. There must be a connected camera and microphone. Also, the client environment must support publishing (see [Browser support](/video/client-sdks/web#browser-support)).

Also, publishing is only supported on HTTPS pages.
