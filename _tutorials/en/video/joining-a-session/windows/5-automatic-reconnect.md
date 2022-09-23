--- 
title: Automatic reconnection 
description: Learn how to connect to a Vonage Video API session so that participants can use audio, video, and messaging functionality in your ios application.
product: video 
---
## Automatic reconnection

Clients will attempt to automatically reconnect to a session they disconnect unexpectedly (for example, due to a drop in network connectivity). You do not need to add any code to have the clients reconnect automatically, unless you want to respond to events that occur when your client disconnects and reconnects.

When the connection is dropped and the client tries to reconnect, the `Session.ReconnectionStart` event is sent. When the connection is restored, the `Session.ReconnectionSuccess` event is sent. If the client cannot restore the connection, the client disconnects from the Vonage Video session, and the `Session.Disconnected` event is sent.

In response to these events, your application can (optionally) display user interface notifications indicating the temporary disconnection, reconnection, and disconnection states:

```c#
session.ReconnectionStart = Session_ReconnectionStart;
session.ReconnectionSuccess = Session_ReconnectionSuccess;
session.Disconnected = Session_Disconnected;

private void Session_ReconnectionStart(object sender, EventArgs e)
{
    // Display a user interface notification.
}

private void Session_ReconnectionSuccess(object sender, EventArgs e)
{
    // Adjust user interface.
}


private void Session_Disconnected(object sender, EventArgs e)
{
    // Adjust user interface.
}
```

When your client temporarily disconnects from a session, Subscriber objects in clients subscribing to the stream send `Subscriber.StreamDisconnected` and `Subscriber.StreamDisconnected` events when your published stream drops and when (and if) it resumes automatically. For more information, see the **Detecting when streams leave a session and reconnection** step in the [Subscribe to streams](/video/tutorials/subscribe-streams/introduction/linux) tutorial.

By default, any signals you send while your client is temporarily disconnected from a session are queued and sent when (and if) you successfully reconnect. You can use the `Session.SendSignal(type, signal, connection, retryAfterReconnect)` method and set the `retryAfterReconnect` parameter to `false` to prevent signals from being queued while you are disconnected. For more information, see [Preventing signals from being sent during automatic reconnection](/video/tutorials/video-signaling/introduction).
