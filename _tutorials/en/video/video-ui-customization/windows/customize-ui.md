---
title: Customizing the UI
description: Learn how to customize the UI of your Vonage Video API videos for your Windows application. You can set the initial dimensions, resize, reposition, and more.
product: video
---

# Customizing the user interface - Windows

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

You can specify the name of the publisher by calling the `name()` method of the Publisher.Builder object when you [instantiate the Publisher object](/video/tutorials/publish-streams/introduction/windows):

```c#
publisher = new Publisher(Context.Instance,
    renderer: publisherVideoRenderer,
    name: "Bob's video",
    capturer: capturer);
```

You can use this name to identify the client publishing the stream. The Stream class has a `Name` property. When you [subscribe to a stream](/video/tutorials/subscribe-streams/introduction/windows), you can display this name in a user interface element.

## Adding a mute button for a publisher

There is no default user interface element to mute the publisher's microphone. However, you can add an element, such as a button, that sets the `PublishAudio` of the Publisher object when the user clicks it. Set the property to `false` to mute the publisher:

```c#
publisher.PublishAudio = false;
```

Set the property to `true` to publish audio.

```c#
publisher.PublishAudio = true;
```

## Adding a mute button for a subscriber

There is no default user interface element to mute the subscriber's audio. However, you can add an element, such as a button, that sets the `SubscribeToAudio` of the Subscriber object when the user clicks it. Set the property to `false` to mute the audio:

```c#
subscriber.SubscribeToAudio = false;
```

Set the property to `true` to enable audio playback (if the stream has audio):

```c#
subscriber.SubscribeToAudio = true;
```

## Adding a button to toggle the publisher's camera

There is no default user interface element to toggle the camera used by the publisher. However, you can add and element, such as a button, that sets the `VideoCapturer` property of the Publisher object:

```c#
publisher.VideoCapturer = newCapturer;
```

For more information, see [Using a custom video capturer](/video/tutorials/audio-video/introduction/windows).

## Adjusting user interface when video is enabled or disabled

When a subscriber's video is disabled, the Subscriber object sends a `VideoDisabled` event. When this occurs, you can add a user interface element (such as an icon) to indicate that the video was disabled:

```c#
subscriber.VideoDisabled += Subscriber_VideoDisabled;

private void Subscriber_VideoDisabled(object sender, EventArgs e) {
    // Display the video disabled indicator
}
```

When a subscriber's video is reenabled, the Subscriber object sends a `VideoEnabled` event. When this occurs, you may remove a user interface element (such as an icon) that indicate that the video is reenabled:

```c#
subscriber.VideoEnabled += Subscriber_VideoEnabled;

private void Subscriber_VideoEnabled(object sender, EventArgs e) {
    // Display the video disabled indicator
}
```

In sessions that use the [Vonage Video Media Router](/video/guides/create-session#the-media-router-and-media-modes) (sessions with the media mode set to routed), the Subscribe may also send the following events:

* `VideoDisableWarning` — The Vonage Video Media Router has determined that the stream quality has degraded and the video will be disabled if the quality degrades further.
* `VideoDisableWarningLifted` — The Vonage Video Media Router has determined that the stream quality has improved to the point at which the video being disabled is not an immediate risk.

You may also want to display and remove a user interface notification (such as an icon) when these events are sent.

## Displaying an indicator element when a session is being archived

When a archive of a session starts recording (or if you connect to a session that is being recorded), the Session object sends an `ArchiveStarted` event. When the recording stops the Session object sends an `ArchiveStopped` event. You can add a user interface element, such as an icon displayed in a publisher view, to indicate that a video is being recorded:

```c#
session.ArchiveStarted += Session_ArchiveStarted;
session.ArchiveStopped += Session_ArchiveStopped;

private void Session_ArchiveStarted(object sender, EventArgs e) {
    // Display the archive indicator
}

private void Session_ArchiveStopped(object sender, EventArgs e) {
    // Hide the archive indicator
}
```

## Adjusting user interface based on audio levels

The `Subscriber.AudioLevel` and `Publisher.AudioLevel` events are sent on a regular interval with the audio level of the subscriber and publisher. You can use the `AudioLevel` property of the event arguments to update the display in an audio level meter:

```c#
@Override
publisher.AudioLevel += Publisher_AudioLevel;
subscriber.AudioLevel += Subscriber_AudioLevel;

private void Publisher_AudioLevel(object sender, EventArgs e) {
    // Display the audio level based on e.AudioLevel
}

private void Subscriber_AudioLevel(object sender, EventArgs e) {
    // Display the audio level based on e.AudioLevel
}
```

## Using a custom video renderer

By default, publishers use a default video renderer for Windows Presentation Foundation, which is defined by the Vonage Video Windows SDK.

You can also specify a renderer for the video by creating a class that implements the IVideoRenderer interface. The interface includes a `RenderFrame(frame)` method which is called when a new video frame is available. In your implementation of this method, use the frame object passed into the method to create an image to render. Also, at the end of your implementation of this method, be sure to call the `Dispose()` method of the `frame` object, to prevent memory leaks.

When you instantiate a Publisher or Subscriber object, you can pass the custom video renderer object into the `Publisher()` or `Subscriber()` constructor (as the `renderer` parameter).
