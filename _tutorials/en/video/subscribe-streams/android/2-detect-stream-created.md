---
title: Detect when streams are created in a session
description: Learn how to subscribe to an Vonage Video API stream in your Android application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Detecting streams in a session

The `onStreamReceived(Session session, Stream stream)` method of the Session.SessionListener object is called when a stream published by another client is created in a session. (A stream is created when a client publishes a stream to the session or if the stream exists when you connect to the session.)

```java
@Override
public void onStreamReceived(Session session, Stream stream) {
    // There is a new stream.
    // You may want to subscribe to it.
}
```    

Add a listener object for this event by calling the `setSessionListener(Session.SessionListener listener)` method of the Session object:

```java
mSession.setSessionListener(this);
```

You can subscribe to a stream to display it in your app. See the next section.
