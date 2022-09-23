--- 
title: Automatic reconnection 
description: Learn how to connect to a Vonage Video API session so that participants can use audio, video, and messaging functionality in your Android application.
product: video 
---

## Automatic reconnection

Clients will attempt to automatically reconnect to a session when they disconnect unexpectedly (for example, due to a drop in network connectivity). You do not need to add any code to have the clients reconnect automatically, unless you want to respond to events that occur when your client disconnects and reconnects.

<!-- OPT-TODO: For sample code that demonstrates the use of these events, see the [Vonage Video-reconnection](https://github.com/opentok/opentok-reconnection/) repo on GitHub.-->

When the connection is dropped and the client tries to reconnect, the `Session.ReconnectionListener.onReconnecting(Session session)` method is called. When the connection is restored, the `Session.ReconnectionListener.onReconnected(Session session)` method is called.

If the client cannot restore the connection, the client disconnects from the Vonage Video session, and the `Session.SessionListener.onDisconnected(Session session)` method is called.

In response to these events, your application can (optionally) display user interface notifications indicating the temporary disconnection, reconnection, and disconnection states:

```java
// In the implementation of the Session.ReconnectionListener interface
@Override
public void onReconnecting(session) {
  // Display a user interface notification.
}

public void onReconnected(session) {
  // Adjust user interface.
}

// In the implementation of the Session.SessionListener interface
@Override
public void onDisconnected(session) {
  // Adjust user interface.
}
```

When your client temporarily disconnects from a session, methods in the implementations of the SubscriberKit.StreamListener interface in clients subscribing to a stream you publish are called when your published stream drops and when (and if) it resumes automatically.

For more information, see the **Detecting when streams leave a session and reconnection** step in the [Subscribe to streams](/video/tutorials/subscribe-streams/introduction/android) tutorial.

By default, any signals you send while your client is temporarily disconnected from a session are queued and sent when (and if) you successfully reconnect. You can use the `Session.sendSignal(String type, String data, Connection connection, boolean retryAfterReconnect)` method and set the `retryAfterReconnect` parameter to `false` to prevent signals from being queued while you are disconnected.

For more information, see [Preventing signals from being sent during automatic reconnection](/video/tutorials/video-signaling/introduction).
