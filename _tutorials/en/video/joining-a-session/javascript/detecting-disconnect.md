--- 
title: Detecting when you have disconnected 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your web application.
product: video 
---

# Detecting when you have disconnected

When your client disconnects from a session, the Session object dispatches a `sessionDisconnected` event:

```js
session.on("sessionDisconnected", function (event) {
  // The event is defined by the SessionDisconnectEvent class
  if (event.reason == "networkDisconnected") {
    alert("Your network connection terminated.")
  }
});
session.connect(token);
```

The `reason` property of the event is a string that describes why the session disconnected. For example, the previous example notifies the user if they were disconnected due to the network connection terminating.

<!-- OPT-TODO: For details, see [SessionDisconnectEvent](/developer/sdks/js/reference/SessionDisconnectEvent.html). -->
