---
title: Testing a publisher's stream
description: Learn how to publish Vonage Video API streams in your iOS application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Testing a publisher's stream

You can publish a test stream and check its audio and video statistics to determine the type of stream (such as high-resolution or audio-only) supported by your connection.

To get statistics for a stream published by the local client, you must use a session that uses the Vonage Video Media Router (sessions with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to routed). You can then use the `networkStatsDelegate` method of the OTSubscriberKit object to get audio and video statistics for the stream you publish. See [this topic](/video/tutorials/subscribe-streams) for more information.

The [Vonage Video-network-test](https://github.com/opentok/opentok-network-test) repo includes sample code for showing how to use statistics of a test stream before publishing to a session.
