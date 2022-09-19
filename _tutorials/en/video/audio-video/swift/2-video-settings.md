---
title: Adjusting video settings
description: Learn more about manipulating audio and video of Vonage Video API streams for your iOS application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Selecting the camera used by a publisher

You can specify (or change) the camera used to publish a stream:

```swift
publisher.cameraPosition = .front // front camera
publisher.cameraPosition = .back // back camera
```

Note that the `cameraPosition` property is not available in the OTPublisherKit class. If you are using the OTPublisherKit class to implement a custom video capturer, you can define the camera used in the custom video capturing code.

## Detecting when the publisher's camera changes

When the camera used to publish a stream changes, the publisher delegate sends an `OTPublisher publisher(_:didChangeCameraPosition:)` message:

```swift
func publisher(_ publisher: OTPublisher, didChangeCameraPosition position: AVCaptureDevice.Position) {
    if position == .front {
        // front camera
    } else {
        // back camera
    }
}
```

## Setting the resolution and frame rate for a video

You can set the resolution and frame rate for a publisher's stream by setting the `cameraResolution` and `cameraFrameRate` properties of the `OTPublisherSettings` object you pass into the `OTPublisher init(delegate:settings:)` method:

```swift
let publisherSettings = OTPublisherSettings()
publisherSettings.cameraResolution = .high
publisherSettings.cameraFrameRate = .rate30FPS
let publisher = OTPublisher(delegate: self, settings: publisherSettings)
```

Note that in sessions that use the Vonage Video Media Router (sessions with the [media mode](r/guides/create-session/#the-media-router-and-media-modes) set to routed), lowering the frame rate proportionally reduces the bandwidth the stream uses. However, in sessions that have the media mode set to relayed, lowering the frame rate does not reduce the stream's bandwidth.

## Using a custom video capturer

The OTPublisher class captures video from a camera on the iOS device. You can use the custom video stream API to define a custom video capturer, using the OTPublisherKit and OTVideoCapture classes.

<!-- OPT-TODO: For an example, see the "Project 2: Let's Build OTPublisher" sample in the samples directory of the Vonage Video iOS SDK (or at the [Vonage Video-ios-sdk-samples-swift](https://github.com/opentok/opentok-ios-sdk-samples-swift) repo on github). -->

You can also use a [custom video renderer](/video/tutorials/video-ui-customization/swift) for videos.
