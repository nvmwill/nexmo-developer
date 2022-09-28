---
title: .NET
description: Learn about the .NET Vonage Video API server SDK, which makes it easy to use many of Vonage Video API's REST API's functionality. Use the SDK to generate sessions and tokens, and more.
product: video
---

# .NET Server SDK

The Vonage Video .NET SDK provides methods for:

* Generating
[sessions](/video/guides/create-session) and
[tokens](/video/guides/create-token) for
[Vonage Video](https://www.tokbox.com/) applications that run on the .NET platform. The SDK also includes
support for working with [Vonage Video archives](/video/guides/archiving/overview).
[Vonage Video](https://www.tokbox.com/) applications that run on the .NET platform
* Working with [Vonage Video archives](/video/guides/archiving/overview)

<!-- OPT-TODO: * Working with [Vonage Video live streaming broadcasts](/guides/broadcast) -->

* Working with [Vonage Video SIP interconnect](/video/guides/sip-interconnect)
* [Sending signals to clients connected to a session](/video/guides/signaling)
* [Disconnecting clients from sessions](/video/guides/moderation)
* [Forcing clients in a session to disconnect or mute published audio](/video/guides/moderation)

## Installation

### NuGet (recommended):

Using the <a href="http://docs.nuget.org/consume/package-manager-console" >Package Manager Console</a>:

```
PM> Install-Package OpenTok
```

### Manually:

Download the latest release from the <a href="https://github.com/opentok/Opentok-.NET-SDK/releases" onclick="gaEvent('dot-net_sdk', 'body: download')">Releases Page</a>.
Unzip the file and place the place the `OpenTok.dll`, dependent assemblies, and supporting files into your
own project.

## Usage

### Initializing

Import the `OpenTokSDK` namespace into any files that will be using Vonage Video objects. Then initialize an
`OpenTokSDK.OpenTok` object using your own API Key and API Secret.

```csharp
using OpenTokSDK;

// ...

int ApiKey = 000000; // YOUR API KEY
string ApiSecret = "YOUR API SECRET";
var OpenTok = new OpenTok(ApiKey, ApiSecret);
```

### Creating Sessions

To create a Vonage Video Session, call the instance's
`CreateSession(string location, MediaMode mediaMode, ArchiveMode archiveMode)`
method. Each of the parameters are optional and can be omitted if not needed. They are:

* `string location` : An IPv4 address used as a location hint. (default: "")

* `MediaMode mediaMode` : Specifies whether the session will use the
   [Vonage Video Media Router](/video/guides/create-session#the-media-router-and-media-modes))
   (MediaMode.ROUTED) or attempt to transmit streams directly between clients
   (MediaMode.RELAYED, the default). A routed session is required for some
   Vonage Video features (such as archiving).

* `ArchiveMode archiveMode` : Specifies whether the session will be automatically archived
  (ArchiveMode.ALWAYS) or not (ArchiveMode.MANUAL, the default)

The return value is a `OpenTokSDK.Session` object. Its `Id` property is useful to get an identifier that can be saved to a
persistent store (such as a database).

```csharp
// Create a session that will attempt to transmit streams directly between clients
var session = OpenTok.CreateSession();
// Store this sessionId in the database for later use:
string sessionId = session.Id;

// Create a session that uses the Vonage Video Media Router (which is required for archiving)
var session = OpenTok.CreateSession(mediaMode: MediaMode.ROUTED);
// Store this sessionId in the database for later use:
string sessionId = session.Id;

// Create an automatically archived session:
var session = OpenTok.CreateSession(mediaMode: MediaMode.ROUTED, ArchiveMode.ALWAYS);
// Store this sessionId in the database for later use:
string sessionId = session.Id;
```

### Generating Tokens

Once a Session is created, you can start generating Tokens for clients to use when connecting to it.
You can generate a token either by calling an `OpenTokSDK.OpenTok` instance's
`GenerateToken(string sessionId, Role role, double expireTime, string data)` method, or by calling a `OpenTokSDK.Session`
instance's `GenerateToken(Role role, double expireTime, string data)` method after creating it. In the first method, the
`sessionId` is required and the rest of the parameters are optional. In the second method, all the parameters are optional.

```csharp

// Generate a token from a sessionId (fetched from database)
string token = OpenTok.GenerateToken(sessionId);

// Generate a token by calling the method on the Session (returned from CreateSession)
string token = session.GenerateToken();

// Set some options in a token
double inOneWeek = (DateTime.UtcNow.Add(TimeSpan.FromDays(7)).Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
string token = session.GenerateToken(role: Role.MODERATOR, expireTime: inOneWeek, data: "name=Johnny");

```

### Working with Archives

You can only archive sessions that use the Vonage Video Media Router
(sessions with the media mode set to routed).

You can start the recording of a Vonage Video Session using a `OpenTokSDK.OpenTok` instance's
`StartArchive(sessionId, name, hasVideo, hasAudio, outputMode, resolution)` method. This will return an
`OpenTokSDK.Archive` instance. The parameter `name` is optional and used to assign a name for the
Archive. Note that you can only start an Archive on a Session that has clients connected.

```csharp
// A simple Archive (without a name)
var archive = OpenTok.StartArchive(sessionId);

// Store this archive ID in the database for later use
Guid archiveId = archive.Id;
```
You can add a name for the archive (to use for identification) by setting the `name` parameter of
the `OpenTok.StartArchive()` method.

You can also disable audio or video recording by setting the `hasAudio` or `hasVideo` parameter of
the `OpenTok.StartArchive()` method `false`.

You can also set the resolution of the recording to high definition by setting the `resolution` parameter of
the `OpenTok.StartArchive()` method to `"1280x720"`. Please note that you cannot specify the `resolution` when you set the `outputMode` parameter to `OutputMode.INDIVIDUAL`.

By default, all streams are recorded to a single (composed) file. You can record the different
streams in the session to individual files (instead of a single composed file) by setting the
`outputMode` parameter of the `OpenTok.StartArchive()` method `OutputMode.INDIVIDUAL`.

You can stop the recording of a started Archive using a `OpenTokSDK.OpenTok` instance's
`StopArchive(String archiveId)` method or using the `OpenTokSDK.Archive` instance's `Stop()` method.

```csharp
// Stop an Archive from an archive ID (fetched from database)
var archive = OpenTok.StopArchive(archiveId);
```

To get an `OpenTokSDK.Archive` instance (and all the information about it) from an archive ID, use the
`OpenTokSDK.OpenTok` instance's `GetArchive(archiveId)` method.

```csharp
var archive = OpenTok.GetArchive(archiveId);
```

To delete an archive, you can call a `OpenTokSDK.OpenTok` instance's `DeleteArchive(archiveId)` method or
call the `OpenTokSDK.Archive` instance's `Delete()` method.

```csharp
// Delete an archive from an archive ID (fetched from database)
OpenTok.DeleteArchive(archiveId);

// Delete an archive from an Archive instance (returned from GetArchive)
Archive.Delete();
```

You can also get a list of all the Archives you've created (up to 1000) with your API Key. This is
done using an `OpenTokSDK.OpenTok` instance's `ListArchives(int offset, int count)` method. You may optionally
paginate the Archives you receive using the offset and count parameters. This will return an
`OpenTokSDK.ArchiveList` object.

```csharp
// Get a list with the first 1000 archives created by the API Key
var archives = OpenTok.ListArchives();

// Get a list of the first 50 archives created by the API Key
var archives = OpenTok.ListArchives(0, 50);

// Get a list of the next 50 archives
var archives = OpenTok.ListArchives(50, 50);
```

// Get a list of the first 50 archives created for the given sessionId
var archives = OpenTok.ListArchives(sessionId:sessionId);
```

Note that you can also create an automatically archived session, by passing in `ArchiveMode.ALWAYS`
as the `archiveMode` parameter when you call the `OpenTok.CreateSession()` method (see "Creating
Sessions," above).

### Working with Streams

You can get information about a stream by calling the `GetStream(sessionId, streamId)` method of the `OpenTok` class.

```csharp
Stream stream = OpenTok.GetStream(sessionId, streamId);

// Stream Properties
stream.Id; // string with the stream ID
stream.VideoType; // string with the video type
stream.Name; // string with the name
stream.LayoutClassList; // list with the layout class list
```

You can get information about all the streams in a session by calling the `ListStreams(sessionId)` method of the `OpenTok` class.


```csharp
StreamList streamList = OpenTok.ListStreams(sessionId);

streamList.Count; // total count 
```

### Force Disconnecting

Your application server can disconnect a client from a Vonage Video session by calling the `ForceDisconnect(sessionId, connectionId)` method of the `OpenTok` class.

```csharp
// Force disconnect a client connection
OpenTok.ForceDisconnect(sessionId, connectionId);
```
### Sending Signals
Once a Session is created, you can send signals to everyone in the session or to a specific connection. You can send a signal by calling the `Signal(sessionId, signalProperties, connectionId)` method of the `OpenTok` class.

The `sessionId` parameter is the session ID of the session.

The `signalProperties` parameter is an instance of the `SignalProperties` class where you can set the `data` paramter and the `type` parameter.
* `data` (string) -- The data string for the signal. You can send a maximum of 8kB.
* `type` (string) -- (Optional) The type string for the signal. You can send a maximum of 128 charaacters, and only the following characters are allowed: A-Z, a-z, numbers (0-9), '-', '_', and '~'.

The `connectionId` parameter is an optional string used to specify the connection ID of a client conencted to the session. If you specify this value, the signal is sent to the specified client. Otherwise, the signal is sent to all clients connected to the session.

```csharp
string sessionId = "SESSIONID";
SignalProperties signalProperties = new SignalProperties("data", "type");
OpenTok.Signal(sessionId, signalProperties);

string connectionId = "CONNECTIONID";
OpenTok.Signal(sessionId, signalProperties, connectionId);
```

### Working with live streaming broadcasts

You can start a live-streaming broadcast of a Vonage Video Session using a `OpenTokSDK.OpenTok` instance's
`StartBroadcast(sessionId, hls, rtmpList, resolution, maxDuration, layout)` method. This returns an
`OpenTokSDK.Broadcast` instance.

Also see the documentation for the `Opentok.StopBroadcast()` and `OpenTok.GetBroadcast()` methods.

### SIP

You can connect a SIP platform to a Vonage Video session using the 
`Opentok.Dial(sessionId, token, sipUri, options)` or
`Opentok.DialAsync(sessionId, token, sipUri, options)` method.

You can send DTMF digits to all participants an active Vonage Video session, or to a specific client
connected to that session, using the `Opentok.PlayDTMF(sessionId, digits, connectionId)` or
`Opentok.PlayDTMFAsync(sessionId, digits, connectionId)` method.

### Forcing clients in a session to disconnect or mute published audio

You can force a specific client to disconnect from a Vonage Video session using the 
`Opentok.ForceDisconnect(sessionId, connectionId)` method.

You can force the publisher of a specific stream to stop publishing audio using the 
`Opentok.ForceMuteStream(sessionId, stream)` or `Opentok.ForceMuteStreamAsync(sessionId, stream)`method.

You can force the publisher of all streams in a session ((except for an optional list of streams)
to stop publishing audio using the `Opentok.ForceMuteAll(sessionId, excludedStreamIds)`
or `Opentok.ForceMuteAllAsync(sessionId, excludedStreamIds)` method.
You can then disable the mute state of the session by calling the
`Opentok.DisableForceMute(sessionId)` or `Opentok.DisableForceMuteAsync(sessionId)`
method.

### Changing the Timeout for Http Requests

If you would like to adjust the timeouts for Http Requests sent by the client SDK you can by calling OpenTok.SetDefaultRequestTimeout(int timeout) - note timeout is in milliseconds

```csharp
this.OpenTok = new OpenTok(apiKey, apiSecret);
this.OpenTok.SetDefaultRequestTimeout(2000);
```

## Requirements

You need a Vonage Video API key and API secret, which you can obtain by logging into your
[Vonage Video API account](https://tokbox.com/account).

The Vonage Video .NET SDK requires .NET Framework 4.5.2 or greater.

NOTE: When using on 4.5.2 TLS 1.2 is not enabled by default. You should use something like the following to force the runtime onto at least TLS 1.2:

```csharp
ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
```

Alternatively, if your application is dependent on a different version of TLS for other APIs, you can alternatively add TLS to the list of supported methods with a bitwise OR:

```csharp
ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12;
```
