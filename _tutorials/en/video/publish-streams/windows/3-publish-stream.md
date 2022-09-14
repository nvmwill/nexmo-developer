---
title: Publishing a stream
description: Learn how to publish Vonage Video API streams in your Windows application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Publishing a stream

Once you create a Publisher object, you can pass it into the `Publish(publisher)` method of a Session object to publish the stream to the session:

```c#
session.Publish(publisher);
```

This code assumes that `session` is a Session object, that `publisher` is a Publisher object and that the client has connected to the session. For more information, see [Joining a Session](/video/tutorials/joining-a-session).

The `Publisher` sends the `StreamCreated` event when the publisher starts streaming to the session:

```c#
publisher.StreamCreated += Publisher_StreamCreated;
session.Publish(publisher);
private void Publisher_StreamCreated(object sender, Publisher.StreamEventArgs e)
{
    Console.WriteLine("The publisher started streaming.");
}
```
