--- 
title: Detecting when clients have connected and disconnected 
description: Learn how to connect to a Vonage Video API session so that participants can use audio, video, and messaging functionality in your ios application.
product: video 
---

## Detecting when other clients have connected and disconnected

The `OTSessionDelegate session(_: connectionCreated:)` message is sent to the session's delegate when another client connects to the session (and for each client connected to the session when you connect).

The `OTSessionDelegate session(_: connectionDestroyed:)` message is sent to the session's delegate when another client disconnects from the session.
