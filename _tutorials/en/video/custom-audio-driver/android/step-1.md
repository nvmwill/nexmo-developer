---
title: Adding a Custom Audio Driver
description: Add a custom audio driver to your application using the Vonage Video API.
product: video
---

## Adding a Custom Audio Driver

<!-- alex ignore white -->

This sample application uses the custom audio driver to publish white noise (a random audio signal) to its audio stream. It also uses the custom audio driver to capture the audio from subscribed streams and save it to a file.

### Setting up the audio device and the audio bus

In using a custom audio driver, you define a custom audio driver and an audio bus to be used by the app.

The `NoiseAudioDevice` class defines a basic audio device interface to be used by the app. It extends the `BaseAudioDevice` class, defined by the Vonage Video Android SDK. To use a custom audio driver, call the `AudioDeviceManager.setAudioDevice()` method. This sample sets the audio device to an instance of the `NoiseAudioDevice` class:

```java
AudioDeviceManager.setAudioDevice(noiseAudioDevice);
```

Use the `AudioSettings` class, defined in the Vonage Video Android SDK, to define the audio format used by the custom audio driver. The `NoiseAudioDevice()` constructor instantiates two `AudioSettings` instances — one for the custom audio capturer and one for the custom audio renderer. It sets the sample rate and number of channels for each:

```java
public NoiseAudioDevice(Context context) {
    this.context = context;

    captureSettings = new AudioSettings(SAMPLING_RATE, NUM_CHANNELS_CAPTURING);
    rendererSettings = new AudioSettings(SAMPLING_RATE, NUM_CHANNELS_RENDERING);

    capturerStarted = false;
    rendererStarted = false;

    audioDriverPaused = false;

    capturerHandler = new Handler();
    rendererHandler = new Handler();
}
```

The constructor also sets up some local properties that report whether the device is capturing or rendering. It also sets a Handler instance to process the `capturer` Runnable object.

The `NoiseAudioDevice.getAudioBus()` method gets the `AudioBus` instance that this audio device uses, defined by the `NoiseAudioDevice.AudioBus` class. Use the `AudioBus` instance to send and receive audio samples to and from a session. The publisher will access the `AudioBus` object to obtain the audio samples. Subscribers will send audio samples (from subscribed streams) to the AudioBus object.

### Capturing audio to be used by a publisher

The `BaseAudioDevice.startCapturer()` method is called when the audio device should start capturing audio to be published. The `NoiseAudioDevice` implementation of this method starts the `capturer` thread to be run in the queue after 1 second:

```java
public boolean startCapturer() {
    capturerStarted = true;
    capturerHandler.postDelayed(capturer, capturerIntervalMillis);
    return true;
}
```

<!-- alex ignore white -->

The `capturer` thread produces a buffer containing samples of random data (white noise). It then calls the `writeCaptureData()` method of the `AudioBus` object, which sends the samples to the audio bus. The publisher in the application uses the samples sent to the audio bus to transmit as audio in the published stream. Then if a capture is still in progress (if the app is publishing), the `capturer` thread is run again after another second:

```java
private Runnable capturer = new Runnable() {
    @Override
    public void run() {
        capturerBuffer.rewind();

        Random rand = new Random();
        rand.nextBytes(capturerBuffer.array());

        getAudioBus().writeCaptureData(capturerBuffer, SAMPLING_RATE);

        if(capturerStarted && !audioDriverPaused) {
            capturerHandler.postDelayed(capturer, capturerIntervalMillis);
        }
    }
};
```

The AudioDevice class includes other methods that are implemented by the NoiseAudioDevice class. However, this sample does not do anything interesting in these methods, so they are not included in this discussion.
