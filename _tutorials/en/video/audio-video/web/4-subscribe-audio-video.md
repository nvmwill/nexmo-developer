---
title: Subscribing to audio or video only - Web
description: Learn more about manipulating audio and video of Vonage Video API streams for your web application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Subscribing to audio or video only

When you [subscribe to a stream](/video/tutorials/subscribe-streams/introduction/javascript), you can specify whether to initially subscribe to audio or video (if they are available). For example, the following code subscribes to the audio stream only:

```javascript
var options = {subscribeToAudio:true, subscribeToVideo:false};

// Replace stream and replacementElementId with your own values:
subscriber = session.subscribe(stream,
                                replacementElementId,
                                options);
```

After you create a Subscriber object, you toggle audio on or off by calling the `subscribeToAudio()` method of the Subscriber object:

```javascript
subscriber.subscribeToAudio(false); // audio off
subscriber.subscribeToAudio(true); // audio on
```

You toggle video on or off by calling the `subscribeToVideo()` method of the Subscriber object:

```javascript
subscriber.subscribeToVideo(false); // video off
subscriber.subscribeToVideo(true); // video on
```

Note however that you can only subscribe to audio or video if the client publishing the stream includes audio or video. For example, calling `subscribeToVideo(false)` will have no effect if the client publishing the stream is publishing audio only.

## Changing the audio level of a subscriber

When you [subscribe to a stream](/video/tutorials/subscribe-streams/introduction/javascript), you can set the initial volume of the subscriber when you call the `subscribe()` method of the Session object:

```javascript
// Set a value between 0 (silent) and 100 (full volume):
var subOptions = {audioVolume = 10};

// Replace stream and replacementElementId with your own values:
subscriber = session.subscribe(stream,
                                replacementElementId,
                                subOptions);
```

After you create a Subscriber object, you can set its volume by calling its `setAudioVolume()` method, passing in a value from 0 (silent) to 100 (full volume):

```javascript
subscriber.setAudioVolume(0); (silent)
```

Note that the user can also mute the subscriber via user interface controls in the subscriber.
