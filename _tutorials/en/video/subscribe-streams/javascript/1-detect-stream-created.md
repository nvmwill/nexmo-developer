---
title: Detect when streams are created in a session
description: Learn how to subscribe to a Vonage Video API stream in your web application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Detecting when streams are created in a session

The Session object dispatches a `streamCreated` event when a new stream (other than your own) is created in a session. A stream is created when a client [publishes](/video/tutorials/publish-streams) a stream to the session. The `streamCreated` event is also dispatched for each existing stream in the session when you first connect. This event is defined by the StreamEvent, which has a `stream` property, representing stream that was created:

```js
session.on("streamCreated", function (event) {
    console.log("New stream in the session: " + event.stream.streamId);
});
// Replace with a valid token:
session.connect(token);
```

You can subscribe to any stream. See the [next section](/video/tutorials/subscribe-streams/video/subscribe-streams/javascript/2-subscribe-to-a-stream/javascript).
