---
title: NodeJS
description: "Learn about the Node Vonage Video API server SDK, which makes it easy to use many of Vonage Video API's REST API's functionality. Use the SDK to generate sessions and tokens, and more."
product: video
---

# Vonage Video API Node SDK

The OpenTok Node SDK provides methods for:

* Generating [sessions](/guides/create-session/) and
  [tokens](/guides/create-token/) for
  [OpenTok](https://www.vonage.com/communications-apis/video/) applications
* Working with OpenTok [archives](/developer/guides/archiving)
* Working with OpenTok [live streaming broadcasts](/developer/guides/broadcast/live-streaming/)
* Working with OpenTok [SIP interconnect](/developer/guides/sip)
* [Sending signals to clients connected to a session](/developer/guides/signaling/)
* [Disconnecting clients from sessions](/developer/guides/moderation/rest/)
* [Forcing clients in a session to disconnect or mute published audio](/developer/guides/moderation/)


## Installation using npm (recommended):

npm helps manage dependencies for node projects. Find more info here: <a href="http://npmjs.org">http://npmjs.org</a>

Run this command to install the package and adding it to your `package.json`:

```
npm install @vonage/server-sdk
```

## Usage

### Initializing

Import the module to get a constructor function for an OpenTok object, then call it with `new` to
instantiate an OpenTok object with your own App ID and private key.

```javascript
const { Video } = require('@vonage/video');
const videoClient = new Video({
    applicationId: APP_ID,
    privateKey: PRIVATE_KEY_PATH,
    baseUrl: string
}, options);
```

`options` are

```javascript
{
  // If true, log information to the console
  debug: true|false,
  // append info the the User-Agent sent to Nexmo
  // e.g. pass 'my-app' for /nexmo-node/1.0.0/4.2.7/my-app
  appendToUserAgent: string,
  // Set a custom logger
  logger: {
    log: function() {level, args...}
    info: function() {args...},
    warn: function() {args...}
  },
  // Set a custom timeout for requests to Nexmo in milliseconds. Defaults to the standard for Node http requests, which is 120,000 ms.
  timeout: integer,
  // Set a custom host for requests instead of api.nexmo.com
  apiHost: string,
  // Set a custom host for requests instead of rest.nexmo.com
  restHost: string
}
```

#### Increasing Timeouts
The library currently has a 20 second timeout for requests. If you're on a slow network, and you need to increase the timeout, you can pass it (in milliseconds) when instantiating the OpenTok object.

```javascript
const { Video } = require('@vonage/video');
const videoClient = new Video({
    applicationId: APP_ID,
    privateKey: PRIVATE_KEY_PATH,
    baseUrl: string
}, {timeout: 30000});
```

### Creating Sessions

To create an OpenTok Session, use the `OpenTok.createSession(properties, callback)` method. The
`properties` parameter is an optional object used to specify whether the session uses the OpenTok
Media Router, to specify a location hint, and to specify whether the session will be automatically
archived or not. The callback has the signature `function(error, session)`. The `session` returned
in the callback is an instance of Session. Session objects have a `sessionId` property that is
useful to be saved to a persistent store (such as a database).

```javascript
// Create a session that will attempt to transmit streams directly between
// clients. If clients cannot connect, the session uses the Vonage TURN server:
try {
    const session = await videoClient.createSession();
    // save the sessionId
    db.save("session", session.sessionId, done);
} catch(error) {
    console.error("Error creating session: ", error);
}

// The session will use the Vonage Media Router:
try {
    const session = await videoClient.createSession({ mediaMode: "routed" });
    // save the sessionId
    db.save("session", session.sessionId, done);
} catch(error) {
    console.error("Error creating session: ", error);
}

// A Session with a location hint
try {
    const session = await videoClient.createSession({ location: "12.34.56.78" });
    // save the sessionId
    db.save("session", session.sessionId, done);
} catch(error) {
    console.error("Error creating session: ", error);
}

// A Session with an automatic archiving
try {
    const session = await videoClient.createSession({ mediaMode: "routed", archiveMode: "always" });
    // save the sessionId
    db.save("session", session.sessionId, done);
} catch(error) {
    console.error("Error creating session: ", error);
}
```

### Generating Tokens

Once a Session is created, you can start generating Tokens for clients to use when connecting to it.
You can generate a token by calling the `OpenTok.generateToken(sessionId, options)` method. Another
way is to call the `generateToken(options)` method of a Session object. The `options`
parameter is an optional object used to set the role, expire time, and connection data of the Token.
For layout control in archives and broadcasts, the initial layout class list of streams published
from connections using this token can be set as well.

```javascript
// Generate a Token from just a sessionId (fetched from a database)
try {
    const token = await videoClient.generateClientToken(sessionId);
} catch(error) {
    console.error("Error generating Client Token: ", error);
}

// ***NOT SURE IF THE SDK DOES THIS. I'LL CHECK.***
// Generate a Token from a session object (returned from createSession)
token = session.generateToken();

// Set some options in a Token
token = session.generateToken({
  role: "moderator",
  expireTime: new Date().getTime() / 1000 + 7 * 24 * 60 * 60, // in one week
  data: "name=Johnny",
  initialLayoutClassList: ["focus"],
});
```

### Working with archives

You can start the recording of an OpenTok Session using the `OpenTok.startArchive(sessionId, options, callback)` method. The `options` parameter is an optional object used to set the name of
the Archive. The callback has the signature `function(err, archive)`. The `archive` returned in
the callback is an instance of `Archive`. Note that you can only start an archive on a Session with
connected clients.

```javascript
try {
    const archive = await videoClient.startArchive(sessionId);
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
    const archive = await videoClient.startArchive(sessionId, archiveOptions);
    // The id property is useful to save off into a database
    console.log("new archive:", archive.id);
} catch(error) {
    console.error("Error starting archive: ", error);
}
```

By default, all streams are recorded to a single (composed) file. You can record the different
streams in the session to individual files (instead of a single composed file) by setting the
`outputMode` option to `'individual'` when you call the `OpenTok.startArchive()` method:

```javascript
var archiveOptions = {
  name: "Important Presentation",
  outputMode: "individual",
};
try {
    const archive = await videoClient.startArchive(sessionId, archiveOptions);
    // The id property is useful to save off into a database
    console.log("new archive:", archive.id);
} catch(error) {
    console.error("Error starting archive: ", error);
}
```

You can stop the recording of a started Archive using the `OpenTok.stopArchive(archiveId, callback)`
method. You can also do this using the `Archive.stop(callback)` method an `Archive` instance. The
callback has a signature `function(err, archive)`. The `archive` returned in the callback is an
instance of `Archive`.

```javascript
try {
    const archiveResponse = await videoClient.stopArchive(archiveId);
    console.log("Successfully stopped archive:", archiveResponse.id);
} catch(error) {
    console.error("Error stopping archive: ", error);
}

// ***NOT SURE IF THE SDK DOES THIS. I'LL CHECK.***

archive.stop(function (err, archive) {
  if (err) return console.log(err);
});
```

To get an `Archive` instance (and all the information about it) from an `archiveId`, use the
`OpenTok.getArchive(archiveId, callback)` method. The callback has a function signature
`function(err, archive)`. You can inspect the properties of the archive for more details.

```javascript
try {
    const archive = await videoClient.getArchive(archiveId);
    console.log("Successfully retrieved archive:", archive.id);
} catch(error) {
    console.error("Error retrieving archive: ", error);
}
```

To delete an Archive, you can call the `OpenTok.deleteArchive(archiveId, callback)` method or the
`delete(callback)` method of an `Archive` instance. The callback has a signature `function(err)`.

```javascript
// Delete an Archive from an archiveId (fetched from database)
try {
    const archiveResponse = await videoClient.deleteArchive(archiveId);
    console.log("Successfully deleted archive:", archiveResponse.id);
} catch(error) {
    console.error("Error deleting archive: ", error);
}

// ***NOT SURE IF THE SDK DOES THIS. I'LL CHECK.***

// Delete an Archive from an Archive instance, returned from the OpenTok.startArchive(),
// OpenTok.getArchive(), or OpenTok.listArchives() methods
archive.delete(function (err) {
  if (err) console.log(err);
});
```

You can also get a list of all the Archives you've created (up to 1000) with your App ID. This is
done using the `OpenTok.listArchives(options, callback)` method. The parameter `options` is an
optional object used to specify an `offset` and `count` to help you paginate through the results.
The callback has a signature `function(err, archives, totalCount)`. The `archives` returned from
the callback is an array of `Archive` instances. The `totalCount` returned from the callback is
the total number of archives your App ID has generated.

```javascript
const filter = {
    offset: 100,
    count: 50
}
try {
    const archives = await videoClient.searchArchives(filter);
    console.log(`Successfully retrieved ${archives.count} archives`);
    for (let i = 0; i < archives.length; i++) {
        console.log(archives.items[i].id);
    }
} catch(error) {
    console.error("Error returning list of archives: ", error);
}
```

Note that you can also create an automatically archived session, by passing in `'always'`
as the `archiveMode` option when you call the `OpenTok.createSession()` method (see "Creating
Sessions," above).

For composed archives, you can set change the layout dynamically, using the
`OpenTok.setArchiveLayout(archiveId, type, stylesheet, screenshareType, callback)` method:

```javascript
const layout = {
    type: "bestFit"
}
try {
    const archiveResponse = await videoClient.updateArchiveLayout(archiveId,layout);
    console.log("Successfully updated archive layout:", archiveResponse);
} catch(error) {
    console.error("Error deleting archive: ", error);
}
```

You can set the initial layout class for a client's streams by setting the `layout` option when
you create the token for the client, using the `OpenTok.generateToken()` method. And you can
change the layout classes for streams in a session by calling the
`OpenTok.setStreamClassLists(sessionId, classListArray, callback)` method.

Setting the layout of composed archives is optional. By default, composed archives use the
"best fit" layout (see [Customizing the video layout for composed
archives](/developer/guides/archiving/layout-control.html)).

For more information on archiving, see the
[OpenTok archiving developer guide](/developer/guides/archiving/).

## *** Doesn't do live streaming yet!!! ***
### Working with live streaming broadcasts

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
use the "best fit" layout.

### Sending signals

You can send a signal to all participants in an OpenTok Session by calling the
`OpenTok.signal(sessionId, connectionId, payload, callback)` method and setting
the `connectionId` parameter to `null`:

```javascript
const sessionId =
  "2_MX2xMDB-flR1ZSBOb3YgMTkgMTE6MDk6NTggUFNUIDIwMTN-MC2zNzQxNzIxNX2";

try {
    const signalResponse = await videoClient.sendSignal({ type: "chat", data: "Hello" }, sessionId);
    console.log("Successfully sent signal:", signalResponse);
} catch(error) {
    console.error("Error sending signal: ", error);
}
```

Or send a signal to a specific participant in the session by calling the
`OpenTok.signal(sessionId, connectionId, payload, callback)` method and setting all parameters,
including `connectionId`:

```javascript
var sessionId =
  "2_MX2xMDB-flR1ZSBOb3YgMTkgMTE6MDk6NTggUFNUIDIwMTN-MC2zNzQxNzIxNX2";
var connectionId = "02e80876-02ab-47cd-8084-6ddc8887afbc";
try {
    const signalResponse = await videoClient.sendSignal({ type: "chat", data: "Hello" }, sessionId, connectionId);
    console.log("Successfully sent signal:", signalResponse);
} catch(error) {
    console.error("Error sending signal: ", error);
}
```

This is the server-side equivalent to the signal() method in the OpenTok client SDKs. See
[OpenTok signaling developer guide](/developer/guides/signaling/) .

### Disconnecting participants

You can disconnect participants from an OpenTok Session using the
`OpenTok.forceDisconnect(sessionId, connectionId, callback)` method.

```javascript
try {
    const disconnectResponse = await videoClient.disconnectClient(sessionId, connectionId);
    console.log("Successfully disconnected client:", disconnectResponse);
} catch(error) {
    console.error("Error disconnecting client: ", error);
}
```

This is the server-side equivalent to the forceDisconnect() method in OpenTok.js:
<https://www.tokbox.com/developer/guides/moderation/js/#force_disconnect>.

### Forcing clients in a session to mute published audio

You can force the publisher of a specific stream to stop publishing audio using the 
`Opentok.forceMuteStream(sessionId)`method.

You can force the publisher of all streams in a session (except for an optional list of streams)
to stop publishing audio using the `Opentok.forceMuteAll()` method.
You can then disable the mute state of the session by calling the
`Opentok.disableForceMute()` method.

## *** Doesn't do SIP Interconnect yet!!! ***


### Working with SIP Interconnect

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
[OpenTok SIP Interconnect developer guide](/developer/guides/sip/).

### Getting Stream Info

You can get information on an active stream in an OpenTok session:

```javascript
var sessionId =
  "2_MX6xMDB-fjE1MzE3NjQ0MTM2NzZ-cHVTcUIra3JUa0kxUlhsVU55cTBYL0Y1flB";
var streamId = "2a84cd30-3a33-917f-9150-49e454e01572";
try {
    const stream = await videoClient.getStreamInfo(sessionId, streamId);
    console.log(stream.id); // '2a84cd30-3a33-917f-9150-49e454e01572'
    console.log(stream.videoType); // 'camera'
    console.log(stream.name); // 'Bob'
    console.log(stream.layoutClassList); // ['main']
} catch(error) {
    console.error("Error retrieving stream: ", error.message);
}
```

Pass a session ID, stream ID, and callback function to the `OpenTok.getStream()` method.
The callback function is called when the operation completes. It takes two parameters:
`error` (in the case of an error) or `stream`. On successful completion, the `stream` object
is set, containing properties of the stream.

To get information on _all_ active streams in a session, call the `OpenTok.listStreams()` method,
passing in a session ID and a callback function. Upon success, the callback function is invoked
with an array of Stream objects passed into the second parameter:

```javascript
try {
    const streams = await videoClient.getStreamInfo(sessionId);
    console.log(`Successfully retrieved ${streams.count} streams`);
    for (let i = 0; i < sreams.length; i++) {
        console.log(streams.items[i].id);
    }
} catch(error) {
    console.error("Error retrieving streams: ", error);
}
```

## Requirements

You need an OpenTok App ID and private key, which you can obtain by logging into your
[Vonage Video API account](https://tokbox.com/account).

The OpenTok Node SDK requires Node.js 6 or higher. It may work on older versions but they are no longer tested.

## Release Notes

See the <a href="https://github.com/opentok/opentok-node/releases" onclick="gaEvent('node_sdk', 'body: releases-info')">Releases</a> page for details
about each release.

### Important changes since v2.2.0

**Changes in v2.2.3:**

The default setting for the `createSession()` method is to create a session with the media mode set
to relayed. In previous versions of the SDK, the default setting was to use the OpenTok Media Router
(media mode set to routed). In a relayed session, clients will attempt to send streams directly
between each other (peer-to-peer); if clients cannot connect due to firewall restrictions, the
session uses the OpenTok TURN server to relay audio-video streams.

**Changes in v2.2.0:**

This version of the SDK includes support for working with OpenTok archives.

The `createSession()` method has changed to take one parameter: an `options` object that has `location`
and `mediaMode` properties. The `mediaMode` property replaces the `properties.p2p.preference`
parameter in the previous version of the SDK.

The `generateToken()` has changed to take two parameters: the session ID and an `options` object that has `role`, `expireTime` and `data` properties.


<script>
  var currentPage = 'node_sdk';
  $('#download, #samples, #github').click(function(event) {
    gaEvent(currentPage, 'top_banner: ' + event.currentTarget.id);
  });
</script>
