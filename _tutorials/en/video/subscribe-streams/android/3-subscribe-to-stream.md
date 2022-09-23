---
title: Subscribe to a stream
description: Learn how to subscribe to a Vonage Video API stream in your Android application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Subscribing to a stream

To subscribe to a stream, first instantiate a Subscriber.Builder object by calling the `Subscriber.Builder(Context context, Stream stream)` constructor. Pass in the Android application context for the Subscriber and the Stream object. Call the `build()` method to create the Subscriber object. Then call the `subscribe()` method of the Session object to start subscribing to the stream:

```java
mSubscriber = new Subscriber.Builder(context, stream)
    .build();
mSession.subscribe(mSubscriber);
```

The `SubscriberKit.SubscriberListener.onConnected(SubscriberKit subscriber)` method is called when the app starts receiving the subscriber's stream. At this point, you can add the subscriber's view (returned by the `getView()` method of the Subscriber object) as a subview of an android.view.ViewGroup object to display it in the app:

```java
@Override
public void onConnected(subscriber) {
    // mViewContainer is an Android View
    RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(
            getResources().getDisplayMetrics().widthPixels, getResources()
                    .getDisplayMetrics().heightPixels);
    mViewContainer.addView(mSubscriber.getView(), layoutParams);
}
```

## Unsubscribing from a stream

To stop playing a stream you are subscribed to, call the `Session.unsubscribe(Subscriber subscriber)` method:

```java
mSession.unsubscribe(mSubscriber);
```

The Subscriber is disconnected, and its view is removed from its superview.
