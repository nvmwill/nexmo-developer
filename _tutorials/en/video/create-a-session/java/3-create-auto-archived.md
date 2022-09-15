---
title: Create an automatically archived session
description: Use the Vonage Video API Java SDK to learn how to create a session. Sessions allow participants to use audio, video, and messaging functionality in your application.
product: video
---

## Creating an automatically archived session

You can create a session that is automatically archived. Here is Java sample code that creates an automatically archived session:

``` js
Session session = opentok.createSession(new SessionProperties.Builder()
  .mediaMode(MediaMode.ROUTED)
  .archiveMode(ArchiveMode.ALWAYS)
  .build());
String sessionId = session.getSessionId();
```

Note that archived sessions must use the routed media mode.

For more information, see the [archiving](/video/guides/archiving/overview) developer guide.
