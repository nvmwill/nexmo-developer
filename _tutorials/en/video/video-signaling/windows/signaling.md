---
title: Signaling
description: "Learn how to use Vonage Video API signaling to build messaging into your Windows application. With signaling, users can send messages, control robots, and more!"
product: video
navigation-weight:
---

# Signaling

Use the Vonage Video signaling API to send text and data between clients connected to a session.

For conceptual information on the API, see the [Signaling overview](/developer/guides/signaling/) developer guide.

This topic includes the following sections:

* [Sending a Signal to a Specific Client in a Session](#sending-a-signal-to-a-specific-client-in-a-session)
* [Sending a Signal to All Clients in a Session](#sending-a-signal-to-all-clients-in-a-session)
* [Receiving Signals in a Session](#receiving-signals-in-a-session))
* [Preventing Signals From Being Sent During Automatic Reconnection](#preventing-signals-from-being-sent-during-automatic-reconnection)

## Sending a Signal to a Specific Client in a Session

To send a signal to a specific client in a session, call the `Session.SendSignal(type, data, connection, retryAfterReconnect)` method of the Session object:

```c#
Session.SendSignal("chat", "Hello", connection1);
```

The `type` parameter is a string value that clients can filter on when [listening for signals](#receiving-signals-in-a-session). Set this to an empty string if you do not need to set a type.

The `data` parameter is the data payload (a string) you send with the message. The limit to the size of data is 8KB.

The `connection` parameter is a Connection object corresponding to a client connected to the session that you want to signal. You obtain references to Connection objects in the `Connection` property of the `ConnectionEventArgs` object used by the `ConnectionCreated` event sent by the Session object.

The `retryAfterReconnect` parameter is an optional parameter that determines whether the signal will be sent after an automatic reconnection. See [Preventing signals from being sent during automatic reconnection](#preventing-signals-from-being-sent-during-automatic-reconnection).

## Sending a Signal to All Clients in a Session

To send a signal to all clients in a session, call the `Session.SendSignal()` method and leave the `connection` parameter unset (the default value is `null`):

```c#
session.SendSignal("chat", "Hello");
```

The first parameter, `type`, is a string value that clients can filter on when [listening for signals](#receiving-signals-in-a-session). Set this to an empty string if you do not need to set a type.

The second parameter, `signal`, is the data payload (a string) you send with the message. The limit to the size of data is 8KB.

## Receiving Signals in a Session

To start receive signals, add a delegate for the `Signal` method of the Session object:

```c#
session.Signal += Session_Signal;

private void Session_Signal(object sender, SignalEventArgs e)
{
    Console.WriteLine("Session received signal. ");
    Console.WriteLine("Data:" + e.Data);
    Console.WriteLine("Type:" + e.Type);
    Console.WriteLine("From connection with ID:" + e.Connection.Id);
}
```

The delegate method is called when a signal is received in the session.

You can check to see if the signal was received from your client by comparing the .

```csharp
@Override
    private void Session_Signal(object sender, SignalEventArgs e)
    {
    String myConnectionId = session.Connection.ID;
    if (e.Connection != null && e.Connection.ID != myConnectionId) {
        // Signal received from another client
    }
}
```

Note that you can use a [REST API call](/api/video?#signaling) to send a signal from your server, instead of from a client connected to the session. In this case, the `Connection` property of the SignalEventArgs object is set to `null`.

## Preventing Signals From Being Sent During Automatic Reconnection

Clients will attempt to automatically reconnect to a session they disconnect unexpectedly (for example, due to a drop in network connectivity).

By default, any signals you send while the client is temporarily disconnected from a session are queued and sent when (and if) it successfully reconnects.

You can set the `retryAfterReconnect)` parameter of the `Session.SendSignal()` method to `false` to prevent signals from being queued while the client is disconnected. For more information, see [Automatic reconnection](/video/tutorials/joining-a-session/video/joining-a-session/ios/5-automatic-reconnect/objective_c#automatic-reconnection).
