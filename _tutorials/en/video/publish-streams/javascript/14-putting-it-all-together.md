---
title: Putting it all together
description: "Learn how to publish Vonage Video API streams in your web application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream."
product: video
---

## Putting it all together

The following code creates a publisher, connects to a session (see [Joining a session](/video/tutorials/joining-a-session)), publishes a stream to the session when the client connects to the session, and detects when the publisher starts and stops streaming:

```js
var session;
var publisher;

// Replace with the replacement element ID:
publisher = OT.initPublisher(replacementElementId);
publisher.on({
  streamCreated: function (event) {
    console.log("Publisher started streaming.");
  },
  streamDestroyed: function (event) {
    console.log("Publisher stopped streaming. Reason: "
      + event.reason);
  }
});

// Replace apiKey and sessionID with your own values:
session = OT.initSession(apiKey, sessionID);
// Replace token with your own value:
session.connect(token, function (error) {
  if (session.capabilities.publish == 1) {
    session.publish(publisher);
  } else {
    console.log("You cannot publish an audio-video stream.");
  }
});
```
