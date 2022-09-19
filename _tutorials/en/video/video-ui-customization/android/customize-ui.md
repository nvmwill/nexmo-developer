---
title: Customizing the UI
description: Learn how to customize the UI of your Vonage Video API videos for your Android application. You can set the initial dimensions, resize, reposition, and more.
product: video
---

# Customizing the user interface

There are a number of adjustments you can make to customize the Vonage Video user interface:

* [Adding a name for a published stream](#adding-a-name-for-a-published-stream)
* [Adding a mute button for a publisher](#adding-a-mute-button-for-a-publisher)
* [Adding a mute button for a subscriber](#adding-a-mute-button-for-a-subscriber)
* [Adding a button to toggle the publisher's camera](#adding-a-button-to-toggle-the-publishers-camera)
* [Adjusting user interface when video is enabled or disabled](#adjusting-user-interface-when-video-is-enabled-or-disabled)
* [Displaying an indicator element when a session is being archived](#displaying-an-indicator-element-when-a-session-is-being-archived)
* [Adjusting user interface based on audio levels](#adjusting-user-interface-based-on-audio-levels)
* [Using a custom video renderer](#using-a-custom-video-renderer)

## Adding a name for a published stream

You can specify the name of the publisher by calling the `name()` method of the Publisher.Builder object when you [instantiate the Publisher object](/video/tutorials/publish-streams/introduction/android):

```java
mPublisher = new Publisher.Builder(context)
    .name("Bob's video")
    .build();
```

You can use this name to identify the client publishing the stream. The Stream class has a `name` property. When you [subscribe to a stream](/video/tutorials/subscribe-streams/introduction/android/), you can display this name in a user interface element.

## Adding a mute button for a publisher

There is no default user interface element to mute the publisher's microphone. However, you can add an element, such as a button, that calls the `setPublishAudio()` method of the PublisherKit object when the user clicks it. Pass in `false` to mute the publisher:

```java
mPublisher.setPublishAudio(false);
```

Pass in `true` to publish audio.

```java
mPublisher.setPublishAudio(true);
```

## Adding a mute button for a subscriber

There is no default user interface element to mute the subscriber's audio. However, you can add an element, such as a button, that calls the `setSubscribeToAudio()` method of the SubscriberKit object when the user clicks it. Pass in `false` to mute the subscriber

```java
mSubscriber.setSubscribeToAudio(false);
```

Pass in `true` to subscribe to audio (if there is an audio stream):

```java
mSubscriber.setSubscribeToAudio(true);
```

## Adding a button to toggle the publisher's camera

There is no default user interface element to toggle the camera used by the publisher. However, you can add and element, such as a button, that calls the `swapCamera` method of the Publisher object:

```java
mPublisher.swapCamera();
```

Note that the `cameraPosition` property is not available in the PublisherKit class. If you are using the PublisherKit class to [implement a custom video capturer](/video/tutorials/audio-video/introduction/android), you can define the camera used in the custom video capturing code.

## Adjusting user interface when video is enabled or disabled

When a subscriber's video is disabled, the `SubscriberKit.VideoListener.onVideoDisabled(subscriber, reason)` method is called. When this occurs, you can add a user interface element (such as an icon) to indicate that the video was disabled:

```java
@Override
public void onVideoDisabled(SubscriberKit subscriber, String reason) {
    // Display the video disabled indicator
}
```

When a subscriber's video is reenabled, the `SubscriberKit.VideoListener.onVideoEnabled(subscriber, reason)` method is called. When this occurs, you may remove a user interface element (such as an icon) that indicate that the video is reenabled:

```java
@Override
public void onVideoEnabled(SubscriberKit subscriber, String reason) {
    // Display the video disabled indicator
}
```

In sessions that use the [Vonage Video Media Router](/video/guides/create-session#the-media-router-and-media-modes) (sessions with the media mode set to routed), the SubscriberKit.VideoListener may also call the following methods:

* [onVideoDisableWarning(subscriber)](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.VideoListener.html#onVideoDisableWarning(com.opentok.android.SubscriberKit)) — The Vonage Video Media Router has determined that the stream quality has degraded and the video will be disabled if the quality degrades further.
* [onVideoDisableWarningLifted(subscriber)](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.VideoListener.html#onVideoDisableWarningLifted(com.opentok.android.SubscriberKit)) — The Vonage Video Media Router has determined that the stream quality has improved to the point at which the video being disabled is not an immediate risk.

You may also want to display and remove a user interface notification (such as an icon) when these messages are sent.

Note that when you publish a stream, you can prevent it from having its video disabled due to stream quality. Before you publish the stream (by calling the `Session.publish(publisher)` method), call the `setAudioFallbackEnabled(boolean enabled)` method of the Publisher object (or PublisherKit object) and pass in `false`.

## Displaying an indicator element when a session is being archived

When a archive of a session starts recording (or if you connect to a session that is being recorded), the `Session.ArchiveListener.onArchiveStarted(session, name)` method is called. When the recording stops the `Session.ArchiveListener.onArchiveStopped(session, name)` method is called. You can add a user interface element, such as an icon displayed in a publisher view, to indicate that a video is being recorded:

```java
@Override
public void onArchiveStarted(Session session, String id, String name) {
    // Display the archive indicator
}

@Override
public void onArchiveStopped(Session session, String id, String name) {
    // Hide the archive indicator
}
```

# Adjusting user interface based on audio levels

The `SubscriberKit.AudioLevelListener.onAudioLevelUpdated(subscriber, audioLevel)` and `PublisherKit.AudioLevelListener.onAudioLevelUpdated(publsiher, audioLevel)` messages are sent on a regular interval with the audio level of the subscriber and publisher. You can use the `audioLevel` value to update the display in an audio level meter:

```java
@Override
public void onAudioLevelUpdated(
        SubscriberKit subscriber, float audioLevel) {
    // Adjust an audio meter UI element based on the audioLevel value.
}
```

## Using a custom video renderer

The Subscriber and Publisher classes implement a standard video renderer that renders the stream and provides user interface controls for displaying the stream name and muting the microphone or camera. You can use the SubscriberKit and PublisherKit classes to implement a custom video renderer.

The Vonage Video Android SDK includes a BaseVideoRenderer class. Override this class to create a custom video renderer.

After instantiating a PublisherKit object, you can set a custom video renderer by calling the `setRenderer()` method of the PublisherKit object:

```java
mPublisher = new PublisherKit(MyClass.this, "publisher");

// Use a custom video renderer.
// MyVideoRenderer extends BaseVideoRenderer
mRenderer = new MyVideoRenderer();
mPublisher.setRenderer(new mRenderer);
```

The SubscriberKit class also has a `setRenderer()` method.

The `onFrame()` method of the BaseVideoRenderer class is called when a new frame is available:

```java
public void onFrame(Frame frame) {
    // The new frame is available.
}
```

The `frame` is a BaseVideoRenderer.Frame object. This object includes a `getBuffer()` that returns the byte buffer containing the video frame data. You can use this byte buffer to add the video frame image to the publisher's view.

For an example, see the OpenTokVideoRenderer class in the OpenTokHelloWorld sample application.

You can also set up a publisher to use a [custom video capturer](/video/tutorials/audio-video/introduction/android).
