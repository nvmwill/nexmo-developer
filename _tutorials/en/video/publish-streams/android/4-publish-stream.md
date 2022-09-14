---
title: Publishing a stream
description: Learn how to publish Vonage Video API streams in your Android application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Publishing a stream

Once you create a Publisher object, you can pass it into the `publish(PublisherKit publisher)` method of a Session object to publish the stream to the session:

```java
mSession.publish(mPublisher);
```

This code assumes that `mSession` is a Session object, and that the client has connected to the session. For more information, see [Joining a Session](/video/guides/create-session).

The `PublisherKit.PublisherListener.onStreamCreated(PublisherKit publisher, Stream stream)` method is called when the publisher starts streaming to the session:

```java
@Override
public void onStreamCreated(publisher, stream) {
    // The publisher started streaming.
}
```
