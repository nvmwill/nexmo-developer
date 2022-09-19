---
title: Adjusting audio settings
description: Learn more about manipulating audio and video of Vonage Video API streams for your Android application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Using a custom audio driver

By default, the Vonage Video Android SDK uses the device microphone to capture audio to transmit to a published stream. And it uses the and speakers (or headphones) to play back audio from a subscribed stream. Create a class that extends the BaseAudioDevice, defined in the Vonage Video Android SDK:

```java
    public class CustomAudioDevice extends BaseAudioDevice
```

Then call the `AudioDeviceManager.setAudioDevice()` method to set the app to use the an instance of the audio device class for capturing and rendering audio samples:

```java
AudioDeviceManager.setAudioDevice(customAudioDevice);
```

The BaseAudioDevice class has a `getAudioBus()` method that returns a AudioBus object, defined in the Vonage Video Android SDK. The AudioBus has a `readRenderData()` method for reading audio samples from subscribed audio streams. And it has a a `writeCaputureData()` method for supplying audio samples to the publisher's audio stream.

<!-- OPT-TODO: For examples, see the Basic-Audio-Driver and Advanced-Audio-Driver samples in the [Vonage Video-android-sdk-samples](https://github.com/opentok/opentok-android-sdk-samples) repo on github). -->

## Setting the audio output mode for a voice session

By default, the Vonage Video Android SDK uses the device loudspeaker (instead of the headset speaker) for playing audio. This is preferable for apps that include both video and audio. However, in a [voice-only session](/guides/voice/), it is preferable to have the audio played back using the headset speaker. You can have the app do this by making the following call:

```java
AudioDeviceManager.getAudioDevice().setOutputMode(
    OutputMode.Handset);
```

## Reducing audio bandwidth with Opus DTX

[Opus DTX (Discontinuous Transmission)](https://datatracker.ietf.org/doc/html/rfc7587#section-3.1.3) is an audio codec that can reduce the bandwidth usage when a participant is not speaking. This can be useful in large sessions with many audio participants.

You enable Opus DTX by calling the [`enableOpusDtx()`](/sdk/stitch/video-android-reference/com/opentok/android/PublisherKit.Builder.html#name-boolean-) method of the `PublisherKit.Builder` object you use to [instantiate a Publisher](/tutorials/publish-stream/android).

For more information, see this [Vonage Video API knowledge base article](https://video-api.support.vonage.com/hc/en-us/articles/4411846588564-What-is-Opus-DTX-).

## Setting the audio volume for a subscriber

You can individually set the audio volume for each subscriber by calling the `Subscriber.setAudioVolume()` method.
