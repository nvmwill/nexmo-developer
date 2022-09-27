---
title: Exploring the Code
description: Add custom video capturing to your application using the Vonage Video API.
product: video
---

## Exploring the Code

In this example, the app uses a custom video capturer to mirror a video image. This is done to illustrate the basic principals of setting up a custom video capturer.

`MirrorVideoCapturer` is a custom class that extends the `BaseVideoCapturer` class (defined in the Vonage Video Android SDK). The `BaseVideoCapturer` class lets you define a custom video capturer to be used by a Vonage Video publisher:

```java
publisher = new Publisher.Builder(MainActivity.this)
    .capturer(new MirrorVideoCapturer(MainActivity.this))
    .build();
```

The `getCaptureSettings()` method provides settings used by the custom video capturer:

```java
@Override
public synchronized CaptureSettings getCaptureSettings() {
    CaptureSettings captureSettings = new CaptureSettings();
    captureSettings.fps = desiredFps;
    captureSettings.width = (null != cameraFrame) ? cameraFrame.getWidth() : 0;
    captureSettings.height = (null != cameraFrame) ? cameraFrame.getHeight() : 0;
    captureSettings.format = BaseVideoCapturer.NV21;
    captureSettings.expectedDelay = 0;
    return captureSettings;
}
```

The `BaseVideoCapturer.CaptureSetting` class (which defines the `capturerSettings` property) is defined by the Vonage Video Android SDK. In this sample code, the format of the video capturer is set to use NV21 as the pixel format, with a specific number of frames per second, a specific height, and a specific width.

The `BaseVideoCapturer startCapture()` method is called when a publisher starts capturing video to be sent as a stream to the session. This will occur after the `Session.publish(publisher)` method is called:

```java
@Override
public synchronized int startCapture() {
    Log.d(TAG,"startCapture enter (cameraState: "+ cameraState +")");

    if (null != camera && CameraState.OPEN == cameraState) {
        return startCameraCapture();
    } else if (CameraState.SETUP == cameraState) {
        Log.d(TAG,"camera not yet ready, queuing the start until camera is opened");
        executeAfterCameraOpened = () -> startCameraCapture();
    } else {
        throw new Camera2Exception("Start Capture called before init successfully completed");
    }

    Log.d(TAG,"startCapture exit");

    return 0;
}
```
