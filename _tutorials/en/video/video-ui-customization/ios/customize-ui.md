---
title: Customizing the UI
description: Learn how to customize the UI of your Vonage Video API videos for your iOS application. You can set the initial dimensions, resize, reposition, and more.
product: video
---

# Customizing the user interface - iOS

There are a number of adjustments you can make to customize the Vonage Video user interface:

* [Adding a name for a published stream](#adding-a-name-for-a-published-stream)
* [Adding a mute button for a publisher](#adding-a-mute-button-for-a-publisher)
* [Adding a mute button for a subscriber](#adding-a-mute-button-for-a-subscriber)
* [Adding a button to toggle the publisher's camera](#adding-a-button-to-toggle-the-publishers-camera)
* [Adjusting user interface when video is enabled or disabled](#adjusting-user-interface-when-video-is-enabled-or-disabled)
* [Displaying an indicator element when a session is being archived](#displaying-an-indicator-element-when-a-session-is-being-archived)
* [Getting a snapshot image of a video](#getting-a-snapshot-image-of-a-video)
* [Adjusting user interface based on audio levels](#adjusting-user-interface-based-on-audio-levels)
* [Using a custom video renderer](#using-a-custom-video-renderer)

## Adding a name for a published stream

To specify the name property of the published stream, set the `name` property of the OTPublisherSettings object you use when initializing a Publisher:

```objective_c
OTPublisherSettings *_publisherSettings = [[OTPublisherSettings alloc] init];
_publisherSettings.name = @"Juan";
_publisher = [[OTPublisher alloc]
                initWithDelegate:self
                settings:_publisherSettings];
```

The OTStream class has a `name` property. When you [subscribe to a stream](/video/tutorials/subscribe-streams/introduction/objective_c), you can display this name in a user interface element. (Also, this name is displayed when the video in a web page that uses the OpenTok.js library.)

## Adding a mute button for a publisher

There is no default user interface element to mute the publisher's microphone. However, you can add an element, such as a button, that sets the `publishAudio` property of the OTPublisher object when the user clicks it. Set the `publishAudio` property to `NO` to mute the publisher:

```objective_c
publisher.publishAudio = NO;
```

Set the `publishAudio` property to `YES` to publish audio.

```objective_c
publisher.publishAudio = YES;
```

<!-- OPT-TODO: For an example, see the "Project 4: Overlay Graphics" sample in the samples directory of the Vonage Video iOS SDK (or at the [Vonage Video-ios-sdk-samples](https://github.com/opentok/opentok-ios-sdk-samples) repo on github). -->

## Adding a mute button for a subscriber

There is no default user interface element to mute the subscriber's audio. However, you can add an element, such as a button, that sets the `subscribeToAudio` of the OTSubscriber object when the user clicks it. Set the `subscribeToAudio` property to `NO` to mute the subscriber

```objective_c
subscriber.subscribeToAudio = NO;
```

Set the `subscribeToAudio` property to `YES` to subscribe to audio (if there is an audio stream):

```objective_c
subscriber.subscribeToAudio = YES;
```

<!-- OPT-TODO: For an example, see the "Project 4: Overlay Graphics" sample in the samples directory of the Vonage Video iOS SDK (or at the [Vonage Video-ios-sdk-samples](https://github.com/opentok/opentok-ios-sdk-samples) repo on github). -->

## Adding a button to toggle the publisher's camera

There is no default user interface element to toggle the camera used by the publisher. However, you can add an element, such as a button, that sets the `cameraPosition` property the OTPublisher object. Set the property to a value defined in the AVCaptureDevicePosition enum. For example, the following code sets the publisher to use the back camera:

```objective_c
publisher.cameraPosition = AVCaptureDevicePositionBack;
```

Note that the `cameraPosition` property is not available in the OTPublisherKit class. If you are using the OTPublisherKit class to [implement a custom video capturer](/video/tutorials/audio-video/introduction/objective_c), you can define the camera used in the custom video capturing code.

<!-- OPT-TODO: For an example, see the "Project 4: Overlay Graphics" sample in the samples directory of the Vonage Video iOS SDK (or at the [Vonage Video-ios-sdk-samples](https://github.com/opentok/opentok-ios-sdk-samples) repo on github). -->

## Adjusting user interface when video is enabled or disabled

When a subscriber's video is disabled, the [\[OTSubscriberKitDelegate subscriberVideoDisabled:reason:\]](/sdk/stitch/video-ios-reference/Protocols/OTSubscriberKitDelegate.html#//api/name/subscriberVideoDisabled:reason:) message is sent. When this occurs, you can add a user interface element (such as an icon) to indicate that the video was disabled:

```objective_c
- (void)subscriberVideoDisabled:(OTSubscriberKit*)subscriber
                            reason:(OTSubscriberVideoEventReason)reason
{
    // Display the video disabled indicator
}
```

When a subscriber's video is reenabled, the [\[OTSubscriberKitDelegate subscriberVideoEnabled:reason:\]](/sdk/stitch/video-ios-reference/Protocols/OTSubscriberKitDelegate.html#//api/name/subscriberVideoDisabled:reason:) message is sent. When this occurs, you may remove a user interface element (such as an icon) that indicate that the video is reenabled:

```objective_c
- (void)subscriberVideoEnabled:(OTSubscriberKit*)subscriber
                        reason:(OTSubscriberVideoEventReason)reason
{
    // Remove the video disabled indicator
}
```

In sessions that use the [Vonage Video Media Router](/video/guides/create-session#the-media-router-and-media-modes) (sessions with the media mode set to routed), the following messages can also be sent:

* [\[OTSubscriberKitDelegate subscriberVideoDisableWarning:\]](/sdk/stitch/video-ios-reference/Protocols/OTSubscriberKitDelegate.html#//api/name/subscriberVideoDisableWarning:) — The Vonage Video Media Router has determined that the stream quality has degraded and the video will be disabled if the quality degrades further.
* [\[OTSubscriberKitDelegate subscriberVideoDisableWarningLifted:\]](/sdk/stitch/video-ios-reference/Protocols/OTSubscriberKitDelegate.html#//api/name/subscriberVideoDisableWarningLifted:) — The Vonage Video Media Router has determined that the stream quality has improved to the point at which the video being disabled is not an immediate risk.

You may also want to display and remove a user interface notification (such as an icon) when these messages are sent.

<!-- OPT-TODO: For an example, see the "Project 4: Overlay Graphics" sample in the samples directory of the Vonage Video iOS SDK (or at the [Vonage Video-ios-sdk-samples](https://github.com/opentok/opentok-ios-sdk-samples) repo on github). -->

Note that when you publish a stream, you can prevent it from having its video disabled due to stream quality. Before you publish the stream (by calling the `[OTSession publish:error]` method), set the `audioFallbackEnabled` property of the Publisher object (or PublisherKit object) to NO.

## Displaying an indicator element when a session is being archived

When a archive of a session starts recording (or if you connect to a session that is being recorded), the `[OTSessionDelegate session:archiveStartedWithId:name:]` message is sent. When the recording stops the `[OTSessionDelegate session:archiveStoppedWithId:]` message is sent. You can add a user interface element, such as an icon displayed in a OTPublisher view, to indicate that a video is being recorded:

```objective_c
- (void)     session:(OTSession*)session
archiveStartedWithId:(NSString*)archiveId
                name:(NSString*)name
{
    // Display the archive indicator
}

- (void)     session:(OTSession*)session
archiveStoppedWithId:(NSString*)archiveId
{
    // Hide the archive indicator
}
```

<!-- OPT-TODO: For an example, see the "Project 5: Multi-Party-Call" sample in the samples directory of the Vonage Video iOS SDK (or at the [Vonage Video-ios-sdk-samples](https://github.com/opentok/opentok-ios-sdk-samples) repo on github). -->

## Getting a snapshot image of a video

The following code captures and display a static image of the Publisher video, adds it to the main view, and sets a UIImage object for the image:

```objective_c
UIView* screenCapture = [publisher.view
    snapshotViewAfterScreenUpdates:YES];
[self.view addSubview:screenCapture];

UIGraphicsBeginImageContextWithOptions(publisher.view.bounds.size,
    NO, [UIScreen mainScreen].scale);
[view drawViewHierarchyInRect:publisher.view.bounds
    afterScreenUpdates:YES];
UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
UIGraphicsEndImageContext();
```

The following code captures and display a static image of the subscriber video, adds it to the main view, and sets a UIImage object for the image:

```objective_c
UIView* screenCapture = [subscriber.view
    snapshotViewAfterScreenUpdates:YES];
[self.view addSubview:screenCapture];

UIGraphicsBeginImageContextWithOptions(subscriber.view.bounds.size,
    NO, [UIScreen mainScreen].scale);
[view drawViewHierarchyInRect:subscriber.view.bounds
    afterScreenUpdates:YES];
UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
UIGraphicsEndImageContext();
```

<!-- OPT-TODO: For an example of obtaining a high-resolution image of a publisher, see the "Live Photo Capture" sample in the [Vonage Video iOS Samples repo](https://github.com/opentok/opentok-ios-sdk-samples). This sample is also in the samples directory of the Vonage Video iOS SDK. -->

## Adjusting user interface based on audio levels

The `[OTPublisherKitAudioLevelDelegate publisher:audioLevelUpdated:]` and `[OTSubscriberKitAudioLevelDelegate subscriber:audioLevelUpdated:]` messages are sent on a regular interval with the audio level of the subscriber and publisher. You can use the `audioLevel` value to update the display in an audio level meter.

<!-- OPT-TODO: For an example, see the "Project 6: Audio Levels" sample in the samples directory of the Vonage Video iOS SDK (or at the [Vonage Video-ios-sdk-samples](https://github.com/opentok/opentok-ios-sdk-samples) repo on github). -->

## Using a custom video renderer

The OTPublisher and OTSubscriber classes provide a default UIView instance that renders the publisher or subscriber video. You can use the custom video stream API to define a custom video renderer, using OTPublisherKit, OTSubscriberKit, and OTVideoRender classes.

<!-- OPT-TODO: For an example, see the "Project 2: Let's Build OTPublisher" sample in the samples directory of the Vonage Video iOS SDK (or at the [Vonage Video-ios-sdk-samples](https://github.com/opentok/opentok-ios-sdk-samples) repo on github). -->

You can also set up a publisher to use a [custom video capturer](/video/tutorials/audio-video/introduction/objective_c).
