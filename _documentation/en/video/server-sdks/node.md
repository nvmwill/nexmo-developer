---
title: NodeJS
description: "Learn about the Node Vonage Video API server SDK, which makes it easy to use many of Vonage Video API's REST API's functionality. Use the SDK to generate sessions and tokens, and more."
product: video
---

# Vonage Video API Node SDK

The Node SDK provides methods for:

* Generating [sessions](#creating-sessions) and
  [tokens](#generating-tokens)
* [Working with archives](#working-with-archives)

<!-- * OPT-TODO: Working with [live streaming broadcasts](#working-with-live-streaming-broadcasts) -->

* [Sending signals to clients connected to a session](#sending-signals)

<!-- OPT-TODO: * Working with OpenTok [SIP interconnect](#working-with-sip-interconnect) -->

* [Disconnecting clients from sessions](#disconnecting-participants)
* [Forcing clients in a session to disconnect or mute published audio](#forcing-clients-in-a-session-to-mute-published-audio)


## Installation using npm (recommended):

NPM helps manage dependencies for node projects. Find more info here: <a href="http://npmjs.org">http://npmjs.org</a>

Run this command to install the package and adding it to your `package.json`:

```
npm install @vonage/server-sdk@beta @vonage/video
```

## Usage

### Initializing

Import the module to get a constructor function for a video object, then call it with `new` to
instantiate a video object with your own App ID and private key.

```javascript
const Vonage = require('@vonage/server-sdk');
const vonage = new Vonage({
    applicationId: APP_ID,
    privateKey: PRIVATE_KEY_PATH
});
```

### Creating Sessions

To create a session, use the `createSession(properties)` method. The
`properties` parameter is an optional object used to specify whether the session uses the
Media Router, to specify a location hint, and to specify whether the session will be automatically
archived or . The `session` returned is an instance of session. Session objects have a `sessionId` property that is
useful to be saved to a persistent store (such as a database).

```javascript
// Create a session that will attempt to transmit streams directly between
// clients. If clients cannot connect, the session uses the Vonage TURN server:
try {
    const session = await vonage.video.createSession();
    // save the sessionId
    db.save("session", session.sessionId, done);
} catch(error) {
    console.error("Error creating session: ", error);
}

// The session will use the Vonage Media Router:
try {
    const session = await vonage.video.createSession({ mediaMode: "routed" });
    // save the sessionId
    db.save("session", session.sessionId, done);
} catch(error) {
    console.error("Error creating session: ", error);
}

// A Session with a location hint
try {
    const session = await vonage.video.createSession({ location: "12.34.56.78" });
    // save the sessionId
    db.save("session", session.sessionId, done);
} catch(error) {
    console.error("Error creating session: ", error);
}

// A Session with an automatic archiving
try {
    const session = await vonage.video.createSession({ mediaMode: "routed", archiveMode: "always" });
    // save the sessionId
    db.save("session", session.sessionId, done);
} catch(error) {
    console.error("Error creating session: ", error);
}
```

### Generating Tokens

Once a Session is created, you can start generating Tokens for clients to use when connecting to it.
You can generate a token by calling the `generateClientToken(sessionId)` method.

<!-- OPT-TODO: double check options param -->
For layout control in archives and broadcasts, the initial layout class list of streams published
from connections using this token can be set as well.

```javascript
// Generate a Token from just a sessionId (fetched from a database)
const options = {
    role: "moderator",
    expireTime: new Date().getTime() / 1000 + 7 * 24 * 60 * 60, // in one week
    data: "name=Johnny",
    initialLayoutClassList: ["focus"]
}
const token = vonage.video.generateClientToken(sessionId, options);
```

### Working with archives

You can start the recording of a session using the `startArchive(sessionId, options)` method. The `options` parameter is an optional object used to set the name of
the Archive.
The `archive` returned is an instance of `Archive`. 

>Note that you can only start an archive on a Session with
connected clients.

```javascript
try {
    const archive = await vonage.video.startArchive(sessionId);
    // The id property is useful to save off into a database
    console.log("new archive:", archive.id);
} catch(error) {
    console.error("Error starting archive: ", error);
}
```

You can also disable audio or video recording by setting the `hasAudio` or `hasVideo` property of
the `options` parameter to `false`:

```javascript
var archiveOptions = {
  name: "Important Presentation",
  hasVideo: false, // Record audio only
};
try {
    const archive = await vonage.video.startArchive(sessionId, archiveOptions);
    // The id property is useful to save off into a database
    console.log("new archive:", archive.id);
} catch(error) {
    console.error("Error starting archive: ", error);
}
```

By default, all streams are recorded to a single (composed) file. You can record the different
streams in the session to individual files (instead of a single composed file) by setting the
`outputMode` option to `'individual'` when you call the `startArchive()` method:

```javascript
var archiveOptions = {
  name: "Important Presentation",
  outputMode: "individual",
};
try {
    const archive = await vonage.video.startArchive(sessionId, archiveOptions);
    // The id property is useful to save off into a database
    console.log("new archive:", archive.id);
} catch(error) {
    console.error("Error starting archive: ", error);
}
```

You can stop the recording of a started Archive using the `stopArchive(archiveId)`
method.
The `archive` returned in the callback is an instance of `Archive`.

```javascript
try {
    const archiveResponse = await vonage.video.stopArchive(archiveId);
    console.log("Successfully stopped archive:", archiveResponse.id);
} catch(error) {
    console.error("Error stopping archive: ", error);
}
```

To get an `Archive` instance (and all the information about it) from an `archiveId`, use the
`getArchive(archiveId)` method.

You can inspect the properties of the archive for more details.

```javascript
try {
    const archive = await vonage.video.getArchive(archiveId);
    console.log("Successfully retrieved archive:", archive.id);
} catch(error) {
    console.error("Error retrieving archive: ", error);
}
```

To delete an Archive, you can call the `deleteArchive(archiveId)` method.

```javascript
// Delete an Archive from an archiveId (fetched from database)
try {
    const archiveResponse = await vonage.video.deleteArchive(archiveId);
    console.log("Successfully deleted archive:", archiveResponse.id);
} catch(error) {
    console.error("Error deleting archive: ", error);
}
```

You can also get a list of all the Archives you've created (up to 1000) with your App ID. This is
done using the `searchArchives(options)` method. The parameter `options` is an
optional object used to specify an `offset` and `count` to help you paginate through the results.

The `archives` returned is an array of `Archive` instances.
The `totalCount` returned from the callback is
the total number of archives your App ID has generated.

```javascript
const filter = {
    offset: 100,
    count: 50
}
try {
    const archives = await vonage.video.searchArchives(filter);
    console.log(`Successfully retrieved ${archives.count} archives`);
    for (let i = 0; i < archives.length; i++) {
        console.log(archives.items[i].id);
    }
} catch(error) {
    console.error("Error returning list of archives: ", error);
}
```

>Note that you can also create an automatically archived session, by passing in `'always'`
as the `archiveMode` option when you call the `createSession()` method (see ["Creating Sessions,"](#creating-sessions) above).

For composed archives, you can set change the layout dynamically, using the
`updateArchiveLayout(archiveId, layout)` method:

```javascript
const layout = {
    type: "bestFit"
}
try {
    const archiveResponse = await vonage.video.updateArchiveLayout(archiveId,layout);
    console.log("Successfully updated archive layout:", archiveResponse);
} catch(error) {
    console.error("Error deleting archive: ", error);
}
```

You can set the initial layout class for a client's streams by setting the `layout` option when
you create the token for the client, using the `generateToken()` method.
And you can change the layout classes for streams in a session by calling the `setStreamClassLists(sessionId, classListArray)` method.

Setting the layout of composed archives is optional. By default, composed archives use the
"best fit" layout (see [Customizing the video layout for composed
archives](/video/guides/layout-control)).

For more information on archiving, see the
[archiving developer guide](/video/guides/archiving/overview).

<!-- OPT-TODO: ### Working with live streaming broadcasts

_Important:_
Only [routed OpenTok sessions](/developer/guides/create-session/#media-mode)
support live streaming broadcasts.

To start a [live streaming
broadcast](/developer/guides/broadcast/live-streaming) of an OpenTok session,
call the `OpenTok.startBroadcast()` method. Pass in three parameters: the session ID for the
session, options for the broadcast, and a callback function:

```javascript
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

See the API reference for details on the `options` parameter.

On success, a Broadcast object is passed into the callback function as the second parameter.
The Broadcast object has properties that define the broadcast, including a `broadcastUrls`
property, which has URLs for the broadcast streams. See the API reference for details.

Call the `OpenTok.stopBroadcast()` method to stop a live streaming broadcast pass in the
broadcast ID (the `id` property of the Broadcast object) as the first parameter. The second
parameter is the callback function:

```javascript
opentok.stopBroadcast(broadcastId, function (error, broadcast) {
  if (error) {
    return console.log(error);
  }
  return console.log("Broadcast stopped: ", broadcast.id);
});
```

You can also call the `stop()` method of the Broadcast object to stop a broadcast.

Call the `Opentok.getBroadcast()` method, passing in a broadcast ID, to get a Broadcast object.

You can also get a list of all the Broadcasts you've created (up to 1000) with your API Key. This is
done using the `OpenTok.listBroadcasts(options, callback)` method. The parameter `options` is an
optional object used to specify an `offset`, `count`, and `sessionId` to help you paginate through the results.
The callback has a signature `function(err, broadcasts, totalCount)`. The `broadcasts` returned from
the callback is an array of `Broadcast` instances. The `totalCount` returned from the callback is
the total number of broadcasts your App ID has generated.

```javascript
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

To change the broadcast layout, call the `OpenTok.setBroadcastLayout()` method,
passing in the broadcast ID and the [layout
type](/developer/guides/broadcast/live-streaming/#configuring-video-layout-for-opentok-live-streaming-broadcasts).

You can set the initial layout class for a client's streams by setting the `layout` option when
you create the token for the client, using the `OpenTok.generateToken()` method. And you can
change the layout classes for streams in a session by calling the
`OpenTok.setStreamClassLists(sessionId, classListArray, callback)` method.

Setting the layout of a live streaming broadcast is optional. By default, live streaming broadcasts
use the "best fit" layout. -->

### Sending signals

You can send a signal to all participants in a session by calling the
`sendSignal(payload, sessionId, connectionId)` method and setting
the `connectionId` parameter to `null`:

```javascript
const sessionId =
  "2_MX2xMDB-flR1ZSBOb3YgMTkgMTE6MDk6NTggUFNUIDIwMTN-MC2zNzQxNzIxNX2";

try {
    const signalResponse = await vonage.video.sendSignal({ type: "chat", data: "Hello" }, sessionId);
    console.log("Successfully sent signal:", signalResponse);
} catch(error) {
    console.error("Error sending signal: ", error);
}
```

Or send a signal to a specific participant in the session by calling the
`sendSignal(payload, sessionId, connectionId)` method and setting all parameters,
including `connectionId`:

```javascript
var sessionId =
  "2_MX2xMDB-flR1ZSBOb3YgMTkgMTE6MDk6NTggUFNUIDIwMTN-MC2zNzQxNzIxNX2";
var connectionId = "02e80876-02ab-47cd-8084-6ddc8887afbc";
try {
    const signalResponse = await vonage.video.sendSignal({ type: "chat", data: "Hello" }, sessionId, connectionId);
    console.log("Successfully sent signal:", signalResponse);
} catch(error) {
    console.error("Error sending signal: ", error);
}
```

<!-- OPT-TODO: This is the server-side equivalent to the `sendSignal()` method in the client SDKs. See
[signaling developer guide](/developer/guides/signaling/) . -->

### Disconnecting participants

You can disconnect participants from a session using the
`disconnectClient(sessionId, connectionId)` method.

```javascript
try {
    const disconnectResponse = await vonage.video.disconnectClient(sessionId, connectionId);
    console.log("Successfully disconnected client:", disconnectResponse);
} catch(error) {
    console.error("Error disconnecting client: ", error);
}
```

<!-- OPT-TODO: This is the client-side equivalent to the `disconnectClient()` method in OpenTok.js:
<https://www.tokbox.com/developer/guides/moderation/js/#force_disconnect>. -->

### Forcing clients in a session to mute published audio

You can force the publisher of a specific stream to stop publishing audio using the 
`muteStream(sessionId, streamId)`method.

You can force the publisher of all streams in a session (except for an optional list of streams)
to stop publishing audio using the `forceMuteAll()` method.
You can then disable the mute state of the session by calling the
`disableForceMute()` method.


<!-- OPT-TODO: ### Working with SIP Interconnect

You can add an audio-only stream from an external third-party SIP gateway using the SIP Interconnect
feature. This requires a SIP URI, the session ID you wish to add the audio-only stream to, and a
token to connect to that session ID.

```javascript
var options = {
  from: "15551115555",
  secure: true,
};
opentok.dial(sessionId, token, sipUri, options, function (error, sipCall) {
  if (error) return console.log("error: ", error);

  console.log(
    "SIP audio stream Id: " +
      sipCall.streamId +
      " added to session ID: " +
      sipCall.sessionId
  );
});
```

For more information, see the
[OpenTok SIP Interconnect developer guide](/developer/guides/sip/). -->

### Getting Stream Info

You can get information on an active stream in a session:

```javascript
var sessionId =
  "2_MX6xMDB-fjE1MzE3NjQ0MTM2NzZ-cHVTcUIra3JUa0kxUlhsVU55cTBYL0Y1flB";
var streamId = "2a84cd30-3a33-917f-9150-49e454e01572";
try {
    const stream = await vonage.video.getStreamInfo(sessionId, streamId);
    console.log(stream.id); // '2a84cd30-3a33-917f-9150-49e454e01572'
    console.log(stream.videoType); // 'camera'
    console.log(stream.name); // 'Bob'
    console.log(stream.layoutClassList); // ['main']
} catch(error) {
    console.error("Error retrieving stream: ", error.message);
}
```

Pass a session ID and stream ID to the `getStreamInfo()` method.
On successful completion, the `stream` object containing properties of the stream.

<!-- OPT-TODO: [can't find listStreams method] To get information on _all_ active streams in a session, call the `OpenTok.listStreams()` method,
passing in a session ID and a callback function. Upon success, the callback function is invoked
with an array of Stream objects passed into the second parameter: -->

```javascript
try {
    const streams = await vonage.video.getStreamInfo(sessionId);
    console.log(`Successfully retrieved ${streams.count} streams`);
    for (let i = 0; i < sreams.length; i++) {
        console.log(streams.items[i].id);
    }
} catch(error) {
    console.error("Error retrieving streams: ", error);
}
```

## Requirements

You need a Vonage App ID and private key, which you can obtain by logging into your
[Vonage Video API account](https://ui.idp.vonage.com/ui/auth/login).

The  Node SDK requires Node.js 6 or higher. It may work on older versions but they are no longer tested.

## Release Notes

See the <a href="https://github.com/Vonage/vonage-node-sdkreleases" onclick="gaEvent('node_sdk', 'body: releases-info')">Releases</a> page for details
about each release.

<script>
  var currentPage = 'node_sdk';
  $('#download, #samples, #github').click(function(event) {
    gaEvent(currentPage, 'top_banner: ' + event.currentTarget.id);
  });
</script>
