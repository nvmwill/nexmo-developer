---
title: Moderation
description: Learn how to set up moderation on your application that uses the Vonage Video API. With moderator privileges, you can force partipcants to disconnect from the session, or stop publishing to the session.
product: video
navigation-weight:
---

# Moderation

When you [connect to a session](/video/tutorials/create-session) with a token that includes moderator privileges, you can force other clients to mute their audio:

* [Checking for moderation privileges](#checking-for-moderation-privileges)
* [Muting the audio of streams in a session](#muting-the-audio-of-streams-in-a-session)

## Checking for Moderation Privileges

The ability to force mute streams is reserved for clients that are connected with a token that has been assigned the moderator role. Once you have connected to a session, you can check if the client can moderate by checking the value of the `CanForceMute` property of the `Session.Capabilities` object.

```c
if (session.Capabilities.CanForceMute) {
    // The client can forceMute. See the next section.
} else {
    // The client cannot moderate.
}
```

## Muting the Audio of Streams in a Session

Moderators can force all clients or a publisher of a specific stream to mute their published audio.

To force a publisher of a specific stream to mute its audio, call the `forceMuteStream()` method of the Session object, passing in the Stream object corresponding to the stream to be muted:

```c
session.ForceMuteStream(stream);
```

When the call to the `Session.ForceMuteStream()` method fails, the Session object sends the `Error` event. For example, if the client does not have moderation privileges, the `ErrorCode` parameter passed in with the ErrorEventArgs object is set to `SessionUnableToForceMute`. In this context, success indicates that the options passed into the method are valid and the request to mute the stream was sent. It does not guarantee that the request was successfully acted upon.

Moderators can also force all streams (except for an optional array of streams) in a session to mute published audio. Call the `ForceMuteAll()` method of the Session object, passing in an enumeration of excluded streams that you want to exclude from muting:

```c
session.ForceMuteAll(excludedStreams);
```

A stream published by the moderator calling the `ForceMuteAll()` method is muted along with other streams in the session, unless you add the moderator's stream (or streams) to the excluded streams array.

If you leave out the `excludedStreams` parameter, all streams in the session (including those of the moderator) will stop publishing audio:

```c
session.ForceMuteAll();
```

Also, any streams that are published after the call to the `Session.ForceMuteAll()` method are published with audio muted. You can remove the mute state of a session by calling the `Session.DisableForceMute()`:

```c
session.DisableForceMute();
```

After you call the `Session.DisableForceMute()` method, new streams published to the session will no longer have audio muted.

You can get references to Stream objects when Session object sends the `StreamReceived` event, which includes a Stream argument. See [Detecting streams in a session](/video/tutorials/subscribe-streams/video/subscribe-streams/windows/1-detect-stream-created/windows). You can also get a Stream object from the `Stream` property of a Publisher or Subscriber object.

When the stream is muted as a result of one of these methods (or from a [force mute stream call in another client SDK](/video/tutorials/video-moderation/video/moderation/js/moderation/javascript#muting-the-audio-of-streams-in-a-session)), in each client publishing a muted stream, Publisher objects send `MuteForced` events.

Similarly, in response to a call to the `Session.ForceMuteAll()` method (or to a [force mute all call in another client SDK](/video/tutorials/video-moderation/video/moderation/js/moderation/javascript#muting-the-audio-of-streams-in-a-session)), the Session object sends a `MuteForced` event in each client connected to the session, and the `IsActive` property of the MuteForcedEventArgs object is set to `true`.
