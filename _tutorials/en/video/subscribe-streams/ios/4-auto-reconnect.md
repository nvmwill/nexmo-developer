---
title: Automatic reconnection
description: Learn how to subscribe to an Vonage Video API stream in your iOS application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Automatic reconnection

If a client drops a connection to a subscribed stream (for example, due to a drop in network connectivity in either client), it will attempt to automatically reconnect to the stream.

When the stream is dropped and the client tries to reconnect, the `[OTSubscriberKitDelegate subscriberDidDisconnectFromStream:]` message is sent to the OTSubscriberKit object's delegate.

When the connection is restored, the `[OTSubscriberKitDelegate subscriberDidReconnectToStream:]` message is sent. If the client cannot restore the connection, the `[OTSessionDelegate session:streamDestroyed:]` message is sent.

In response to these events, your application can (optionally) display user interface notifications indicating the temporary disconnection, reconnection, and disconnection states.

```objective-c
// OTSubscriber delegate callbacks:
- (void)subscriberDidDisconnectFromStream:(OTStream*)stream
{
  // Display a user interface notification.
}

- (void)subscriberDidReconnectToStream:(OTStream*)stream
{
  // Adjust user interface.
}

// OTSession delegate callback:
- (void)session:(OTSession*)session session:streamDestroyed:(OTStream*)stream
{
  // Adjust user interface.
}
```
