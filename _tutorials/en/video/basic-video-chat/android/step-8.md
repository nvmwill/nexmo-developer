---
title: Subscribing to other client streams
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Subscribing to other client streams

We want clients to be able to **subscribe** to (or view) other clients’ streams in the session:

1. Add a `subscriber` property to the MainActivity class (after the declaration of the `publisher` property):

```java
private Subscriber subscriber;
```

The Subscriber class is defined in the Vonage Video Android SDK. It defines an object that a client uses to subscribe to (view) a stream published by another client.

2. Modify the implementation of the `onStreamReceived(session, stream)` method (one of the SessionListener callbacks) to include code to subscribe to other clients’ streams the session:

```java
@Override
    public void onStreamReceived(Session session, Stream stream) {
        Log.d(TAG, "onStreamReceived: New Stream Received " + stream.getStreamId() + " in session: " + session.getSessionId());
    
        if (subscriber == null) {
            subscriber = new Subscriber.Builder(MainActivity.this, stream).build();
            subscriber.getRenderer().setStyle(BaseVideoRenderer.STYLE_VIDEO_SCALE, BaseVideoRenderer.STYLE_VIDEO_FILL);
            subscriber.setSubscriberListener(subscriberListener);
            session.subscribe(subscriber);
            subscriberViewContainer.addView(subscriber.getView());
        }
    }
```

3. To log events Add `subscriberListener` property below `sessionListener` of the `MainActivity`:

```java
SubscriberKit.SubscriberListener subscriberListener = new SubscriberKit.SubscriberListener() {
    @Override
    public void onConnected(SubscriberKit subscriberKit) {
        Log.d(TAG, "onConnected: Subscriber connected. Stream: " + subscriberKit.getStream().getStreamId());
    }

    @Override
    public void onDisconnected(SubscriberKit subscriberKit) {
        Log.d(TAG, "onDisconnected: Subscriber disconnected. Stream: " + subscriberKit.getStream().getStreamId());
    }

    @Override
    public void onError(SubscriberKit subscriberKit, OpentokError opentokError) {
        Log.e(TAG, "SubscriberKit onError: " + opentokError.getMessage());
    }
};
```

When another client publishes a stream to a session, this method is called, and a Stream object is passed in. The Stream class is defined in the Vonage Video Android SDK, and it represents an audio-video stream in the session.

The code initializes an instance of the Subscriber class, defined in the Vonage Video Android SDK. The `Subscriber.Builder()` constructor takes two parameters:

* The Android application context associated with this process.
* The Stream object (for the stream you want to view)

The `Session.subscribe(subscriber)` method subscribes to the stream that was received.

`subscriberViewContainer.addView(subscriber.getView())` places the new subscribed stream's view on the screen.

4. Modify the implementation of the `onStreamDropped(Session session, Stream stream)` method (another one of the SessionListener callbacks):

```java
@Override
public void onStreamDropped(Session session, Stream stream) {
    Log.i(TAG, "Stream Dropped");

    if (subscriber != null) {
        subscriber = null;
        subscriberViewContainer.removeAllViews();
    }
}
```

`subscriberViewContainer.removeAllViews()` removes a subscriber's view once the stream has dropped.
