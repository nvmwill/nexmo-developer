---
title: Detecting when streams end and a subscriber's video is disabled
description: Learn how to subscribe to an Vonage Video API stream in your Windows application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Detecting when streams leave a session

When streams published by other clients leave a session, the the Session object sends a `StreamDropped` event:

```c#
session.StreamDropped += Session_StreamDropped;

public void Session_StreamDropped(object sender, EventArgs e)
{
  // Stream dropped
}
```

The event arguments object passed into this are defined by the OpenTok.Session.StreamEventArgs class. This class includes a `Stream` property. Compare this `Stream` object to the `Stream` property of each Subscriber object to identify the subscriber for the stream.

## Detecting when a subscriber's video is disabled

The Vonage Video Media Router stops sending video to the subscriber when it detects that connectivity degrades. The subscriber continues to receive the audio stream, if there is one. When the Vonage Video Media Router stops sending video, the Subscriber object sends a `VideoDisabled` event:

```c#
subscriber.VideoDisabled += Subscriber_VideoDisabled;

public void Subscriber_VideoDisabled(object sender)
{
  // Display a user interface notification.
}
```

When the Vonage Video Media Router disables the video of a subscriber, you may want to adjust the user interface related to the subscriber.

The Subscriber object sends a `VideoDisabled` event when video resumes:

```c#
subscriber.VideoEnabled += Subscriber_VideoEnabled;

public void Subscriber_VideoEnabled(object sender)
{
  // Video resumes for the subscriber.
}
```
