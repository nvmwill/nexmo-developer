---
title: Exploring the Code
description: Follow this tutorial to add screen sharing to your mobile application using the Vonage Video API.
product: video
---

## Exploring the Code

The `MainActivity` class uses `WebView` object as the source for the screen-sharing video of the published stream.

In the `initializePublisher()` method of the `MainActivity` class, after creating a Publisher.Builder object the code calls the `capturer()` method of the `Publisher.Builder` object, passing in a `ScreenSharingCapturer` object as a parameter:

```java
ScreenSharingCapturer screenSharingCapturer = new ScreenSharingCapturer(MainActivity.this, webViewContainer);

publisher = new Publisher.Builder(MainActivity.this)
        .capturer(screenSharingCapturer)
        .build();
```

`ScreenSharingCapturer` is a custom class that extends the `BaseVideoCapturer` class (defined in the Vonage Video SDK). This class lets you define a custom video capturer to be used by a Vonage Video publisher. The constructor of the `ScreenSharingCapturer` class is passed an Android View object, which the capturer will use as the source for the video.

The `getCaptureSettings()` method initializes capture settings to be used by the custom video capturer:

```java
@Override
public CaptureSettings getCaptureSettings() {

    CaptureSettings captureSettings = new CaptureSettings();
    captureSettings.fps = fps;
    captureSettings.width = width;
    captureSettings.height = height;
    captureSettings.format = ARGB;
    return captureSettings;
}
```

The `startCapture()` method starts the `frameProducer` thread after 1/15 second:

```java
@Override
public int startCapture() {
    capturing = true;

    handler.postDelayed(newFrame, 1000 / fps);
    return 0;
}
```

The `frameProducer` thread gets a `Bitmap` representation of the `contentView`object (the `WebView`), writes its pixels to a buffer, and then calls the `provideIntArrayFrame()` method, passing in that buffer as a parameter:

```java
private Runnable newFrame = new Runnable() {
    @Override
    public void run() {
        if (capturing) {
            int width = contentView.getWidth();
            int height = contentView.getHeight();

            if (frame == null ||
                    ScreenSharingCapturer.this.width != width ||
                    ScreenSharingCapturer.this.height != height) {

                ScreenSharingCapturer.this.width = width;
                ScreenSharingCapturer.this.height = height;

                if (bmp != null) {
                    bmp.recycle();
                    bmp = null;
                }

                bmp = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);

                canvas = new Canvas(bmp);
                frame = new int[width * height];
            }
            canvas.saveLayer(0, 0, width, height, null);
            canvas.translate(-contentView.getScrollX(), - contentView.getScrollY());
            contentView.draw(canvas);

            bmp.getPixels(frame, 0, width, 0, 0, width, height);

            provideIntArrayFrame(frame, ARGB, width, height, 0, false);

            canvas.restore();

            handler.postDelayed(newFrame, 1000 / fps);

        }
    }
};
```

The `provideIntArrayFrame<()/code>` method, defined by the `BaseVideoCapturer` class sends an integer array of data to the publisher, to be used for the next video frame published.

If the publisher is still capturing video, the thread starts again after another 1/15 of a second, so that the capturer continues to supply the publisher with new video frames to publish.
