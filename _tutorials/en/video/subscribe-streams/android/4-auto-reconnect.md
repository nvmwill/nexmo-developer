---
title: Automatic reconnection
description: Learn how to subscribe to an Vonage Video API stream in your Android application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Automatic reconnection

If a client drops a connection to a subscribed stream (for example, due to a drop in network connectivity in either client), it will attempt to automatically reconnect to the stream. When the stream is dropped and the client tries to reconnect, the `SubscriberKit.StreamListener.onDisconnected(SubscriberKit subscriber)` method is called. When the connection is restored, the `SubscriberKit.StreamListener.onReconnected(SubscriberKit subscriber)` method is called. If the client cannot restore the stream, the `Session.SessionListener.onStreamDropped(Session session, Stream stream)` method is called.

In response to these events, your application can (optionally) display user interface notifications indicating the temporary disconnection, reconnection, and destroyed states:

```java
// In the implementation of the SubscriberKit.StreamListener interface:
@Override
public void onDisconnected(SubscriberKit subscriber) {
  // Display a user interface notification.
}

@Override
public void onReconnected(SubscriberKit subscriber) {
  // Adjust user interface.
}

// In the implementation of the Session.SessionListener interface:
@Override
public void onStreamDropped(Session session, Stream stream) {
  // Adjust user interface.
}
```
