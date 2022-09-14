---
title: Testing a publisher's stream
description: Learn how to publish Vonage Video API streams in your Windows application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Testing a publisher's stream

You can publish a test stream and check its audio and video statistics to determine the type of stream (such as high-resolution or audio-only) supported by your connection.

You can then subscribe to the stream and use the `Subscriber.AudioStatsUpdated` and `Subscriber.VideoStatsUpdated` events to get audio and video statistics for the stream you publish.
