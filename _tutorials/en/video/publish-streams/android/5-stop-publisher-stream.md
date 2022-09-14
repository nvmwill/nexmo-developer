---
title: Stopping a publisher's stream
description: Learn how to publish Vonage Video API streams in your Android application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Stopping a publisher from streaming

You can stop publisher from streaming to the session by calling the `unpublish(PublisherKit publisher)` method of the Session object:

```java
mSession.unpublish(mPublisher);
```

The `PublisherKit.PublisherListener.onStreamDestroyed(PublisherKit publisher, Stream stream)` method is called when the publisher stops streaming to the session:

```java
@Override
public void onStreamDestroyed(publisher, stream) {
    // The publisher stopped streaming.
}
```
