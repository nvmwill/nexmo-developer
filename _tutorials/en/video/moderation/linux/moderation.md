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

When you [connect to a session](/developer/guides/connect-session/linux/) with a token that includes moderator privileges, you can force other clients to mute their audio. The ability to force mute streams is reserved for clients that are connected with a token that has been assigned the moderator role. Once you have connected to a session, you can check if the client can moderate by calling the `otc_session_get_capabilities()` function passing in the `otc_session` instance. This function returns an `otc_session_capabilities` instance. Check the `force_mute` of the `otc_session_capabilities` instance:

```c
if (otc_session_get_capabilities(session).force_mute) {
  // The client can forceMute. See the next section.
} else {
  // The client cannot moderate.
}
```

## Muting the Audio of Streams in a Session

Moderators can force all clients or a publisher of a specific stream to mute their published audio.

To force a publisher of a specific stream to mute its audio, call the `otc_session_force_mute_stream()` function, passing a pointer to the `otc_session` instance and a the stream ID string for the stream to be muted. This function takes the following parameters:

* `session` — A pointer to the otc_session instance.
* `stream_id_to_mute` — A pointer to the stream ID string for the stream to be muted.

The function returns an `otc_status` instance indicating either error or success.

```c
success = otc_session_force_mute_stream(session, stream_id);
if (success != OTC_SUCCESS) {
  printf("Could not force mute successfully.");
}
```

Moderators can also force all streams (except for an optional array of streams) in a session to mute published audio. Call the `otc_session_force_mute_all()` function. This function takes the following parameters:

* `session` — A pointer to the otc_session instance.
* `excluded_streams_ids` — A pointer to an array of stream IDs for streams you want to exclude from muting. If this parameter is set to nullptr, all the streams will be muted (including those published by the local client).
* `excluded_streams_len` — The length of the excluded stream array.

The function returns an `otc_status` instance indicating either error or success:

```c
success = otc_session_force_mute_all(session, streams, stream_count);
if (success != OTC_SUCCESS) {
  printf("Could not force mute successfully.");
}
```

A stream published by the moderator calling the `otc_session_force_mute_all()` function is muted along with other streams in the session, unless you add the moderator's stream (or streams) to the excluded streams array.

If the `excluded_streams_len` parameter is set to 0, all streams in the session (including those of the moderator) will stop publishing audio.

```c
success = otc_session_force_mute_all(session, nullptr, 0);
if (success != OTC_SUCCESS) {
  printf("Could not force mute successfully.");
}
```

Also, any streams that are published after the call to the `otc_session_force_mute_all()` function are published with audio muted. You can remove the mute state of a session by calling the `otc_session_disable_force_mute(otc_session *session)()` function

```c
success = otc_session_disable_force_mute(session);
  if (success != OTC_SUCCESS) {
    printf("Could not force mute successfully.");
  }
```

After you call the `otc_session_disable_force_mute()` function, new streams published to the session will no longer have audio muted.

You can get references to `otc_stream` instances when the `on_stream_received()` callback function of the `otc_session_callbacks` instance is called. The callback includes a pointer to the `otc_stream` struct representing a stream. Call the `otc_stream_get_id()` function (passing in the pointer to an `otc_stream` instance) to get the stream ID. See [Detecting streams in a session](/video/tutorials/joining-a-session/video/joining-a-session/javascript/detect-client-connect-disconnect/javascript). You can also get an `otc_stream` instance representing a publisher's stream by calling the `otc_publisher_get_stream()` function, passing in the `otc_publisher` instance. You can also get an `otc_stream` instance representing a subscriber's stream by calling the `otc_subscriber_get_stream()` function, passing in the `otc_subscriber` instance.

When the stream is muted as a result of one of these functions (or from a [force mute stream call in another client SDK](/video/tutorials/video-moderation/video/moderation/js/moderation/javascript#muting-the-audio-of-streams-in-a-session)), the `on_mute_forced()` callback function of the `otc_publisher_callbacks` struct is called in each client publishing a muted stream.

Similarly, in response to a call to the `otc_session_force_mute_all()` function (or to a [force mute all call in another client SDK](/video/tutorials/video-moderation/video/moderation/js/moderation/javascript#muting-the-audio-of-streams-in-a-session)), the `on_mute_forced()` callback function of the `otc_session_callbacks` struct in each client connected to the session. and the `active` property of the `otc_on_mute_forced_info` struct passed into the function is set to `true`.

And in response to a call to the `otc_session_disable_force_mute()` function (or to a [disable force mute call in another client SDK](/video/tutorials/video-moderation/video/moderation/js/moderation/javascript#muting-the-audio-of-streams-in-a-session)), the `on_mute_forced()` callback function of the `otc_publisher_callbacks` struct is called in each client connected to the session, and the `active` property of the `otc_on_mute_forced_info` struct passed in set to `false`.
