---
title:  Subscribing to Other Client Streams
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Subscribing to Other Client Streams

We want clients to be able to **subscribe** to (or view) other clients’ streams in the session:

* Modify the implementation of the `Session_StreamReceived()` method to include code to subscribe to other clients’ streams the session:

```csharp
private void Session_StreamReceived(object sender, Session.StreamEventArgs e)
{
    Subscriber subscriber = new Subscriber(Context.Instance, e.Stream, SubscriberVideo);
    Session.Subscribe(subscriber);
}
```

When another client publishes a stream to a session, the `Session.StreamReceived` message is sent and this method is called. A Stream object, defined in the Vonage Video Windows SDK, is passed into the event handler. It represents an audio-video stream in the session.

The code initializes an instance of the Subscriber class, defined in the Vonage Video Windows SDK. The Subscriber class defines an object that a client uses to subscribe to (view) streams published by other clients.

The `Subscriber()` constructor takes three parameters:

* The Windows application context.
* The Stream object.
* The renderer for the subscriber object. In this app, the renderer is the `SubscriberVideo` object, defined in the MainWindow.xaml file.
