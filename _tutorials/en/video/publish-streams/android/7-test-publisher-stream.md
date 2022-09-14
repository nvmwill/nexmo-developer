---
title: Testing a publisher's stream
description: Learn how to publish Vonage Video API streams in your Android application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Testing a publisher's stream

You can publish a test stream and check its audio and video statistics to determine the type of stream (such as high-resolution or audio-only) supported by your connection.

To get statistics for a stream published by the local client, you must use a session that uses the Vonage Video Media Router (sessions with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to routed). 

You can then use the [SubscriberKit.setAudioStatsListener(AudioStatsListener listener)](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.html#setAudioStatsListener(com.opentok.android.SubscriberKit.AudioStatsListener)) and [SubscriberKit.setVideoStatsListener(VideoStatsListener listener)](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.html#setVideoStatsListener(com.opentok.android.SubscriberKit.VideoStatsListener)) methods of the Subscriber object to get audio and video statistics for the stream you publish. 

<!-- OPT-TODO: See [this topic](/developer/guides/subscribe-stream/android/#stream_info) for more information. -->

<!-- OPT-TODO: The [Vonage Video-network-test](https://github.com/opentok/opentok-network-test) repo includes sample code for showing how to use statistics of a test stream before publishing to a session. -->
