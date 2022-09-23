---
title: Automatic reconnection
description: Learn how to subscribe to a Vonage Video API stream in your iOS application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Automatic reconnection

If a client drops a connection to a subscribed stream (for example, due to a drop in network connectivity in either client), it will attempt to automatically reconnect to the stream. When the stream is dropped and the client tries to reconnect, the `OTSubscriberDelegate subscriberDidDisconnect(fromStream:)` message is sent to the OTSubscriber object's delegate.

When the connection is restored, the `OTSubscriberDelegate subscriberDidReconnect(toStream:)` message is sent. If the client cannot restore the connection, the `OTSessionDelegate session(_:streamDestroyed:)` message is sent.

In response to these events, your application can (optionally) display user interface notifications indicating the temporary disconnection, reconnection, and disconnection states.

```swift
// OTSubscriber delegate callbacks:
func subscriberDidDisconnect(fromStream subscriber: OTSubscriberKit) {
  // Display a user interface notification.
}

func subscriberDidReconnect(toStream subscriber: OTSubscriberKit) {
  // Adjust user interface.
}

// OTSession delegate callback:
func session(_ session: OTSession, streamDestroyed stream: OTStream) {
  // Adjust user interface.
}
```
