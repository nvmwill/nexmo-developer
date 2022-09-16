---
title: Adjusting audio settings
description: Learn more about manipulating audio and video of Vonage Video API streams for your Linux application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Using a custom audio driver

You can define a custom audio device, to supply audio to all publishers in the client and to handle the mixed audio stream from all streams the client subscribes to.

A custom audio device is represented by an [`otc_audio_device`](/sdk/stitch/video-linux-reference/structotc__audio__device__callbacks.html) struct.

And an [`otc_audio_device_callbacks`](/sdk/stitch/video-linux-reference/structotc__audio__device__callbacks.html) struct includes function pointers to functions that act as the audio-related callbacks that the Vonage Video Linux SDK invokes.

<!-- OPT-TODO: To see an example, see the Custom Audio Device sample in the [Vonage Video-linux-sdk-samples](https://github.com/opentok/opentok-linux-sdk-samples) repo. -->

## Setting the audio volume for a subscriber

You can individually set the audio volume for each subscriber by calling the `otc_subscriber_set_audio_volume()` function.
