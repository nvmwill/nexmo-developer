---
title: Initializing an OTPublisher object
description: Learn how to publish Vonage Video API streams in your Windows application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Initializing a Publisher object

A Publisher object is used to capture an audio-video stream from the systems's microphone and camera for use in an Vonage Video session. 

<!-- OPT-TODO: You can also use a Publisher to publish a [screen-sharing](/tutorials/screen-sharing) video stream. -->

You can create a basic Publisher by calling the `Publisher()` constructor, passing in the Windows application instance:

```c#
publisher = new Publisher(Context.Instance);
publisher.Error += Publisher_Error;

private void Publisher_Error(object sender, Publsher.ErrorEventArgs e)
{
    Console.WriteLine("Publisher error:" + e.ErrorCode);
}
```

Pass the Publisher object into the `Session.publish()` method to publish a stream to a session.

By default, the Publisher uses the default video capturer, which uses the system's default microphone and camera as the audio an video source for the published stream. This is defined by the VideoCapturer in the Vonage Video SDK.

You can define a specific video capturer object for the publisher to use. This object captures video from a video source (such as a camera), and it has settings for the video (such as the frame rate and resolution).

You can use the `VideoCapturer.EnumerateDevices()` method to enumerate video capture devices (cameras) on the system. This returns a list of VideoDevice objects. The VideoDevice class includes a number of `CreateVideoCapturer()` methods to instantiate a VideoCapturer object that uses the video device:

* `VideoCapturer.CreateVideoCapturer(format)` — Creates a VideoCapturer object using the settings defined by a VideoFormat object.
* `VideoCapturer.CreateVideoCapturer(width, height, fps)` — Creates a VideoCapturer object with the resolution defined by the `width` and `height` parameters and with the frame rate defined by the `fps` parameter.
* `VideoCapturer.CreateVideoCapturer(resolution, fps)` — Creates a VideoCapturer object with the resolution defined by the `resolution` parameter and with the frame rate defined by the `fps` parameter. The `OpenTok.VideoCapturer.Resolution` enum defines values used by the `resolution` parameter: `Low` (320x240 pixels), `Medium` (640x480 pixels), and `High` (1280x720 pixels)

The video capturer uses the resolution supported on the system closest to the resolution you specify.

By default, publishers use a default video renderer for Windows Presentation Foundation, which is defined by the VideoRenderer class in the Vonage Video Windows SDK. You can also specify a renderer for the video by creating a class that implements the IVideoRenderer interface. You can use a custom video renderer — see [Using a custom video renderer](/video/tutorials/video-ui-customization).

The following code creates a Publisher that uses the default system video capturer with the resolution set to 720p (`VideoCapturer.Resolution.High`) and the frame rate set to 30 frames per second:

```c#
var devices = VideoCapturer.EnumerateDevices();
var selectedDevice = devices[0];
capturer = selectedDevice.CreateVideoCapturer(VideoCapturer.Resolution.High,
                VideoCapturer.VideoCapturer.FrameRate.Fps30);
publisher = new Publisher(Context.Instance, renderer: publisherVideoRenderer, capturer: capturer);
publisher.Error += Publisher_Error;

private void Publisher_Error(object sender, Publsher.ErrorEventArgs e)
{
    Console.WriteLine("Publisher error:" + e.ErrorCode);
}
```

_Note:_ In sessions that use the Vonage Video Media Router (sessions with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to routed), lowering the frame rate proportionally reduces the bandwidth the stream uses. However, in sessions that have the media mode set to relayed, lowering the frame rate does not reduce the stream's bandwidth.

You pass in other optional parameters of the `Publisher()` constructor to define custom settings for the published stream:

* `name` — The name of the publisher video. The `Stream.Name` property for a stream published by this publisher will be set to this value (on all clients).
* `hasAudioTrack` — Whether to include an audio track in the published stream. The default is `true`.
* `hasVideoTrack` — Whether to include an audio track in the published stream. The default is `true`.
* `stereo` — Whether to enable stereo audio in the published stream. The default is `false`. Set this to `true` to publish audio from a stereo microphone.

You can also [change the audio source used by the publisher](/tutorials/audio-video). Or you can create a [custom audio driver](/video/tutorials/audio-video/video/audio-video/linux/2-video-settings/linux#using-a-custom-video-capturer) to be used by all publishers and subscribers.

You can use a custom video capturer to publish a stream with a customized video source — see [Using a custom video capturer](/video/tutorials/audio-video/video/audio-video/linux/2-video-settings/linux#using-a-custom-video-capturer).
 
<!-- OPT-TODO: You can also use the custom video capturer to publish a screen-sharing stream — see [Screen-sharing](/tutorials/screen-sharing). -->

**Note:** The OpenTok.Publisher class and the OpenTok.VideoCapturer implement the System.IDisposable interface. Be sure to call the `Dispose()` method of these objects to release their resources when you no longer need the object (for example, when the Publisher is removed or when the app or window is closing).
