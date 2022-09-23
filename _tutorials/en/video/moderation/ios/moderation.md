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

Once you have connected to a session, you can check if the client can moderate. Check the value of the `capabilities.canForceMute` property of the `OTSession` object. If it is set to `YES`, the client can moderate (and force other clients to mute):

```objective-c
if (session.capabilities.canForceMute) {
  // The client can forceMute. See the next section.
} else {
  // The client cannot moderate.
}
```

## Muting the Audio of Streams in a Session

Moderators can force all clients or a publisher of a specific stream to mute their published audio.

To force a publisher of a specific stream to mute its audio, call the `[OTSession forceMuteStream:options:error:]` method, passing in the OTStream object corresponding to the stream to be muted:

```objective-c
OTError* error = nil;
[session forceMuteStream:stream error:&error];
if (error) {
  NSLog(@"forceMuteStream failed with error: (%@)", error);
}
```

When the call fails, the `error` parameter is set to an OTError object. For example, if the client does not have moderation privileges, the error parameter is set to an OTError object with the `code` property set to `OTSessionUnableToForceMute`. In this context, success indicates that the options passed into the method are valid and the request to mute the stream was sent. It does not guarantee that the request was successfully acted upon.

Moderators can also force all streams (except for an optional array of streams) in a session to mute published audio. Call the `[OTSession forceMuteAll:excludedStreams:error:]` method, passing in an array of OTStream objects corresponding to the streams you want to exclude from muting:

```objective-c
OTError* error = nil;
[session forceMuteAll:excludedStreams error:&error];
if (error) {
  NSLog(@"forceMuteAll failed with error: (%@)", error);
}
```

A stream published by the moderator calling the `[OTSession forceMuteAll:excludedStreams:error:]` method is muted along with other streams in the session, unless you add the moderator's stream (or streams) to the excluded streams array.

If you set the `excludedStreams` parameter to `nil`, all streams in the session (including those of the moderator) will stop publishing audio:

```objective-c
OTError* error = nil;
[session forceMuteAll:nil error:&error];
if (error) {
  NSLog(@"forceMuteAll failed with error: (%@)", error);
}
```

Any streams that are published after the call to the `[OTSession forceMuteAll:excludedStreams:error:]` method are published with audio muted. You can remove the mute state of a session by calling the `[OTSession disableForceMute:error:]` method:

```objective-c
OTError* error = nil;
[session disableForceMute: error:&error];
if (error) {
  NSLog(@"forceMuteAll failed with error: (%@)", error);
}
```

After you call the `[OTSession disableForceMute:error:]` method, new streams published to the session will no longer have audio muted.

You can get references to OTStream objects when the `[OTSessionDelegate:session:streamCreated:]` message is sent. See [Detecting streams in a session](/video/tutorials/subscribe-streams/video/subscribe-streams/swift/1-detect-stream-created/swift). You can also get an OTStream object from the `stream` property of an OTPublisher or OTSubscriber object.

When the stream is muted as a result of one of these methods (or from a [force mute stream call in another client SDK](
/video/tutorials/video-moderation/video/moderation/js/moderation/swift#muting-the-audio-of-streams-in-a-session)), the `[OTPublisherKitDelegate publisher:muteForced:]` message is sent in each client publishing a muted stream.

Similarly, in response to a call to the `[OTSession forceMuteAll:excludedStreams:error:]` method (or to a [force mute all call in another client SDK](
/video/tutorials/video-moderation/video/moderation/js/moderation/swift#muting-the-audio-of-streams-in-a-session)), `[OTSessionDelegate session:muteForced:info]` message is sent in each client connected to the session, and the `active` property of the OTMuteForcedInfo object passed in as the `info` parameter is set to `YES`.

And in response to a call to the `[OTSession disableForceMute:error:]` method (or to a [disable force mute call in another client SDK](
/video/tutorials/video-moderation/video/moderation/js/moderation/swift#muting-the-audio-of-streams-in-a-session)), the `[OTSessionDelegate session:muteForced:info]` message is sent in each client connected to the session, and the `active` property of the OTMuteForcedInfo object passed in as the `info` parameter is set to `NO`.
