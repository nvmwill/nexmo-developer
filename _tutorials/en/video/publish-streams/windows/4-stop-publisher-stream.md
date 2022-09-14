---
title: Stopping a publisher's stream
description: Learn how to publish Vonage Video API streams in your Windows application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Stopping a publisher from streaming

You can stop publisher from streaming to the session by calling the `Unpublish(publisher)` method of the Session object:

```c#
session.unpublish(mPublisher);
```

The `Publisher` sends the `StreamCreated` event when the publisher starts streaming to the session:

```c#
publisher.StreamCreated += Publisher_StreamDestroyed;
session.Publish(publisher);
private void Publisher_StreamDestroyed(object sender, Publisher.StreamEventArgs e)
{
    Console.WriteLine("The publisher stopped streaming.");
}
```
