---
title: Screen Sharing
description: Use the Vonage Video API to do screen sharing between users of your iOS application. Learn how to get screen sharing working by publishing a video stream of your screen others can view.
product: video
navigation-weight: 
---

# Screen Sharing

You can publish a stream that uses a video view of your screen (instead of a camera) as the source.

A client connected to the session can subscribe to the stream (and view it) as they would subscribe to a stream that uses a camera as the source.

This topic includes the following sections:

* [Publishing a stream with a screen-sharing source](#publishing-a-stream-with-a-screen-sharing-source)
* [Determining the video type ("screen" or "camera") for a stream](#determining-the-video-type-screen-or-camera-for-a-stream)
* [Subscribing to screen-sharing streams](#subscribing-to-screen-sharing-streams)

## Publishing a stream with a screen-sharing source

To use the device's screen, instead of a camera, as the video source, use the PublisherKit class to use a custom video capturer. For a code sample, see the Screen-Sharing project in the samples directory of the SDK.

Set the `OTPublisherKit.videoType` property to `OTPublisherKitVideoTypeScreen` (defined in OTPublisherKitVideoType). This flags the published stream as having a screen-sharing video source (instead of a camera).

Before you publish a screen-sharing stream that uses the screen video type in a session that uses the Vonage Video Media Server, you should set the `OTPublisherKit.audioFallbackEnabled` property to NO (false in swift). This disables the audio-only fallback feature, so that the video does not drop out in subscribers. See [The Vonage Video Media Router and media modes](/video/guides/create-session#the-media-router-and-media-modes).

By default, [scalable video](/video/guides/scalable-video) is disabled for screen-sharing streams. You can enable scalable video for screen-sharing streams using the [OTPublisherKitSettings.scalableScreenshare](/sdk/stitch/video-ios-reference/Classes/OTPublisherKitSettings.html#//api/name/scalableScreenshare) property. _Note:_ scalable video for screen-sharing streams is a _beta_ feature.

## Determining the video type ("screen" or "camera") for a stream

The Stream object contains a `videoType` property. This can be set to one of the following values, defined in the OTStreamVideoType enum:

* `OTStreamVideoTypeCamera` — a standard video stream that uses a camera as the video source
* `OTStreamVideoTypeScreen` — a screen sharing video stream
* `OTStreamVideoTypeCustom` — a stream published by a web client using an HTML VideoTrack element as the video source

## Subscribing to screen-sharing streams

You can subscribe to a stream that uses a screen-sharing video source in the same way that you subscribe to a stream that uses a camera as the source. See Subscribing to streams in [Objective-C](/video/tutorials/subscribe-streams/introduction/objective_c) or [Swift](/video/tutorials/subscribe-streams/introduction/swift).
