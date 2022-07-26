--- 
title: Automatic reconnection 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your web application.
product: video 
---

# Automatic reconnection

Clients will attempt to automatically reconnect to a session they disconnect unexpectedly (for example, due to a drop in network connectivity). You do not need to add any code to have the clients reconnect automatically, unless you want to respond to events dispatched when your client disconnects and reconnects. 

For sample code that demonstrates the use of these events, see the [opentok-reconnection](https://github.com/opentok/opentok-reconnection/) repo on GitHub.

When the connection is dropped and the client tries to reconnect, the Session object dispatches a `reconnecting` event. When the connection is restored, the Session object dispatches a `reconnected` event. If the client cannot restore the connection, the client disconnects from the session, and the Session object dispatches the `sessionDisconnected` event.

In response to these events, your application can (optionally) display user interface notifications indicating the temporary disconnection, reconnection, and disconnection states:

```js
session.on(
  sessionReconnecting: function() {
    // Display a user interface notification.
  },
  sessionReconnected: function() {
    // Adjust user interface.
  },
  sessionDisconnected: function() {
    // Adjust user interface.
  }
);
```

When your client temporarily disconnects from a session, the Subscriber objects in clients subscribing to a stream you publish dispatch events when your published stream drops and when (and if) it resumes automatically. 

<!-- OPT-TODO For more information, see [Automatic reconnection](/developer/guides/subscribe-stream/js/#automatic_reconnection) in the "Subscribing to streams" developer guide. -->

By default, any signals you send while your client is temporarily disconnected from a session are queued and sent when (and if) you successfully reconnect. You can set the `retryAfterReconnect` property to `false` in the options you pass into the `Session.signal()` method to prevent signals from being queued while you are disconnected. 

<!-- OPT-TODO For more information, see [Preventing signals from being sent during automatic reconnection](/developer/guides/signaling/js/#automatic_reconnection). -->
