---
title: Detecting when streams leave a session and a subscriber's video is disabled
description: Learn how to subscribe to an Vonage Video API stream in your iOS application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Detecting when streams leave a session

When streams leave a session, the `[OTSession session: streamDestroyed:]` message is sent. When a stream is dropped, the view for any OTSubscriber object for the stream is removed from its superview. Check if the stream is not published by your own client, and remove its view from its superview.

```
- (void)session:(OTSession*)session streamDestroyed:(OTStream *)stream
{
    NSLog(@"session streamDestroyed (%@)", stream.streamId);

    if ([subscriber.stream.streamId isEqualToString:stream.streamId])
    {
        [_subscriber.view removeFromSuperview];
        _subscriber = nil;
    }
}
```

## Detecting when a subscriber's video is disabled

The subscriber's delegate sends the `[OTSubscriberDelegate subscriberVideoDisabled:reason:]` message when the subscriber's video is disabled:

```
- (void)subscriberVideoDisabled:(OTSubscriber *)subscriber
                            reason:(OTSubscriberVideoEventReason)reason
{
    NSLog(@"subscriber video disabled.");
}
```

The `reason` parameter can be set to one of the following constants defined in the OTSubscriberVideoEventReason enum:

* `OTSubscriberVideoEventPublisherPropertyChanged` — The video event was caused by the stream's publisher stopping the video stream.
* `OTSubscriberVideoEventQualityChanged` — The video event was caused by a change to the video stream quality. Stream quality may change due to network conditions or CPU usage on either the subscriber or publisher. This reason is only used in sessions that have the media mode set to "routed". (See [The Vonage Video Media Router and media modes](/video/guides/create-session#the-media-router-and-media-modes).) This feature of the Vonage Video Media Router has a subscriber drop the video stream when the video stream quality degrades, and the message is sent. When conditions improve, the video stream resumes, and the `[OTSubscriberKit subscriberVideoEnabled:reason:]` message is sent. When the video stream is dropped, the subscriber continues to receive the audio stream, if there is one.
* `OTSubscriberVideoEventSubscriberPropertyChanged` — The video event was caused by a change to this subscriber's `OTSubscriberKit.subscribeToVideo` property.

If the video stream resumes, the `[OTSubscriberKit subscriberVideoEnabled:reason:]` message is sent.

When you publish a stream, you can prevent it from having its video disabled due to stream quality. Before calling the `[OTSession publish:error:]` method, set the `audioFallbackEnabled` property of the Publisher object (or PublisherKit object) to NO.
