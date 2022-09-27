---
title: Publishing a Stream to the Session
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Publishing a Stream to the Session

When the app connects to the Vonage Video session, we want it to publish an audio-video stream to the session, using the camera and microphone:

1. Add a `Publisher` member variable to the MainWindow class (after the declaration of the `Session` member variable):

```csharp
Publisher Publisher; 
```

The Publisher class is defined in the Vonage Video Windows SDK.

2. Modify the `MainWindow()` constructor to include code to initialize a video capturer for the publisher and use that video capturer in a Publisher object:

```csharp
Publisher = new Publisher(Context.Instance, renderer: PublisherVideo);
```

The code uses the `Publisher()` constructor to instantiate a Publisher object. Two parameters are passed into the constructor: the Windows application context and the video renderer (defined in the MainApplication.xaml file).

3. Modify the `Session_Connected()` method to include code to publish a stream to the session:

```csharp
private void Session_Connected(object sender, System.EventArgs e)
{
    Session.Publish(Publisher);
}
```

When the application connects to the session (and the `SessionConnected` event is raised) the `Session_Connected` event handler calls the `Session.Publish()` method, passing in the Publisher object. This causes the app to publish an audio-video stream to the Vonage Video session, using the video capturer's microphone and camera as the audio source and video source.

Debug your application. The app displays the local video preview of the publisher and, when the app successfully connects to the Vonage Video session, it publishes a stream to the session.

>_Note:_ This application uses the default video capturer, which uses the system's default camera and microphone as the video and audio source for the published stream.

>You can implement custom video capturer and video renderers by creating classes that implement the IVideoCapturer and IVideoRenderer interfaces, defined in the Vonage Video Windows SDK. 

>For sample code, see the CustomVideoRenderer and ScreenSharing sample applications in the [opentok-windows-sdk-samples](https://github.com/opentok/opentok-windows-sdk-samples) repo on GitHub.

