---
title: Subscribe to a stream
description: Learn how to subscribe to an Vonage Video API stream in your Windows application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Subscribing to a stream

To subscribe to a stream, first instantiate a Subscriber object by calling the `Subscriber(context, stream, renderer)` constructor. Pass in the Windows application context for the Subscriber, the Stream object, and a video renderer.

The `OpenTok.IVideoRenderer` interface defines the video renderer. The `OpenTok.VideoRenderer` class, included in Vonage Video Windows SDK, renders video to an Windows Presentation Framework control. The VideoRenderer object is a subclass of System.Windows.Controls.Control.

You can add this element to your view hierarchy. Or you can create your own custom video renderer that implements the `OpenTok.IVideoRenderer` interface.

Call the `subscribe()` method of the Session object to start subscribing to the stream:

```c#
VideoRenderer videoRenderer = new VideoRenderer();
// Add the video renderer to the application's view hierarchy.

Subscriber subscriber = new Subscriber(Context.Instance, stream, renderer);
subscriber.Error += Subscriber_Error;
session.subscribe(subscriber);

private void Session_Error(object sender, Subscriber.ErrorEventArgs e)
{
    Console.WriteLine("Subscriber error:" + e.ErrorCode);
}
```

The Subscriber object sends an `Error` event if there is an error in subscribing to the stream. Check the `ErrorCode` property of the arguments passed into the event to see details on why subscribing failed. (The `OpenTok.ErrorCode` enum defines `ErrorCode` values.)

The Subscriber object sends a `Connected` event when the app starts receiving the subscriber's stream.

**Note:** The OpenTok.Subscriber class implements the System.IDisposable interface. Be sure to call the `Dispose()` method of the Subscriber object to release its resources when you no longer need the object (for example, when the Subscriber stops streaming video or when the app or window is closing).

<!-- OPT-TODO: You can create a [custom audio driver](/developer/guides/audio-video/windows/#audio_driver) to be used by all publishers and subscribers. -->

## Unsubscribing from a stream

To stop playing a stream you are subscribed to, call the `Session.Unsubscribe(subscriber)` method:

```c#
session.unsubscribe(subscriber);
```

The Subscriber is disconnected, and its view is removed from its superview.
