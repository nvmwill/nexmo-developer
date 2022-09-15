---
title: Detect when streams are created in a session
description: Learn how to subscribe to an Vonage Video API stream in your Windows application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Detecting streams in a session

The Session object sends an `StreamReceived` event when a stream published by another client is created in a session. (A stream is created when a client [publishes](/video/tutorials/publish-streams/introduction/windows) a stream to the session or if the stream exists when you connect to the session.)

```c#
@Override
session.StreamReceived += Session_StreamReceived;

private void Session_StreamReceived(object sender, Session.StreamEventArgs e)
{
    Console.WriteLine("Session stream received");
}
```

You can subscribe to a stream to display it in your app. See the next section.
