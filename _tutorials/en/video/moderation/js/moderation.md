---
title: Moderation
description: Learn how to set up moderation on your application that uses the Vonage Video API. With moderator privileges, you can force partipcants to disconnect from the session, or stop publishing to the session.
product: video
navigation-weight:
---

# Moderation

When you [connect to a session](/video/tutorials/create-session) with a token that includes moderator privileges, you can force other clients to disconnect from a session, stop publishing a stream or mute their audio:

* [Checking for moderation privileges](#checking-for-moderation-privileges)
* [Forcing a client to disconnect](#forcing-a-client-to-disconnect)
* [Forcing a client to stop publishing a stream](#forcing-a-client-to-stop-publishing-a-stream)
* [Muting the audio of streams in a session](#muting-the-audio-of-streams-in-a-session)

## Checking for Moderation Privileges

Once you have connected to a session, you can check if the client can moderate. Check the value of the `capabilities.forceDisconnect` or `capabilities.forceUnpublish` property of the `Session` object. If it is set to 1, the client can moderate:

```javascript
if (session.capabilities.forceDisconnect == 1) {
    // The client can forceDisconnect. See the next section.
} else {
    // The client cannot moderate.
}


if (session.capabilities.forceUnpublish == 1) {
    // The client can forceUnpublish.
} else {
    // The client cannot moderate.
}
```

## Forcing a Client to Disconnect

Moderators can force any client to disconnect from the session. To force a client to disconnect, call the `forceDisconnect()` method of the Session object, passing in the Connection object for the client you want to disconnect:

```javascript
session.forceDisconnect(connection);
```

You can get references to Connection objects when the Session object dispatches a `connectionCreated` event. See [Detecting when other clients have connected and disconnected](/video/tutorials/joining-a-session/video/joining-a-session/javascript/detect-client-connect-disconnect/javascript). You can also get the Connection object for any stream from the `connection` property of the Stream object.

## Forcing a Client to Stop Publishing a Stream

Moderators can force any publisher of a stream to stop streaming to the session. To force a stream to stop, call the `forceUnpublish()` method of the Session object, passing in the Stream object that you want to stop:

```javascript
session.forceUnpublish(stream);
```

You can get references to Stream objects when the Session object dispatches a `sessionConnected` event and a `streamCreated` event. See [Getting available streams when connecting to a session](/video/tutorials/subscribe-streams/video/subscribe-streams/javascript/1-detect-stream-created/javascript).

You can also get a Stream object from the `stream` property of a Subscriber object.

## Muting the Audio of Streams in a Session

Moderators can force all clients or a publisher of a specific stream to mute their published audio.

To force a publisher of a specific stream to mute its audio, call the `forceMuteStream()` method of the Session object, passing in the Stream object representing the stream you want to mute:

```javascript
session.forceMuteStream(stream)
    .catch(function() {
    console.log("successfully called.");
    }).catch(function(error) {
    console.log("Error: ", error);
});
```

The `Session.forceMuteStream()` method returns a Promise that is rejected if the call fails. For example, if the client does not have moderation privileges, the Promise is rejected with the `name` property of the Error object set to `"OT_PERMISSION_DENIED"`. In this context, success indicates that the options passed into the method are valid and the request to mute the stream was sent. It does not guarantee that the request was successfully acted upon.

Moderators can also force all streams (except for an optional array of streams) in a session to mute published audio. Call the `forceMuteAll()` method of the Session object, passing an array of streams that you want to exclude from muting:

```javascript
session.forceMuteAll(excludedStreams);
```

A stream published by the moderator calling the `forceMuteAll()` method is muted along with other streams in the session, unless you add the moderator's stream (or streams) to the excluded streams array.

If you leave out the `excludedStreams` parameter, all streams in the session (including those of the moderator) will stop publishing audio:

```javascript
session.forceMuteAll();
```

Also, any streams that are published after the call to the `forceMuteAll()` method are published with audio muted. You can remove the mute state of a session by calling the `disableForceMute()` method of the Session object:

```javascript
session.disableForceMute();
```

After you call the `Session.disableForceMute()` method, new streams published to the session will no longer have audio muted.

You can get references to Stream objects when the Session object dispatches a `sessionConnected` event and a `streamCreated` event. See [Getting available streams when connecting to a session](/video/tutorials/subscribe-streams/video/subscribe-streams/javascript/1-detect-stream-created/javascript).

You can also get a Stream object from the `stream` property of a Subscriber object.

When the stream is muted as a result of one of these methods (or from a [force mute stream call in another client SDK](/video/tutorials/video-moderation/video/moderation/js/moderation/javascript#muting-the-audio-of-streams-in-a-session)), in each client publishing a muted stream, the Publisher object dispatches a `muteForced` event.

Similarly, in response to a call to the `Session.forceMuteAll()` method (or to a [force mute all call in another client SDK](/video/tutorials/video-moderation/video/moderation/js/moderation/javascript#muting-the-audio-of-streams-in-a-session)), the Session object in each client connected to the session dispatches a `muteForced` event, and the `active` property of the event object is set to `true`.

And in response to a call to the `Session.disableForceMute()` method (or to a [disable force mute call in another client SDK](/video/tutorials/video-moderation/video/moderation/js/moderation/javascript#muting-the-audio-of-streams-in-a-session)), the Session object in each client connected to the session dispatches a `muteForced` event, and the `active` property of the event object is set to `false`.
