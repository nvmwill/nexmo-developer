---
title: Working with Streams
description: Working with Streams
---

### Working with Streams
You can get information on an active stream in an OpenTok session:

var sessionId =
  "2_MX6xMDB-fjE1MzE3NjQ0MTM2NzZ-cHVTcUIra3JUa0kxUlhsVU55cTBYL0Y1flB";
var streamId = "2a84cd30-3a33-917f-9150-49e454e01572";
opentok.getStream(sessionId, streamId, function (error, streamInfo) {
  if (error) {
    console.log(error.message);
  } else {
    console.log(stream.id); // '2a84cd30-3a33-917f-9150-49e454e01572'
    console.log(stream.videoType); // 'camera'
    console.log(stream.name); // 'Bob'
    console.log(stream.layoutClassList); // ['main']
  }
});
Pass a **session ID**, **stream ID**, and **callback** function to the `OpenTok.getStream()` method. The callback function is called when the operation completes. It takes two parameters: `error` (in the case of an error) or `stream`. 

On sucessful completion, the stream object is set, containing properties of the stream.

To get information on all active streams in a session, call the `OpenTok.listStreams()` method, passing in a **session ID ** and a callback function.

Upon success, the callback function is invoked with an array of stream objects passed into the second parameter:

```js
opentok.listStreams(sessionId, function(error, streams) {
  if (error) {
    console.log(error.message);
  } else {
    streams.map(function(stream) {
      console.log(stream.id); // '2a84cd30-3a33-917f-9150-49e454e01572'
      console.log(stream.videoType); // 'camera'
      console.log(stream.name); // 'Bob'
      console.log(stream.layoutClassList); // ['main']
    }));
  }
});
```

In the next section you will learn how to [work with archives](/video/tutorials/server-side-setup/video/server-side/php/archives/node).