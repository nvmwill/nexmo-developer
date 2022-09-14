---
title: Initializing an OTPublisher object
description: Learn how to publish Vonage Video API streams in your iOS application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Initializing an OTPublisher object

The `OTPublisher` object is used to capture an audio-video stream from the device's microphone and camera for use in an Vonage Video session. The `view` property of the object contains the view of the video you publish:

```swift
let publisher = OTPublisher(delegate: self, settings: OTPublisherSettings())!
if let publisherView = publisher.view {
    self.view.addSubview(publisherView)
    publisherView.frame = CGRect(x: 0, y: 0, width: 200, height: 150)
}
```

Implement the methods of the OTPublisherDelegate protocol in the object you specify as the delegate object. These methods are called when publisher-related events occur.

Pass the Publisher object into the `OTSession publish(_:error:)` method to publish a stream to a session.

You can set other properties of the OTPublisherSettings object to define custom settings for the publisher:

```swift
let publisherSettings = OTPublisherSettings()
publisherSettings.name = "Bob's video"
publisherSettings.audioTrack = false
publisherSettings.videoTrack = true
publisherSettings.cameraResolution = .high
publisherSettings.cameraFrameRate = .rate30FPS
let publisher = OTPublisher(delegate: self, settings: publisherSettings)!
```

Note that in sessions that use the Vonage Video Media Router (sessions with the [media mode](video/guides/create-session#the-media-router-and-media-modes) set to routed), lowering the frame rate proportionally reduces the bandwidth the stream uses. However, in sessions that have the media mode set to relayed, lowering the frame rate does not reduce the stream's bandwidth.

<!-- OPT-TODO: You can use a custom video capturer to publish a stream with a customized video source — see [Using a custom video capturer](/developer/guides/audio-video/ios/#video_capturer). You can also use the custom video capturer to publish a screen-sharing stream — see [Screen-sharing](/developer/guides/screen-sharing/ios/).

You can also use a customized audio source for the published stream — see [Using a custom audio driver](/developer/guides/audio-video/ios/#audio_driver). -->
