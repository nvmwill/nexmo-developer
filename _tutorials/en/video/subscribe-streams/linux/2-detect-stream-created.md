---
title: Detect when streams are created in a session
description: Learn how to subscribe to a Vonage Video API stream in your Linux application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Detecting streams in a session

The `on_stream_received` callback function of the `otc_session_callbacks` struct is called when a stream published by another client is created in a session. (A stream is created when a client [publishes](/video/tutorials/publish-streams/introduction/linux) a stream to the session or if the stream exists when you connect to the session.) See [Instantiating an otc_session instance and session-related callbacks](/video/tutorials/joining-a-session/introduction/javascript).

You can subscribe to a stream to display it in your app. See the next section.
