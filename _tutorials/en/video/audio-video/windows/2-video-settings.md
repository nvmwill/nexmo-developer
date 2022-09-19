---
title: Adjusting video settings
description: Learn more about manipulating audio and video of Vonage Video API streams for your Windows application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Selecting the camera used by a publisher

Call the `VideoCapturer.EnumerateDevices` to get a list of VideoDevice objects, representing the video devices (usually cameras) available on the system. You can then use one of the `CreateVideoCapturer()` methods of a VideoDevice object to create a video capturer that uses the device as the video source. You can then use that video capturer when instantiating a Publisher object:

```c#
var devices = VideoCapturer.EnumerateDevices();
var selectedDevice = devices[0];
capturer = selectedDevice.CreateVideoCapturer(VideoCapturer.Resolution.High);
publisher = new Publisher(Context.Instance, renderer: publisherVideo, capturer: capturer);
```

The VideoDevice class includes `Name` and `Id` properties to identify the video device.

## Mirroring the local display of a publisher's video

You can set the `MirrorOnLocalRender` property of the VideoCaptureSettings object to have the publisher's locally rendered video mirrored (`true`) or not (`false`). Set this property in the implementation of the `GetCaptureSettings()` method of the custom video capturer for the Publisher object.

This setting only affects the rendered video in the publisher's client application. It has no effect on the video in subscribing clients.

## Switching the audio source used by publishers

You can change the audio input source (microphone) used by publishers. Call the static [AudioDevice.EnumerateInputAudioDevices()](/sdk/stitch/video-windows-reference/class_open_tok_1_1_audio_device.html) method to get a list of AudioDevice.InputAudioDevice objects, representing available input devices. Call the [AudioDevice.SetInputAudioDevice(audioInput)](/sdk/stitch/video-windows-reference/class_open_tok_1_1_audio_device.html) method to set the audio input device used by publishers.

## Setting the resolution and frame rate for a video

You can set the resolution and frame rate for a publisher's stream by configuring the `VideoCapturer` object you use when you [instantiate the Publisher object](/video/tutorials/publish-streams/introduction/windows).

There a a number of ways to instantiate a `VideoCapturer` object. One is to call the `OpenTok.VideoCapturer.EnumerateDevices()` method to obtain a list of available video devices. Then use one of `CreateVideoCapturer()` methods of the device you select to instantiate a `VideoCapturer` object. For example, the following code creates a Publisher that uses the default system video capturer with the resolution set to 720p (`VideoCapturer.Resolution.High`) and the frame rate set to 30 frames per second:

```c#
var devices = VideoCapturer.EnumerateDevices();
var selectedDevice = devices[0];
capturer = selectedDevice.CreateVideoCapturer(VideoCapturer.Resolution.High,
                VideoCapturer.VideoCapturer.FrameRate.Fps30);
publisher = new Publisher(Context.Instance, renderer: publisherVideoRenderer, capturer: capturer);
```

If the selected video device does not support the selected resolution or frame rate, the video capturer will use the closest available settings.

Note that in sessions that use the Vonage Video Media Router (sessions with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to routed), lowering the frame rate proportionally reduces the bandwidth the stream uses. However, in sessions that have the media mode set to relayed, lowering the frame rate does not reduce the stream's bandwidth.

## Using a custom video capturer

Use VideoCapturer.EnumerateDevices() to get a list of available video devices (cameras). Use one of the `CreateVideoCapturer()` methods of the VideoDevice class to instantiate a VideoCapturer object based on the video device.

The Vonage Video Windows SDK includes a IVideoCapturer interface that you can use to define custom video capturer. Create custom classes that implements the IVideoCapturer interface to create a custom video capturer. Pass an instance of the custom video capturer class into the `Publisher()`instantiate the Publisher object.

The Vonage Video Windows SDK calls the `Start(IVideoFrameConsumer frameConsumer)` method of the video capturer object to start capturing video from the custom video capturer. The SDK includes a IVideoFrameConsumer interface that define the video frame consumer for a custom capturer.

The Vonage Video Windows SDK calls the `Consume(VideoFrame frame)` method of the custom video frame consumer object when there is a new video frame to render. The VideoFrame class, defined in the Vonage Video Windows SDK, includes a VideoFrame class represents the video frame.

<!-- OPT-TODO: You can use a custom video capturer to publish a screen-sharing stream. For more information, and to see a code example, see [Screen-sharing](/developer/guides/screen-sharing/windows/). -->

You can also use a [custom video renderer](/video/tutorials/video-ui-customization/introduction/windows) for videos.
