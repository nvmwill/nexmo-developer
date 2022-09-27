---
title: Signaling
description: "Learn how to use Vonage Video API signaling to build messaging into your Android application. With signaling, users can send messages, control robots, and more!"
product: video
navigation-weight:
---

# Signaling

Use the Vonage Video signaling API to send text and data between clients connected to a session.

For conceptual information on the API, see the [Signaling overview](/video/guides/signaling) developer guide.

This topic includes the following sections:

* [Sending a Signal to a Specific Client in a Session](#sending-a-signal-to-a-specific-client-in-a-session)
* [Sending a Signal to All Clients in a Session](#sending-a-signal-to-all-clients-in-a-session)
* [Receiving Signals in a Session](#receiving-signals-in-a-session)
* [Preventing Signals From Being Sent During Automatic Reconnection](#preventing-signals-from-being-sent-during-automatic-reconnection)

## Sending a Signal to a Specific Client in a Session

To send a signal to a specific client in a session, call the `sendSignal(String type, String data, Connection connection)` method of the Session object:

```java
mSession.sendSignal("chat", "Hello", mConnection1);
```

The `type` parameter is a string value that clients can filter on when [listening for signals](#receiving-signals-in-a-session). Set this to an empty string if you do not need to set a type.

The `data` parameter is the data payload (a String) you send with the message. The limit to the size of data is 8KB.

The `connection` parameter is a [Connection](/sdk/stitch/video-android-reference/com/opentok/android/Connection.html) object corresponding to a client connected to the session that you want to signal. You obtain references to Connection objects in the `onConnectionCreated(Session session, Connection connection)` method of the `Session.ConnectionListener` object implemented for the Session.

Note that you can use a [REST API call](/api/video?#signaling) to send a signal from your server, instead of from a client connected to the session. In this case, the `connection` parameter is set to `null`.

## Sending a Signal to All Clients in a Session

To send a signal to all clients in a session, call the `sendSignal(String type, String data)` method of the Session object:

```java
mSession.sendSignal("chat", "Hello");
```

The `type` parameter is a string value that clients can filter on when [listening for signals](#receiving-signals-in-a-session). Set this to an empty string if you do not need to set a type.

The `data` parameter is the data payload (a String) you send with the message. The limit to the size of data is 8KB.

## Receiving Signals in a Session

To start receiving all signals, call the `setSignalListener(Session.SignalListener listener)` method of the Session object, passing in an object that implements the Session.SignalListener interface:

```java
mSession.setSignalListener(this);
```

The `onSignalReceived(Session session, String type, String data, Connection connection)` method of the SignalListener object is called when a signal is received in the session:

```java
@Override
protected void onSignalReceived(Session session, String type, String data, Connection connection) {
    String myConnectionId = session.getConnection().getConnectionId();
    if (connection != null && connection.getConnectionId().equals(myConnectionId)) {
        // Signal received from another client
    }
}
```

Note that you can use a [REST API call](/api/video?#signaling) to send a signal from your server, instead of from a client connected to the session. In this case, the `connection` parameter is set to `null`.

## Preventing Signals From Being Sent During Automatic Reconnection

Clients will attempt to automatically reconnect to a session they disconnect unexpectedly (for example, due to a drop in network connectivity). By default, any signals you send while the client is temporarily disconnected from a session are queued and sent when (and if) it successfully reconnects.

You can use the `Session.sendSignal(String type, String data, Connection connection, boolean retryAfterReconnect)` method and set the `retryAfterReconnect` parameter to `false` to prevent signals from being queued while the client is disconnected. For more information, see [Automatic reconnection](/video/tutorials/joining-a-session/video/joining-a-session/android/5-automatic-reconnect/android#automatic-reconnection).
