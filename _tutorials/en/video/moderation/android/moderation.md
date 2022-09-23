---
title: Moderation - Android
description: Learn how to set up moderation on your application that uses the Vonage Video API. With moderator privileges, you can force partipcants to disconnect from the session, or stop publishing to the session.
product: video
navigation-weight:
---

# Moderation - Android

When you [connect to a session](/video/tutorials/create-session) with a token that includes moderator privileges, you can force other clients to mute their audio:

* [Checking for moderation privileges](#checking-for-moderation-privileges)
* [Muting the audio of streams in a session](#muting-the-audio-of-streams-in-a-session)

## Checking for Moderation Privileges

Once you have connected to a session, you can check if the client can moderate. Check the value of the `canForceMute` property of the object returned by `Session.getCapabilities()`. If it is set to `true`, the client can moderate:

```java
if (session.getCapabilities().canForceMute) {
    // The client can forceMute. See the next section.
} else {
    // The client cannot moderate.
}
```

## Muting the Audio of Streams in a Session

Moderators can force all clients or a publisher of a specific stream to mute their published audio.

To force a publisher of a specific stream to mute its audio, call the `forceMuteStream()` method of the Session object, passing in the Stream object corresponding to the stream to be muted:

```java
mSession.forceMuteStream(mStream);
```

When the call to the `Session.forceMuteStream()` method fails, the `Session.SessionListener.onError()` method is called. For example, if the client does not have moderation privileges, the `code` parameter of the `OpentokError` object passed into this method is set to `SessionUnableToForceMute`. In this context, success indicates that the options passed into the method are valid and the request to mute the stream was sent. It does not guarantee that the request was successfully acted upon.

Moderators can also force all streams (except for an optional list of streams) in a session to mute published audio. Create an array of excluded streams:

```java
List<com.opentok.android.Stream> mExcludedStreams = new ArrayList<com.opentok.android.Stream>();
mExcludedStreams.add(stream1);
mExcludedStreams.add(stream2);
```

Then call the `forceMuteAll()` method of the Session object, passing in the excluded stream array:

```java
mSession.forceMuteAll(mExcludedStreams);
```

A stream published by the moderator calling the `forceMuteAll()` method is muted along with other streams in the session, unless you add the moderator's stream (or streams) to the excluded streams list.

If you leave out the `excludedStreams` parameter, all streams in the session (including those of the moderator) will stop publishing audio:

```java
mSession.forceMuteAll();
```

Also, any streams that are published after the call to the `forceMuteAll()` method are published with audio muted. You can remove the mute state of a session by calling the `disableForceMute()` method of the Session object:

```java
mSession.disableForceMute();
```

After you call the `Session.disableForceMute()` method, new streams published to the session will no longer have audio muted.

You can get references to Stream objects when the `onStreamReceived(Session session, Stream stream)` of the `Session.SessionListener` object is called. See [Detecting streams in a session](/video/tutorials/subscribe-streams/video/subscribe-streams/javascript/1-detect-stream-created/android). You can also get a Stream object from the `getStream()` method of a Publisher or Subscriber object.

When the stream is muted as a result of one of these methods (or from a [force mute stream call in another client SDK](/video/tutorials/video-moderation/video/moderation/js/moderation/android#muting-the-audio-of-streams-in-a-session)), in each client publishing a muted stream, the `onMuteForced(PublisherKit publisher, MuteForcedInfo info)` method of the `PublisherKit.MuteListener` object is called.

Similarly, in response to a call to the `Session.forceMuteAll()` method (or to a [force mute all call in another client SDK](/video/tutorials/video-moderation/video/moderation/js/moderation/android#muting-the-audio-of-streams-in-a-session)), `onMuteForced(Session session, MuteForcedInfo info)` method of the `Session.MuteListener` object is called in each client connected to the session, and the `active` property of the MuteForcedInfo object passed in is set to `true`.

And in response to a call to the `Session.disableForceMute()` method (or to a [disable force mute call in another client SDK](/video/tutorials/video-moderation/video/moderation/js/moderation/android#muting-the-audio-of-streams-in-a-session)), the `onMuteForced(Session session, MuteForcedInfo info)` method of the `Session.MuteListener` object in each client connected to the session, and the `active` property of the MuteForcedInfo object passed in is set to `false`.
