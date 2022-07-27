--- 
title: Initialize session object 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your web application.
product: video 
---

# Initializing a Session object

Before you can connect to a session, instantiate a Session object by calling the `OT.initSession()` method with your API key and the appropriate session ID:

```js
// Replace with your API key and session ID:
var session = OT.initSession(appID, sessionID);
```

The `OT.initSession()` method returns a Session object, through which subsequent API calls take place.

Note that calling the `OT.initSession()` method does not _create_ an session; it creates a JavaScript Session object, which represents an existing session. You can create a session using the server-side SDK. See [Creating a session](/video/guides/create-session).

If the user's browser does not support WebRTC, the call to `OT.initSession()` results in the page displaying a message to the user. To check for WebRTC support and prevent this message from being displayed, you can call the `OT.checkSystemRequirements()` method before calling `OT.initSession()`:

```js
if (OT.checkSystemRequirements() == 1) {
  var session = OT.initSession(appID, sessionId);
} else {
  // The client does not support WebRTC.
  // You can display your own message.
}
```
