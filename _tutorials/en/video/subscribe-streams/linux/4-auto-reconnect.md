---
title: Automatic reconnection
description: Learn how to subscribe to an Vonage Video API stream in your Linux application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Automatic reconnection

If a client drops a connection to a subscribed stream (for example, due to a drop in network connectivity in either client), it will attempt to automatically reconnect to the stream.

When the stream is dropped and the client tries to reconnect, the `on_disconnected` callback function of the `otc_subscriber_callbacks` struct for the subscriber is called. When the connection is restored, the `on_reconnected` callback function of the `otc_subscriber_callbacks` struct for the subscriber is called.

If the client cannot restore the stream, the `on_stream_dropped` callback function of the `otc_session_callbacks` struct is called.

In response to these events, your application can (optionally) display user interface notifications indicating the temporary disconnection, reconnection, and destroyed states:
