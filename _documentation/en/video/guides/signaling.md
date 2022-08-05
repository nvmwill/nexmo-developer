---
title: Signaling
meta_title: Learn how to use Vonage Video API signaling to build robust messaging into your Android, iOS, or web application.
description: Learn how to use Vonage Video API signaling to build robust messaging into your Android, iOS, or web application. With signaling, users can send messages, control robots, and more!
navigation_weight:
---

# Signaling

Use the signaling API to send text and data between clients connected to a session.

These messages allow developers to build basic text chat, send instructions from one client to another, and create other valuable experiences.

The client SDKs include methods for sending signals to clients connected to a session. They also include events that are dispatched when a signal is received.

See the [signaling tutorials]() to learn how to send and receive signals.
You can also use the [REST API](/api/video?#signaling) to send signals from the server to clients. 

## Signal payloads

Each signal contains `data` and `type` values, both of which are strings:

* `data` — Contains main information to be sent in the signal
* `type` — A secondary field that you can use to group and filter signals.

A client can also send a signal with no `data` or `type` defined. This ping signal will only identify the sender of the signal.
The signal also includes a property that identifies the client that sent the signal.
You can send a signal to a specific client or to all clients connected to a session.

## Signal delivery

For a client connected to a session, the client SDK dispatches an event when the client receives a signal. However, there is no event on the sending client that indicates that the recipient(s) received a signal. If your application requires it, you can use the signaling API to send receipt acknowledgments back to the sending client.

The Vonage video server relays signals from the sending client to receiving clients. The signal is sent using TCP-based WebSocket connections between clients and the Vonage video server. Signal delivery is not strictly guaranteed, but signaling uses packet retransmission abilities inherent to TCP.

Signal event order is preserved for signals sent from a signal client, but not across all clients. For example, consider a session in which client A sends signals 1 and 2 to all clients in the session, and client B sends signals 3 and 4 to all clients in the session. Signal 1 will be received before signal 2, and signal 3 will be received before signal 4. But there is no guarantee that client A's signals will be received before client B's signals.

> Signaling is available to all Vonage video customers. Signaling does *not* require the [ Media Router](/video/guides/create-session#the-media-router-and-media-modes)) — it is available in all sessions (routed or relayed).

See the [signaling tutorials]() to learn how to send and receive signals.