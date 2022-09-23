---
title: Setting frame rate and resolution
description: Learn how to subscribe to a Vonage Video API stream in your Android application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Setting the preferred frame rate and resolution

When subscribing to a stream that uses the [scalable video feature](/video/guides/scalable-video), you can set the preferred frame rate and resolution for the stream the subscribing client receives from the Vonage Video Media Router.

For details, see [`SubscriberKit.setPreferredFrameRate()`](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.html#setPreferredFrameRate-float-) and [`SubscriberKit.setPreferredResolution()`](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.html#setPreferredResolution-com.opentok.android.VideoUtils.Size-).
