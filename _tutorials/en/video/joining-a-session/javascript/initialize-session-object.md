--- 
title: Initialize session object 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your web application.
product: video 
---

# Initializing a Session object

Before you can connect to a session, instantiate a Session object by calling the `OT.initSession()` method with your OpenTok API key and the appropriate session ID:

```js
    // Replace with your OpenTok API key and session ID:
    var session = OT.initSession(apiKey, sessionID);
```

The `OT.initSession()` method returns a Session object, through which subsequent API calls take place.

Note that calling the `OT.initSession()` method does not _create_ an OpenTok session; it creates a JavaScript Session object, which represents an existing OpenTok session. You create an OpenTok session using the OpenTok server-side libraries. See [Creating an OpenTok session](/video/guides/create-session).

If the user's browser does not support WebRTC, the call to `OT.initSession()` results in the page displaying a message to the user. To check for WebRTC support and prevent this message from being displayed, you can call the `OT.checkSystemRequirements()` method before calling `OT.initSession()`:

```js
if (OT.checkSystemRequirements() == 1) {
  var session = OT.initSession(apiKey, sessionId);
} else {
  // The client does not support WebRTC.
  // You can display your own message.
}
```
