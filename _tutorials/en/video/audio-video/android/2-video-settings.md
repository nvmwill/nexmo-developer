---
title: Adjusting video settings
description: Learn more about manipulating audio and video of Vonage Video API streams for your Android application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Selecting the camera used by a publisher

You can cycle between cameras used to publish a stream by calling the `cycleCamera()` method of the Publisher object:

```java
mPublisher.cycleCamera();
```

If you are using a custom video capturer, use the [BaseVideoCapturer.CaptureSwitch](/sdk/stitch/video-android-reference/com/opentok/android/BaseVideoCapturer.CaptureSwitch.html) interface to define the behavior of the `Publisher.cycleCamera()` method.

## Mirroring the local display of a Publisher's video

You can set the `mirrorInLocalRender` property of the CaptureSettings object returned by calling the `getCaptureSettings()` method of the `capturer` property of a PublisherKit object. Set this to `true` to have the publisher's locally rendered video mirrored or to `false` to not have it mirrored. You may want to mirror video when using a front-facing camera.

You can also set the `mirrorInLocalRender` property of the CaptureSettings object when creating a custom video capturer

This setting only affects the rendered video in the publisher's client application. It has no effect on the video in subscribing clients.

The built-in capturer of a Publisher has the locally rendered video mirrored for when using a front-facing camera, but not when using a rear-facing camera.

## Detecting when the publisher's camera changes

When the camera used by the Publisher changes, the `changedCamera(Publisher publisher, int newCameraId))` method of the Publisher.CameraListener object is called.

```java
@Override
public void changedCamera(publisher, newCameraId) {
    //The publisher's camera changed.
}
```

## Setting the resolution and frame rate for a video

You can set the resolution and frame rate for a publisher's stream by calling the `resolution()` and `frameRate()` methods of the Publisher.Builder object when you [instantiate the Publisher object](/video/tutorials/publish-streams/introduction/android):

```java
mPublisher = new Publisher.Builder(context)
    .name("Bob's video")
    .resolution(CameraCaptureResolution.HIGH)
    .frameRate(CameraCaptureFrameRate.FPS_30)
    .build();
```

Note that in sessions that use the Vonage Video Media Router (sessions with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to routed), lowering the frame rate proportionally reduces the bandwidth the stream uses. However, in sessions that have the media mode set to relayed, lowering the frame rate does not reduce the stream's bandwidth.

## Using a custom video capturer

The Publisher classes implement a standard video capturer that uses video directly from the device's camera. You can use the PublisherKit classes to implement a custom video capturer.

The Vonage Video Android SDK includes a BaseVideoCapturer class. Override this class to create a custom video capturer. Call the `capturer()` method of the Publisher.Builder object when you [instantiate the Publisher object](/video/tutorials/publish-streams/introduction/android):

```java
// Use a custom video capturer.
// CustomVideoCapturer extends BaseVideoCapturer:
mCapturer = new CustomVideoCapturer();

mPublisher = new Publisher.Builder(context)
    .name("Bob's video")
    .capturer(mCapturer)
    .build();
```

Or, if you are using the PublisherKit class to define a custom publisher implementation, you can set the `capturer` property of a class that extends the PublisherKit class:

```java
// Use a custom video capturer.
// CustomVideoCapturer extends BaseVideoCapturer:
mCapturer = new CustomVideoCapturer();
mPublisher.capturer = mCapturer;
```

The `getCaptureSettings()` method of the BaseVideoCapturer class returns the settings of the video capturer, including the frame rate, width, height, video delay, and video format for the capturer. Your video capturer object can override this method to define your custom video capturer's settings, as in the following:

```java
@Override
public CaptureSettings getCaptureSettings() {
    // Set the preferred capturing size
    configureCaptureSize(640, 480);

    CaptureSettings settings = new CaptureSettings();
    settings.fps = mCaptureFPS;
    settings.width = mCaptureWidth;
    settings.height = mCaptureHeight;
    settings.format = NV21;
    settings.expectedDelay = 0;
    return settings;
}
```

Call the `startCapture()` method of the video capturer object to start capturing video from the custom video capturer.

The BaseVideoCapturer class also includes a `provideByteArrayFrame(byte[] data, int format, int width, int height, int rotation, boolean mirrorX)` and `provideIntArrayFrame(int[] data, int format, int width, int height, int rotation, boolean mirrorX)`.

You call these methods to provide a frame of video as a either a byte array or as an array of integers.

For an example, see the OpenTokVideoCapturer class in the OpenTokHelloWorld sample application.

Use a custom video capturer to publish a screen-sharing stream.

<!-- OPT-TODO: For more information, see [Screen-sharing](/tutorials/screen-sharing/android/). -->

You can also use a [custom video renderer](/video/tutorials/video-ui-customization/android) for videos.
