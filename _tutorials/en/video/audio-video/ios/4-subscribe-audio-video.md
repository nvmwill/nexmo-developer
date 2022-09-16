---
title: Subscribing to audio or video only
description: Learn more about manipulating audio and video of Vonage Video API streams for your iOS application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Subscribing to audio or video only

By default, a Subscriber object is initialized to subscribe to audio and video, if they are available.

When you [subscribe to a stream](/video/tutorials/subscribe-streams/introduction/objective_c), you can specify whether to initially subscribe to audio or video (if they are available). For example, the following code subscribes to the audio stream only:

```objective-c
_subscriber = [[OTSubscriber alloc]
                initWithStream:stream delegate:self];
_subscriber.subscribeToAudio = NO;
```

After you create a Subscriber object, you toggle audio on or off by calling the `subscribeToAudio()` method of the Subscriber object:

```objective-c
_subscriber.subscribeToAudio = NO; // audio off
_subscriber.subscribeToAudio = YES; // audio on
```

You toggle video on or off by calling the `subscribeToVideo()` method of the Subscriber object:

```objective-c
subscriber.subscribeToVideo = NO; // video off
subscriber.subscribeToVideo = YES; // video on
```

Note however that you can only subscribe to audio or video if the client publishing the stream includes audio or video. For example, calling `subscribeToVideo(false)` will have no effect if the client publishing the stream is publishing audio only.
