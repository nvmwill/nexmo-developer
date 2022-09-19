---
title: Subscribing to audio or video only
description: Learn more about manipulating audio and video of Vonage Video API streams for your Android application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Subscribing to audio or video only

By default, a Subscriber object is initialized to subscribe to audio and video, if they are available.

You can toggle audio on or off by calling the `setSubscribeToAudio()` method of the Subscriber object:

```java
mSubscriber.setSubscribeToAudio(false); // audio off
mSubscriber.setSubscribeToAudio(true);  // audio on
```

You toggle video on or off by calling the `setSubscribeToVideo()` method of the Subscriber object:

```java
mSubscriber.setSubscribeToVideo(false); // video off
mSubscriber.setSubscribeToVideo(true);  // video on
```

Note however that you can only subscribe to audio or video if the client publishing the stream includes audio or video. For example, calling `subscribeToVideo(false)` will have no effect if the client publishing the stream is publishing audio only.
