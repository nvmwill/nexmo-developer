---
title: Create an automatically archived session
description: Use the Vonage Video API Node.js SDK to learn how to create a session. Sessions allow participants to use audio, video, and messaging functionality in your application.
product: video
---

## Creating an automatically archived session

You can create a session that is automatically archived. Here is Node sample code that creates an automatically archived session:

```js
opentok.createSession({mediaMode:'routed', archiveMode:'always'}, function(err, session) {
  if (error) {
    console.log("Error creating session:", error)
  } else {
    sessionId = session.sessionId;
    console.log("Session ID: " + sessionId);
  }
});
```

Note that archived sessions must use the routed media mode.

For more information, see the [archiving](/video/guides/archiving) developer guide.
