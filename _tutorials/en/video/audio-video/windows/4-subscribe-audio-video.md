---
title: Subscribing to audio or video only
description: Learn more about manipulating audio and video of Vonage Video API streams for your Windows application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Subscribing to audio or video only

By default, a Subscriber object is initialized to subscribe to audio and video, if they are available.

You can toggle audio on or off by setting the `SubscribeToAudio` property of the Subscriber object:

```c#
subscriber.SubscribeToAudio = false; // audio off
subscriber.SubscribeToAudio = true;  // audio on
```

You toggle video on or off by setting the `SubscribeToVideo` property of the Subscriber object:

```c#
subscriber.SubscribeToVideo = false; // video off
subscriber.SubscribeToVideo = true;  // video on
```

Note however that you can only subscribe to audio or video if the client publishing the stream includes audio or video. For example, setting `SubscribeToVideo` to `true` will have no effect if the client publishing the stream is publishing audio only.
