---
title: Adjusting audio settings
description: Learn more about manipulating audio and video of Vonage Video API streams for your iOS application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Using a custom audio driver

By default, the Vonage Video iOS SDK uses the device microphone to capture audio to transmit to a published stream. And it uses the speakers (or headphones) to play back audio from a subscribed stream. Call the `[OTAudioDeviceManager setAudioDevice:]` method to set up a custom audio driver for capturing and rendering audio samples:

```objective_c
myAudioDevice = [[MyAudioDevice alloc] init];
[OTAudioDeviceManager setAudioDevice:_myAudioDevice];
```

Call `[OTAudioDeviceManager setAudioDevice:]` before you initialize an OTSession object. Call the `[OTAudioDevice setAudioBus:]` method to set an audio bus object. This object, defined by the OTAudioBus protocol, has a `[OTAudioBus writeCaptureData:numberOfSamples:]` method and a `[OTAudioBus readRenderData:numberOfSamples:]` method. These methods are called when audio samples are made available for writing to the publisher's audio stream or for reading from the subscribed streams.

<!-- OPT-TODO: For an example, see the "Project 7: External Audio Device" sample in the samples directory of the Vonage Video iOS SDK (or at the [Vonage Video-ios-sdk-samples](https://github.com/opentok/opentok-ios-sdk-samples) repo on GitHub). -->

## Reducing audio bandwidth with Opus DTX

[Opus DTX (Discontinuous Transmission)](https://datatracker.ietf.org/doc/html/rfc7587#section-3.1.3) is an audio codec that can reduce the bandwidth usage when a participant is not speaking. This can be useful in large sessions with many audio participants.

You enable Opus DTX by setting the `enableOpusDtx` property of the [`OTPublisherKitSettings`](/sdk/stitch/video-ios-reference/Classes/OTPublisherKitSettings.html) object you pass into the `[OTPublisherKit initWithDelegate:settings:]` method (when [creating a Publisher](/video/tutorials/publish-streams/introduction/objective_c)).

For more information, see this [Vonage Video API knowledge base article](https://video-api.support.vonage.com/hc/en-us/articles/4411846588564-What-is-Opus-DTX-).

## Setting the audio volume for a subscriber

You can individually set the audio volume for each subscriber by setting the `OTSubscriberKit.audioVolume` property.
