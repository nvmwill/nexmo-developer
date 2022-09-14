---
title: Initializing an OTPublisher object
description: Learn how to publish Vonage Video API streams in your Android application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Initializing a Publisher object

A Publisher object is used to capture an audio-video stream from the device's microphone and camera for use in an Vonage Video session.

For a basic publisher, use the `Publisher.Builder` class to instantiate a Publisher object. Pass in the Android application context for the publisher:

```java
mPublisher = new Publisher.Builder(context)
    .build();
```

Add a listener object for basic publisher-related events by calling the `setPublisherListener(PublisherKit.PublisherListener listener)` method of the Publisher object:

```java
mPublisher.setPublisherListener(this);
```

Implement the methods of the PublisherKit.PublisherListener interface in the object you specify as the event listener object. These methods are called when publisher-related events occur.

The `getView()` method of the Publisher object returns the view of the video you publish. Add it as a subview of an android.view.ViewGroup object to display it in the app:

```java
mPublisherViewContainer.addView(mPublisher.getView());
```

Pass the Publisher object into the `Session.publish()` method to publish a stream to a session.

You can call other methods of the Publisher.Builder object to define custom settings for the publisher:

```java
mPublisher = new Publisher.Builder(context)
    .name("Bob")
    .audioTrack(true)
    .frameRate(CameraCaptureFrameRate.FPS_7)
    .resolution(CameraCaptureResolution.LOW)
    .videoTrack(false)
    .capturer(mCapturer)
    .renderer(mRenderer)
    .build();
```

Note that in sessions that use the Vonage Video Media Router (sessions with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to routed), lowering the frame rate proportionally reduces the bandwidth the stream uses. However, in sessions that have the media mode set to relayed, lowering the frame rate does not reduce the stream's bandwidth.

<!--OPT-TODO: [Using a custom video capturer](/developer/guides/audio-video/android/#custom_capturer) -->

You can use a custom video capturer to publish a stream with a customized video source. You can also use the custom video capturer to publish a screen-sharing stream.

<!-- OPT-TODO: [Screen-sharing](/developer/guides/screen-sharing/android/). -->

<!-- OPT-TODO: You can also use a customized audio source for the published stream — see [Using a custom audio driver](/developer/guides/audio-video/android/#audio_driver). -->
