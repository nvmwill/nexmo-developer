---
title: Automatic reconnection
description: Learn how to subscribe to an Vonage Video API stream in your Windows application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Automatic reconnection

If a client drops a connection to a subscribed stream (for example, due to a drop in network connectivity in either client), it will attempt to automatically reconnect to the stream. When the stream is dropped and the client tries to reconnect, the Session object sends a `StreamDisconnected` event.

When the connection is restored, the Subscriber object sends a `StreamReconnected` event. If the client cannot restore the stream, the Session object sends a `StreamDropped` event.

In response to these events, your application can (optionally) display user interface notifications indicating the temporary disconnection, reconnection, and destroyed states:

```c#
session.StreamDropped += Session_StreamDropped;

subscriber.StreamDisconnected += Subscriber_StreamDisconnected;
subscriber.StreamReconnected += Subscriber_StreamReconnected;

public void Subscriber_StreamDisconnected(object sender)
{
  // Display a user interface notification.
}

public void Subscriber_StreamReconnected(object sender)
{
  // Display a user interface notification.
}

public void Session_StreamDropped(object sender, EventArgs e)
{
  // Display a user interface notification.
}
```
