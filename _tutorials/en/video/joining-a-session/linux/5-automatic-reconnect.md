--- 
title: Automatic reconnection 
description: Learn how to connect to a Vonage Video API session so that participants can use audio, video, and messaging functionality in your Linux application.
product: video 
---

## Automatic reconnection

Clients will attempt to automatically reconnect to a session they disconnect unexpectedly (for example, due to a drop in network connectivity). You do not need to add any code to have the clients reconnect automatically, unless you want to respond to events that occur when your client disconnects and reconnects.

When the connection is dropped and the client tries to reconnect, the `on_reconnection_started` callback function of the `otc_session_callbacks` struct is called. When the connection is restored, the `on_reconnected` callback function of the `otc_session_callbacks` struct is called.

If the client cannot restore the connection, the client disconnects from the OpenTok session, and the `on_disconnected` callback function of the `otc_session_callbacks` struct is called.

In response to these events, your application can (optionally) display user interface notifications indicating the temporary disconnection, reconnection, and disconnection states.

When another client temporarily disconnects from a session, the `on_disconnected` callback function of the `otc_subscriber_callbacks` struct for a subscriber to a stream published by that client is called. The `on_reconnected` callback function of the `otc_subscriber_callbacks` struct for the subscriber is invoked when (and if) the client reconnects and the stream resumes automatically.

For more information, see the **Detecting when streams leave a session and reconnection** step in the [Subscribe to streams](/video/tutorials/subscribe-streams/introduction/linux) tutorial.

By default, any signals you send while your client is temporarily disconnected from a session are queued and sent when (and if) you successfully reconnect.

To prevent signals from being queued while you are disconnected. you can use the `otc_session_send_signal_with_options()` function or the `otc_session_send_signal_to_connection_with_options ()` function and set the `retryAfterReconnect` member to `false` in the `otc_signal_options` you pass into the function.

For more information, see [Preventing signals from being sent during automatic reconnection](/video/tutorials/video-signaling/introduction).
