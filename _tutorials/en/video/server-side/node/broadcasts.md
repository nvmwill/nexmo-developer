---
title: Working with Broadcasts
description: Working with Broadcasts
---

### Working with Broadcasts

>Important: Only routed OpenTok sessions support live streaming broadcasts.

To start a live streaming broadcast of a session, call the `OpenTok.startBroadcast()` method. Pass in three parameters: the **session ID** for the session, **options** for the broadcast, and a **callback** function:

```js
var broadcastOptions = {
  outputs: {
    hls: {},
    rtmp: [
      {
        id: "foo",
        serverUrl: "rtmp://myfooserver/myfooapp",
        streamName: "myfoostream",
      },
      {
        id: "bar",
        serverUrl: "rtmp://mybarserver/mybarapp",
        streamName: "mybarstream",
      },
    ],
  },
  maxDuration: 5400,
  resolution: "640x480",
  layout: {
    type: "verticalPresentation",
  },
};
opentok.startBroadcast(sessionId, broadcastOptions, function (
  error,
  broadcast
) {
  if (error) {
    return console.log(error);
  }
  return console.log("Broadcast started: ", broadcast.id);
});
```
<!-- See the API reference for details on the options parameter. -->

On success, a broadcast object is passed into the callback function as the second parameter.

The broadcast object has properties that define the broadcast, including a `broadcastUrls` property, which has URLs for the broadcast streams.

Call the `OpenTok.stopBroadcast()` method to stop a live streaming broadcast by passing in the **broadcast ID** (the id property of the Broadcast object) as the first parameter. The second parameter is the callback function:

```js
opentok.stopBroadcast(broadcastId, function (error, broadcast) {
  if (error) {
    return console.log(error);
  }
  return console.log("Broadcast stopped: ", broadcast.id);
});
```

You can also call the `stop()` method of the Broadcast object to stop a broadcast.

Call the `Opentok.getBroadcast()` method, passing in a broadcast ID, to get a Broadcast object.

You can also get a list of all the Broadcasts you've created (up to 1000) with your API Key.

This is done using the `OpenTok.listBroadcasts(options, callback)` method.

The parameter options is an optional object used to specify an **offset**, **count**, and **sessionId** to help you paginate through the results.

The callback has a signature `function(err, broadcasts, totalCount)`. The broadcasts returned from the callback is an array of broadcast instances.

The **totalCount** returned from the callback is the total number of broadcasts your API Key has generated.

```js
opentok.listBroadcasts({ offset: 100, count: 50 }, function (
  error,
  broadcasts,
  totalCount
) {
  if (error) return console.log("error:", error);

  console.log(totalCount + " broadcasts");
  for (var i = 0; i < broadcasts.length; i++) {
    console.log(broadcasts[i].id);
  }
});
```

To change the broadcast layout, call the `OpenTok.setBroadcastLayout()` method, passing in the **broadcast ID** and the layout type.

You can set the initial layout class for a client's streams by setting the layout option when you create the token for the client, using the `OpenTok.generateToken()` method. And you can change the layout classes for streams in a session by calling the `OpenTok.setStreamClassLists(sessionId, classListArray, callback)` method.

Setting the layout of a live streaming broadcast is optional. By default, live streaming broadcasts use the "best fit" layout.



<!-- opentok-todo: Configuring video layout for OpenTok live streaming broadcasts. https://tokbox.com/developer/guides/broadcast/live-streaming/#configuring-video-layout-for-opentok-live-streaming-broadcasts-->

<!-- opentok-todo: For more information on live streaming broadcasts, see the OpenTok live streaming broadcasts developer guide.. https://tokbox.com/developer/guides/broadcast/live-streaming/ -->

In the next section you will learn how to [disconnect a client from a session](/video/tutorials/server-side-setup/video/server-side/node/disconnet-client/node).