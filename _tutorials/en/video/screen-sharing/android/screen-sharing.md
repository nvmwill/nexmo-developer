---
title: Screen Sharing
description: Use the Vonage Video API to do screen sharing between users of your Android application. Learn how to get screen sharing working by publishing a video stream of your screen others can view.
product: video
navigation-weight: 
---

# Screen Sharing

You can publish a stream that uses a video view of your screen (instead of a camera) as the source. A client connected to the session can subscribe to the stream (and view it) as they would subscribe to a stream that uses a camera as the source.

This topic includes the following sections:

* [Publishing a stream with a screen-sharing source](#publishing-a-stream-with-a-screen-sharing-source)
* [Determining the video type ("screen" or "camera") for a stream](#determining-the-video-type-screen-or-camera-for-a-stream)
* [Subscribing to screen-sharing streams](#subscribing-to-screen-sharing-streams)

## Publishing a Stream with a Screen-Sharing Source

To use the device's screen, instead of a camera, as the video source, use the PublisherKit class to use a custom video capturer. For a code sample, see the screen-sharing activity in the samples directory of the SDK.

Call the `setPublisherVideoType(PublisherKit.PublisherKitVideoType type)` property of the Publisher object and pass in `PublisherKit.PublisherKitVideoTypePublisherKitVideoTypeScreen`. This flags the published stream as having a screen-sharing video source (instead of a camera).

Before you publish a screen-sharing stream that uses the screen video type in a routed session, you should call the `setAudioFallbackEnabled(boolean enabled)` method for the PublisherKit object and pass in `false`. This disables the audio-only fallback feature, so that the video does not drop out in subscribers. See [The Vonage Video Media Router and media modes](/video/guides/create-session#the-media-router-and-media-modes).

By default, [scalable video](/video/guides/scalable-video) is disabled for screen-sharing streams. You can enable scalable video for screen-sharing streams using the [PublisherKit.Builder.scalableScreenshare()](/sdk/stitch/video-android-reference/com/opentok/android/PublisherKit.Builder.html#scalableScreenshare-boolean-) method.

## Determining the Video Type ("screen" or "camera") for a Stream

The Stream object contains a `videoType` property. This can be set to one of the following values, defined in the Stream.StreamVideoType enum:

* `StreamVideoTypeCamera` — a standard video stream that uses a camera as the video source
* `StreamVideoTypeScreen` — a screen sharing video stream
* `StreamVideoTypeCustom` — a stream published by a web client using an HTML VideoTrack element as the video source

## Subscribing to Screen-Sharing Streams

You can subscribe to a stream that uses a screen-sharing video source in the same way that you subscribe to a stream that uses a camera as the source. See [Subscribing to streams](/video/tutorials/subscribe-streams/introduction/android).
