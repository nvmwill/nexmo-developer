---
title: Managing publishers
description: "Learn how to publish Vonage Video API streams in your web application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream."
product: video
---

## Deleting a Publisher

You can delete a Publisher by calling its `destroy()` method:

```js
publisher.destroy();
```    

Calling the `destroy()` method deletes the Publisher object and removes it from the HTML DOM.

## Getting statistics about a publisher's stream

The [`Publisher.getStats()`](/sdk/stitch/video-js-reference/Publisher.html#getStats) method provides you with an array of objects defining the current audio-video statistics for the publisher. For a publisher in a routed session (one that uses the [OpenTok Media Router](/video/guides/create-session#the-opentok-media-router-and-media-modes)), this array includes one object, defining the statistics for the single audio-media stream that is sent to the OpenTok Media Router. In a relayed session, the array includes an object for each subscriber to the published stream. Each object in the array contains a `stats` property that includes the following properties:

* The total number of audio and video packets sent
* The total number of audio and video packets lost
* The total number of audio and video bytes sent
* The current average video frame rate

Additionally, for a publisher in a relayed session, each object in the array contains the following two properties:

* `connectionId` — The unique ID of the client's connection, which matches the `id` property of the `connection` property of the `connectionCreated` event that the Session object dispatched for the remote client.
* `subscriberId` — The unique ID of the subscriber, which matches the `id` property of the Subscriber object in the subscribing client's app.

These two properties are undefined for a publisher in a routed session.

The following code logs the audio packet loss ratio, the audio bit rate, and the video packet loss ratio, and the video bit rate for the publisher's stream every second:

```js
let prevStats = {};
window.setInterval(() => {
  publisher.getStats((error, statsArray) => {
    if (error) {
      return console.log(error);
    }
    statsArray.forEach(statsObj => {
      if (statsObj.connectionId) {
        let prevStatsObj = prevStats[connectionId];
        console.log('stats for connection', statsObj.connectionId);
      } else {
        prevStatsObj = prevStats;
      }
      const stats = statsObj.stats;
      if (prevStatsObj.video) {
        var videoBitRate = 8 * (stats.video.bytesSent - prevStatsObj.video.bytesSent);
        console.log('video bit rate: ', videoBitRate, 'bps');
        var audioBitRate = 8 * (stats.audio.bytesSent - prevStatsObj.audio.bytesSent);
        console.log('audio bit rate: ', audioBitRate, 'bps');
      }
      if (stats.connectionId) {
        prevStats[connectionId] = stats;
      } else {
        prevStats = stats;
      }
    });
})}, 1000);
```

To get more detailed stream statics, use the [`Publisher.getRtcStatsReport()`](/sdk/stitch/video-js-reference/Publisher.html#getRtcStatsReport) method. It returns a promise that, on success, resolves with an array of [RtcStatsReport](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport) objects:

```js
publisher.getRtcStatsReport()
  .then(statArrays => statsArray.forEach(console.log))
  .catch(console.log);
```

## Testing a publisher's stream

You can publish a test stream and check its audio and video statistics to determine the type of stream (such as high-resolution or audio-only) supported by your connection.

To get statistics for a stream published by the local client, you must use a session that uses the OpenTok Media Router (sessions with the [media mode](/video/guides/create-session#the-opentok-media-router-and-media-modes) set to routed), and you must set the `testNetwork` property to `true` in the `options` object you pass into the [Session.subscribe()](/sdk/stitch/video-js-reference/Session.html#subscribe) method. You can then use the `getStats()` method of the Subscriber object to get audio and video statistics for the stream you publish. See [this topic](/developer/guides/subscribe-stream/js/#stream_info) for more information.

