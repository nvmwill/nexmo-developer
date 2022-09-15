---
title: Create an automatically archived session
description: Use the Vonage Video API dotnet SDK to learn how to create a session. Sessions allow participants to use audio, video, and messaging functionality in your application.
product: video
---

## Creating an automatically archived session

You can create a session that is automatically archived. Here is .NET sample code that creates an automatically archived session:

```c#
var session = OpenTok.CreateSession(mediaMode: MediaMode.ROUTED, ArchiveMode.ALWAYS);
string sessionId = session.Id;
```

Note that archived sessions must use the routed media mode.

For more information, see the [archiving](/video/guides/archiving/overview) developer guide.
