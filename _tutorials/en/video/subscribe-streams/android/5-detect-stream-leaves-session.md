---
title: Detecting when streams end and a subscriber's video is disabled
description: Learn how to subscribe to an Vonage Video API stream in your Android application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Detecting when streams leave a session

When streams published by other clients leave a session, the `onStreamDropped(Session session, Stream stream)` method of the Session.SessionListener object is called. When a stream is dropped, the view for any Subscriber object for the stream is removed from its superview.

## Detecting when a subscriber's video is disabled

The Vonage Video Media Router stops sending video to the subscriber when it detects that connectivity degrades. The subscriber continues to receive the audio stream, if there is one. The [onVideoDisabled(subscriber, subscriber)](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.VideoListener.html#onVideoDisabled-com.opentok.android.SubscriberKit-java.lang.String-) method of the SubscriberKit.VideoListener object is called when the Vonage Video Media Router stops sending video:

```java
@Override
public void onVideoDisabled(subscriber, reason) {
    // Video is disabled for the subscriber
}
```

The `reason` parameter identifies the reason the subscriber stopped streaming video.

When the Vonage Video Media Router disables the video of a subscriber, you may want to adjust the user interface related to the subscriber.

The [onVideoEnabled(subscriber, reason)](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.VideoListener.html#onVideoEnabled-com.opentok.android.SubscriberKit-java.lang.String-) method of the SubscriberKit.VideoListener object is called when the video resumes:

```java
@Override
public void onVideoEnabled(subscriber, reason) {
// Video is resumes for the subscriber
}
```

The `reason` parameter identifies the reason the subscriber's video resumed.

When you publish a stream, you can prevent it from having its video disabled due to stream quality. Before calling the `Session.publish(publisher)` method, call the `setAudioFallbackEnabled(boolean enabled)` method of the Publisher object (or PublisherKit object) and pass in `false`.
