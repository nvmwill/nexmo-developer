---
title: Screen Sharing
description: Use the Vonage Video API to do screen sharing between users of your Windows application. Learn how to get screen sharing working by publishing a video stream of your screen others can view.
product: video
---

# Screen Sharing

You can publish a stream that uses a video view of your screen (instead of a camera) as the source.

A client connected to the session can subscribe to the stream (and view it) as they would subscribe to a stream that uses a camera as the source.

This topic includes the following sections:

* [Publishing a Stream with a Screen-Sharing Source](#publishing-a-stream-with-a-screen-sharing-source)
* [Determining the Video Type ("screen" or "camera") for a Stream](#determining-the-video-type-screen-or-camera-for-a-stream)
* [Subscribing to Screen-Sharing Streams](#subscribing-to-screen-sharing-streams)

## Publishing a Stream with a Screen-Sharing Source

To use the device's screen, instead of a camera, as the video source, you will need to implement a [custom video capturer](/video/tutorials/audio-video/video/audio-video/windows/2-video-settings/windows#using-a-custom-video-capturer).

Here is an example that defines a custom video capturer to implement screen sharing (using the screen instead of a camera as the video source):

```csharp
public class ScreenSharingCapturer : IVideoCapturer
{
    System.Threading.Timer timer;
    IVideoFrameConsumer frameConsumer;
    const int WIDTH = 640;
    const int HEIGHT = 480;
    const int FPS = 30;

    public void Init(IVideoFrameConsumer frameConsumer)
    {
        this.frameConsumer = frameConsumer;
    }

    public void Start()
    {
        timer = new System.Threading.Timer((Object stateInfo) =>
        {
            using (Bitmap bitmap = new Bitmap(WIDTH, HEIGHT, System.Drawing.Imaging.PixelFormat.Format32bppArgb))
            {
                using (Graphics graphics = Graphics.FromImage(bitmap as Image))
                {
                    graphics.CopyFromScreen(0, 0, 0, 0, new Size(WIDTH, HEIGHT), CopyPixelOperation.SourceCopy);
                }
                using (var frame = OpenTok.VideoFrame.CreateYuv420pFrameFromBitmap(bitmap))
                {
                    frameConsumer.Consume(frame);
                }
            }

        }, null, 0, 1000 / FPS);
    }

    public void Stop()
    {
        if (timer != null)
        {
            using (var timerDisposed = new ManualResetEvent(false))
            {
                timer.Dispose(timerDisposed);
                timerDisposed.WaitOne();
            }
        }
        timer = null;
    }

    public void Destroy()
    {
    }

    public VideoCaptureSettings GetCaptureSettings()
    {
        VideoCaptureSettings settings = new VideoCaptureSettings();
        settings.Width = WIDTH;
        settings.Height = HEIGHT;
        settings.Fps = FPS;
        settings.MirrorOnLocalRender = false;
        settings.PixelFormat = PixelFormat.FormatYuv420p;

        return settings;
    }
}
```

Set the `VideoSourceType` property of the Publisher object to `OpenTok.VideoSourceType.Screen`. This flags the published stream as having a screen-sharing video source (instead of a camera).

By default, [scalable video](/video/guides/scalable-video) is disabled for screen-sharing streams. You can enable scalable video for screen-sharing streams using the [Publisher.Builder.ScalableScreenshare](/sdk/stitch/video-windows-reference/class_open_tok_1_1_publisher_1_1_builder.html#aa4e5d1436b5f758f3e8ec37a10e3bc25) property. 

_Note:_ scalable video for screen-sharing streams is a _beta_ feature.

## Determining the Video Type ("screen" or "camera") for a Stream

The Stream object contains a `VideoSourceType` property. This can be set to one of the following values, defined in the `OpenTok.VideoSourceType` enum:

* `Camera` — a standard video stream that uses a camera as the video source
* `Screen` — a screen sharing video stream
* `Custom` — a stream published by a web client using an HTML VideoTrack element as the video source

## Subscribing to Screen-Sharing Streams

You can subscribe to a stream that uses a screen-sharing video source in the same way that you subscribe to a stream that uses a camera as the source. See [Subscribing to streams](/video/tutorials/subscribe-streams).
