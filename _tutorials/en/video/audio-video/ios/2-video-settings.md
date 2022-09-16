---
title: Adjusting video settings
description: Learn more about manipulating audio and video of Vonage Video API streams for your iOS application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Selecting the camera used by a publisher

You can specify (or change) the camera used to publish a stream:

```objective_c
publisher.cameraPosition = AVCaptureDevicePositionFront; // front camera
publisher.cameraPosition = AVCaptureDevicePositionBack; // back camera
```

Note that the `cameraPosition` property is not available in the OTPublisherKit class. If you are using the OTPublisherKit class to implement a custom video capturer, you can define the camera used in the custom video capturing code.

## Detecting when the publisher's camera changes

When the camera used to publish a stream changes, the publisher delegate sends an `[OTPublisher publisher:didChangeCameraPosition:]` message:

```objective_c
- (void)publisher:(OTPublisher *)publisher didChangeCameraPosition:(AVCaptureDevicePosition)position
{
    if (position == AVCaptureDevicePositionFront) {
        // front camera
    } else {
        // back camera
    }
}
```

## Setting the resolution and frame rate for a video

You can set the resolution and frame rate for a publisher's stream by setting the `cameraResolution` and `cameraFrameRate` properties of the OTPublisherSettings object you pass into the `[OTPublisher initWithDelegate:settings:]` method:

```objective_c
OTPublisherSettings *_publisherSettings = [[OTPublisherSettings alloc] init];
_publisherSettings.cameraResolution = OTCameraCaptureResolutionHigh;
_publisherSettings.cameraFrameRate = OTCameraCaptureFrameRate30FPS;
_publisher = [[OTPublisher alloc]
                initWithDelegate:self
                settings:_publisherSettings];
```

Note that in sessions that use the Vonage Video Media Router (sessions with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to routed), lowering the frame rate proportionally reduces the bandwidth the stream uses. However, in sessions that have the media mode set to relayed, lowering the frame rate does not reduce the stream's bandwidth.

## Using a custom video capturer

The OTPublisher class captures video from a camera on the iOS device. You can use the custom video stream API to define a custom video capturer, using the OTPublisherKit and OTVideoCapture classes.

<!-- OPT-TODO: For an example, see the "Project 2: Let's Build OTPublisher" sample in the samples directory of the Vonage Video iOS SDK (or at the [Vonage Video-ios-sdk-samples](https://github.com/opentok/opentok-ios-sdk-samples) repo on github). -->

You can also use a [custom video renderer](/video/tutorials/video-ui-customization/objective_c) for videos.
