---
title: Preventing signals from being sent during automatic reconnection
description: Preventing signals from being sent during automatic reconnection
product: video
---

# Preventing signals from being sent during automatic reconnection

Clients will attempt to automatically reconnect to a session they disconnect unexpectedly (for example, due to a drop in network connectivity). 

By default, any signals you send while the client is temporarily disconnected from a session are queued and sent when (and if) it successfully reconnects. 

You can set the `retryAfterReconnect` property to `false` in the options you pass into the `Session.signal()` method to prevent signals from being queued while the client is disconnected.

For more information, see [Automatic reconnection](/video/tutorials/joining-a-session/video/joining-a-session/javascript/automatic-reconnect/javascript).