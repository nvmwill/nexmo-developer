---
title: Publishing a stream to the session
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Publishing a stream to the session

When the app connects to the Vonage Video session, we want it to publish an audio-video stream to the session, using the camera and microphone:

1. Add a `publisher` property to the MainActivity class (after the declaration of the `session` property):

```java
private Publisher publisher;
```

The Publisher class is defined in the Vonage Video Android SDK.

2. Modify the implementation of the `SessionListener.onConnected()` method to include code to publish a stream to the session:

```java
@Override
public void onConnected(Session session) {
    Log.d(TAG, "onConnected: Connected to session: " + session.getSessionId());

    publisher = new Publisher.Builder(MainActivity.this).build();
    publisher.setPublisherListener(publisherListener);
    publisher.getRenderer().setStyle(BaseVideoRenderer.STYLE_VIDEO_SCALE, BaseVideoRenderer.STYLE_VIDEO_FILL);
    
    publisherViewContainer.addView(publisher.getView());

    if (publisher.getView() instanceof GLSurfaceView) {
        ((GLSurfaceView) publisher.getView()).setZOrderOnTop(true);
    }

    session.publish(publisher);
}
```

The code above uses `Publisher.Builder()` to instantiate a Publisher object. The constructor takes one parameter: the context associated with this process (although it may be different in a production app).

The `Publisher.setPublisherListener()` method sets the object that will implement the PublisherListener interface. This interface includes callback methods are called in response to publisher-related events.

**Important:** The context you used depends on the specific use case. However usually it is desired for the session to live outside of the Activity (for example, between activities). For production applications, it's convenient to use application context instead of activity context.

The code then passes the Publisher object in as a parameter of the `Session.publish()` method. This method publishes an audio-video stream to the session, using the camera and microphone of the Android device. (Note that in an Android virtual device, the Vonage Video Android SDK uses a test video when publishing a stream).

The Publisher object has a `getView()` returns, which returns an Android View object. This view displays the video captured from the device’s camera. The code adds this view as a subview of the `publisherViewContainer` object.

3. To log events, add a `publisherListener` property to the `sessionListener` of the `MainActivity`:

```java
private PublisherKit.PublisherListener publisherListener = new PublisherKit.PublisherListener() {
    @Override
    public void onStreamCreated(PublisherKit publisherKit, Stream stream) {
        Log.d(TAG, "onStreamCreated: Publisher Stream Created. Own stream " + stream.getStreamId());
    }

    @Override
    public void onStreamDestroyed(PublisherKit publisherKit, Stream stream) {
        Log.d(TAG, "onStreamDestroyed: Publisher Stream Destroyed. Own stream " + stream.getStreamId());
    }

    @Override
    public void onError(PublisherKit publisherKit, OpentokError opentokError) {
        Log.e(TAG, "PublisherKit onError: " + opentokError.getMessage());
    }
};
```

Note that the Publisher class extends the PublisherKit class (also defined by the Vonage Video Android SDK). The PublisherKit class is a base class you can use to create advanced publishers, (such as publishers that use custom video capturers or renderers).

This implements the `PublisherListener` methods:

* `onStreamCreated(publisherKit, stream)` — Called when the publisher starts streaming to the session.
* `onStreamDestroyed(publisherKit, stream)` — Called when the publisher stops streaming to the session.
* `onError(error)` — Called when the client fails in publishing to the session. An `OpentokError` object is passed into the method.
