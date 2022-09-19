---
title: Adjusting audio settings
description: Learn more about manipulating audio and video of Vonage Video API streams for your Windows application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Using a custom audio driver

By default, the Vonage Video Windows SDK uses the device microphone to capture audio to transmit to a published stream. And it uses the and speakers (or headphones) to play back audio from a subscribed stream. You can implement a custom audio driver to read and write audio data for subscribers and publishers.

Create an implementation the [IAudioDevice](/sdk/stitch/video-windows-reference/interface_open_tok_1_1_i_audio_device.html) interface and its methods. The `IAudioDevice.InitAudio(AudioDevice.AudioBus audioBus)` method is called when the AudioDevice is initialized. Use the [AudioBus](/sdk/stitch/video-windows-reference/class_open_tok_1_1_audio_device_1_1_audio_bus.html) object, passed into that method, to read write audio data, with its `ReadRenderData(buffer, numberOfSamples)` and `WriteCaptureData(buffer, numberOfSamples)` methods.

## Reducing audio bandwidth with Opus DTX

[Opus DTX (Discontinuous Transmission)](https://datatracker.ietf.org/doc/html/rfc7587#section-3.1.3) is an audio codec that can reduce the bandwidth usage when a participant is not speaking. This can be useful in large sessions with many audio participants.

You enable Opus DTX by setting the `OpusDtx` property of the [`Publisher.Builder`](/sdk/stitch/video-windows-reference/class_open_tok_1_1_publisher_1_1_builder.html) object you use when [creating a Publisher](/tutorials/publish-stream/windows)) to `true`.

For more information, see this [Vonage Video API knowledge base article](https://video-api.support.vonage.com/hc/en-us/articles/4411846588564-What-is-Opus-DTX-).

## Setting the audio volume for a subscriber

You can individually set the audio volume for each subscriber by calling the `Subscriber.AudioVolume` property.
