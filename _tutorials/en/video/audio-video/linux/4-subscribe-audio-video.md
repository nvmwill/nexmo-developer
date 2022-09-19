---
title: Subscribing to audio or video only
description: Learn more about manipulating audio and video of Vonage Video API streams for your Linux application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Subscribing to audio or video only

By default, a subscriber is initialized to subscribe to audio and video, if they are available. You can toggle audio on or off by calling the [`otc_subscriber_set_subscribe_to_audio(otc_subscriber *subscriber, otc_bool subscribe_to_audio)`](/sdk/stitch/video-linux-reference/subscriber_8h.html#a61d83e5e082dac0e87f6c205afd8d711) :

```c
// audio off:
otc_subscriber_set_subscribe_to_video(subscriber, OTC_FALSE);
// audio on:
otc_subscriber_set_subscribe_to_video(subscriber, OTC_TRUE);
```    

You can toggle video on or off by calling the [`otc_subscriber_set_subscribe_to_video(otc_subscriber *subscriber, otc_bool subscribe_to_video)`](/sdk/stitch/video-linux-reference/subscriber_8h.html#a7cbb162ee250883991c900933591e871) :

```c
// video off:
otc_subscriber_set_subscribe_to_video(subscriber, OTC_FALSE);
// video on:
otc_subscriber_set_subscribe_to_video(subscriber, OTC_TRUE);
```
