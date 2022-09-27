---
title: Adding a Custom Audio Renderer
description: Add a custom audio driver to your application using the Vonage Video API.
product: video
---

## Adding a Custom Audio Renderer

You will implement audio renderer for subscribed streams' audio.

The `NoiseAudioDevice()` constructor method sets up a file to save the incoming audio to a file. This is done to illustrate a use of the custom audio driver's audio renderer. The app requires the following permissions, defined in the `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

The `BaseAudioDevice.initRenderer()` method is called when the app initializes the audio renderer. The `NoiseAudioDevice` implementation of this method instantiates a new File object, to which the the app will write audio data:

```java
@Override
public boolean initRenderer() {
    rendererBuffer = ByteBuffer.allocateDirect(SAMPLING_RATE * 2); // Each sample has 2 bytes
    File documentsDirectory = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOCUMENTS);
    rendererFile = new File(documentsDirectory, "output.raw");

    if (!rendererFile.exists()) {
        try {
            rendererFile.getParentFile().mkdirs();
            rendererFile.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    return true;
}
```

The `BaseAudioDevice.startRendering()` method is called when the audio device should start rendering (playing back) audio from subscribed streams. The `NoiseAudioDevice` implementation of this method starts the `capturer` thread to be run in the queue after 1 second:

```java
    @Override
    public boolean startRenderer() {
        rendererStarted = true;
        rendererHandler.postDelayed(renderer, rendererIntervalMillis);
        return true;
    }
```

The `renderer` thread gets 1 second worth of audio from the audio bus by calling the `readRenderData()` method of the `AudioBus` object. It then writes the audio data to the file (for sample purposes). And, if the audio device is still being used to render audio samples, it sets a timer to run the `rendererHandler` thread again after 0.1 seconds:

```java
private Handler rendererHandler;

private Runnable renderer = new Runnable() {
    @Override
    public void run() {
        rendererBuffer.clear();
        getAudioBus().readRenderData(rendererBuffer, SAMPLING_RATE);

        try {
            FileOutputStream stream = new FileOutputStream(rendererFile);
            stream.write(rendererBuffer.array());
            stream.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        if (rendererStarted && !audioDriverPaused) {
            rendererHandler.postDelayed(renderer, rendererIntervalMillis);
        }
    }
};
```

This example is intentionally for instructional purposes -- it writes the audio data to a file. In a more practical use of a custom audio driver, you could use the custom audio driver to play back audio to a Bluetooth device or to process audio before playing it back.
