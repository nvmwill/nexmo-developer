---
title: Initializing an OTPublisher object
description: Learn how to publish Vonage Video API streams in your iOS application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Initializing an OTPublisher object

The `OTPublisher` object is used to capture an audio-video stream from the device's microphone and camera for use in a Vonage Video session. The `view` property of the object contains the view of the video you publish:

```objective-c
OTPublisher publisher = [[OTPublisher alloc]
                        initWithDelegate:self
                        settings:[[OTPublisherSettings alloc] init]];
[self.view addSubview:publisher.view];
[publisher.view setFrame:CGRectMake(0, 0, 200, 150)];
```

Implement the methods of the OTPublisherDelegate protocol in the object you specify as the delegate object. These methods are called when publisher-related events occur.

Pass the Publisher object into the `[OTSession publish:error]` method to publish a stream to a session.

You can set other properties of the OTPublisherSettings object to define custom settings for the publisher:

```objective-c
OTPublisherSettings *_publisherSettings = [[OTPublisherSettings alloc] init];
_publisherSettings.name = @"Bob's video";
_publisherSettings.audioTrack = NO;
_publisherSettings.videoTrack = YES;
_publisherSettings.cameraResolution = OTCameraCaptureResolutionHigh;
_publisherSettings.cameraFrameRate = OTCameraCaptureFrameRate30FPS;
_publisher = [[OTPublisher alloc]
                initWithDelegate:self
                settings:_publisherSettings];
```

Note that in sessions that use the Vonage Video Media Router (sessions with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to routed), lowering the frame rate proportionally reduces the bandwidth the stream uses. However, in sessions that have the media mode set to relayed, lowering the frame rate does not reduce the stream's bandwidth.

You can use a custom video capturer to publish a stream with a customized video source — see [Using a custom video capturer](/video/tutorials/audio-video/video/audio-video/ios/2-video-settings/ios#using-a-custom-video-capturer).

<!-- OPT-TODO: You can also use the custom video capturer to publish a screen-sharing stream — see [Screen-sharing](/tutorials/screen-sharing). -->

You can also use a customized audio source for the published stream — see [Using a custom audio driver](/video/tutorials/audio-video/video/audio-video/ios/3-audio-settings/objective_c).
