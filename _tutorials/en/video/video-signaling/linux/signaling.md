---
title: Signaling
description: "Learn how to use Vonage Video API signaling to build messaging into your Linux application. With signaling, users can send messages, control robots, and more!"
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

To send a signal to a specific client in a session, call the `otc_session_send_signal_to_connection()` function:

```c
otc_session_send_signal_to_connection(session, "chat", "Hello", connection1);
```

The `type` parameter is a string value that clients can filter on when [listening for signals](#receiving-signals-in-a-session). Set this to an empty string if you do not need to set a type.

The `signal` parameter specifies the data payload (a string) you send with the message. The limit to the size of data is 8KB.

The `connection` parameter is a pointer to an `otc_connection` struct corresponding to a client connected to the session that you want to signal. You obtain references to `otc_connection` structs in the `connection` parameter of the `on_connection_created` callback function of the `otc_session_callbacks` instance .

## Sending a Signal to All Clients in a Session

To send a signal to a all clients in a session, call the `otc_session_send_signal()` function:

```c
otc_session_send_signal(session, "chat", "Hello");
```

The `type` parameter is a string value that clients can filter on when [listening for signals](#receiving-signals-in-a-session). Set this to an empty string if you do not need to set a type.

The `signal` parameter specifies the data payload (a string) you send with the message. The limit to the size of data is 8KB.

## Receiving Signals in a Session

The `on_signal_received()` callback function of the `otc_session_callbacks` struct is called when a signal is received in a session. It includes the following parameters:

* `session` — A pointer to the `otc_session` instance.
* `user_data` — A pointer to the user data.
* `type` — A pointer to the type string for the signal.
* `signal` — A pointer to the data string for the signal.
* `connection` — A pointer to the `otc_connection` instance identifying the client that sent the signal.

Note that you can use a [REST API call](/api/video?#signaling) to send a signal from your server, instead of from a client connected to the session. In this case, the `connection` parameter of the `on_signal_received()` is set to `null`.

## Preventing Signals From Being Sent During Automatic Reconnection

Clients will attempt to automatically reconnect to a session they disconnect unexpectedly (for example, due to a drop in network connectivity).

By default, any signals you send while the client is temporarily disconnected from a session are queued and sent when (and if) it successfully reconnects.

You can set the `retryAfterReconnect)` member of the `otc_signal_options` struct that you pass into the `otc_session_send_signal_with_options()` function or the `otc_session_send_signal_to_connection_with_options()` function to `false` to prevent signals from being queued while the client is disconnected.

For more information, see [Automatic reconnection](/video/tutorials/joining-a-session/video/joining-a-session/ios/5-automatic-reconnect/objective_c#automatic-reconnection).
