---
title: Python
description: Learn about the Python Vonage Video API server SDK, which makes it easy to use many of Vonage Video API's REST API's functionality. Use the SDK to generate sessions and tokens, and more.
product: video
---

# Python Server SDK

The Vonage Video Python SDK lets you generate [sessions](/video/guides/create-session) and [tokens](/video/guides/create-token) for Vonage Video applications, and [archive](/video/guides/archiving/overview) Vonage Video sessions.

## Installation using Pip (recommended):

Pip helps manage dependencies for Python projects using the PyPI index. Find more info here: [http://www.pip-installer.org/en/latest/](http://www.pip-installer.org/en/latest/).

Add the `opentok` package as a dependency in your project. The most common way is to add it to your `requirements.txt` file:

```python
opentok>=3.0
```

Next, install the dependencies:

```sh
$ pip install -r requirements.txt
```


## Usage

### Initializing

Import the package at the top of any file where you will use it. At the very least you will need the `OpenTok` class. Then initialize a Vonage Video instance with your own API Key and API Secret.

```python
from opentok import OpenTok
opentok = OpenTok(api_key, api_secret)
```

### Creating Sessions

To create a Vonage Video Session, use the `opentok.create_session()` method. There are three optional keyword parameters for this method:

* `location` which can be set to a string containing an IP address.
* `media_mode` which is a String (defined by the MediaModes class). This determines whether the session will use the [Vonage Video Media Router](https://developer.vonage.com/video/guides/create-session#the-media-router-and-media-modes) or attempt to send streams directly between clients. A routed session is required for some Vonage Video features (such as archiving).
* `archive_mode` which specifies whether the session will be automatically archived (`always`) or not (`manual`).

This method returns a `Session` object. Its `session_id` attribute is useful when saving to a persistent store (such as a database).

```python
# Create a session that attempts to send streams directly between clients (falling back
# to use the Vonage Video TURN server to relay streams if the clients cannot connect):
session = opentok.create_session()

from opentok import MediaModes
# A session that uses the Vonage Video Media Router, which is required for archiving:
session = opentok.create_session(media_mode=MediaModes.routed)

# An automatically archived session:
session = opentok.create_session(media_mode=MediaModes.routed, archive_mode=ArchiveModes.always)

# A session with a location hint
session = opentok.create_session(location=u'12.34.56.78')

# Store this session ID in the database
session_id = session.session_id
```

### Generating Tokens

Once a Session is created, you can start generating Tokens for clients to use when connecting to it. You can generate a token either by calling the `opentok.generate_token(session_id)` method or by calling the `session.generate_token()` method on a `Session` instance after creating it. There is a set of optional keyword parameters: `role`, `expire_time`, `data`, and `initial_layout_class_list`.

```python
# Generate a Token from just a session_id (fetched from a database)
token = opentok.generate_token(session_id)
# Generate a Token by calling the method on the Session (returned from create_session)
token = session.generate_token()

from opentok import Roles
# Set some options in a token
token = session.generate_token(role=Roles.moderator,
                            expire_time=int(time.time()) + 10,
                            data=u'name=Johnny'
                            initial_layout_class_list=[u'focus'])
```

### Working with Archives

**Important:** You can only archive sessions that use the Vonage Video Media Router (sessions with the media mode set to routed).

You can start the recording of a Vonage Video Session using the `opentok.start_archive(session_id)` method. This method takes an optional keyword argument `name` to assign a name to the archive. This method will return an `Archive` instance. Note that you can only start an Archive on a Session that has clients connected.

```python
archive = opentok.start_archive(session_id, name=u'Important Presentation')

# Store this archive_id in the database
archive_id = archive.id
```    

You can also disable audio or video recording by setting the `has_audio` or `has_video` property of the `options` parameter to `false`:

```python
archive = opentok.start_archive(session_id, name=u'Important Presentation', has_video=False)

# Store this archive_id in the database
archive_id = archive.id
```    

By default, all streams are recorded to a single (composed) file. You can record the different streams in the session to individual files (instead of a single composed file) by setting the `output_mode` parameter of the `opentok.start_archive()` method to `OutputModes.individual`.

```python
archive = opentok.start_archive(session_id, name=u'Important Presentation', output_mode=OutputModes.individual)

# Store this archive_id in the database
archive_id = archive.id
```    

Composed archives (output_mode=OutputModes.composed) have an optional `resolution` parameter. If no value is supplied the Vonage Video platform will use the default resolution "640x480". You can set this to "1280x720" by setting the `resolution` parameter of the `opentok.start_archive()` method.

**Warning:** This value cannot be set for Individual output mode, an error will be thrown.

```python
archive = opentok.start_archive(session_id, name=u'Important Presentation', resolution="1280x720")

# Store this archive_id in the database
archive_id = archive.id
```

You can stop the recording of a started Archive using the `opentok.stop_archive(archive_id)` method. You can also do this using the `archive.stop()` method of an `Archive` instance.

```python
# Stop an Archive from an archive_id (fetched from database)
opentok.stop_archive(archive_id)
# Stop an Archive from an instance (returned from opentok.start_archive)
archive.stop()
```

To get an `Archive` instance (and all the information about it) from an archive ID, use the `opentok.get_archive(archive_id)` method.

```python
archive = opentok.get_archive(archive_id)
```

To delete an Archive, you can call the `opentok.delete_archive(archive_id)` method or the `archive.delete()` method of an `Archive` instance.

```
# Delete an Archive from an archive ID (fetched from database)
opentok.delete_archive(archive_id)
# Delete an Archive from an Archive instance (returned from opentok.start_archive or
opentok.get_archive)
archive.delete()
```

You can also get a list of all the Archives you've created (up to 1000) with your API Key. This is done using the `opentok.list_archives()` method. There are two optional keyword parameters: `count` and `offset`; they can help you paginate through the results. This method returns an instance of the `ArchiveList` class.

```python
archive_list = opentok.list_archive()

# Get a specific Archive from the list
archive = archive_list.items[i]

# Iterate over items
for archive in iter(archive_list):
pass

# Get the total number of Archives for this API Key
total = archive_list.total
```

Note that you can also create an automatically archived session, by passing in `ArchiveModes.always` as the `archive_mode` parameter when you call the `opentok.create_session()` method (see "Creating Sessions," above).

For composed archives, you can change the layout dynamically, using the `opentok.set_archive_layout(archive_id, type, stylesheet)` method:

```python
opentok.set_archive_layout('ARCHIVEID', 'horizontalPresentation')
```

Setting the layout of composed archives is optional. By default, composed archives use the `best fit` layout. Other valid values are: `custom`, `horizontalPresentation`, `pip` and `verticalPresentation`. If you specify a `custom` layout type, set the `stylesheet` parameter:

```python
opentok.set_archive_layout(
'ARCHIVEID',
'custom',
'stream.instructor {position: absolute; width: 100%;  height:50%;}'
)
```

For other layout types, do not set the stylesheet property. For more information see [Customizing the video layout for composed archives](/developer/guides/archiving/layout-control.html).

For more information on archiving, see the [Vonage Video archiving developer guide](/video/guides/archiving/overview).

## Sending Signals

Once a Session is created, you can send signals to everyone in the session or to a specific connection. You can send a signal by calling the `signal(session_id, payload)` method of the `OpenTok` class. The `payload` parameter is a dictionary used to set the `type`, `data` fields. Ỳou can also call the method with the parameter `connection_id` to send a signal to a specific connection `signal(session_id, data, connection_id)`.

```python
# payload structure
payload = {
'type': 'type', #optional
'data': 'signal data' #required
}

connection_id = '2a84cd30-3a33-917f-9150-49e454e01572'

# To send a signal to everyone in the session:
opentok.signal(session_id, payload)

# To send a signal to a specific connection in the session:
opentok.signal(session_id, payload, connection_id)
```

## Working with Streams

You can get information about a stream by calling the `get_stream(session_id, stream_id)` method of the `OpenTok` class.

The method returns a Stream object that contains information of an Vonage Video stream:

`id`: The stream ID

`videoType`: "camera" or "screen"

`name`: The stream name (if one was set when the client published the stream)

`layoutClassList`: It's an array of the layout classes for the stream

```python
session_id = 'SESSIONID'
stream_id = '8b732909-0a06-46a2-8ea8-074e64d43422'

# To get stream info:
stream = opentok.get_stream(session_id, stream_id)

# Stream properties:
print stream.id #8b732909-0a06-46a2-8ea8-074e64d43422
print stream.videoType #camera
print stream.name #stream name
print stream.layoutClassList #['full']
```

Also, you can get information about all the streams in a session by calling the `list_streams(session_id)` method of the `OpenTok` class.

The method returns a StreamList object that contains a list of all the streams

```python
# To get all streams in a session:
stream_list = opentok.list_streams(session_id)

# Getting the first stream of the list
stream = stream_list.items[0]

# Stream properties:
print stream.id #8b732909-0a06-46a2-8ea8-074e64d43422
print stream.videoType #camera
print stream.name #stream name
print stream.layoutClassList #['full']
```

## Force Disconnect

Your application server can disconnect a client from a Vonage Video session by calling the `force_disconnect(session_id, connection_id)` method of the `OpenTok` class, or the `force_disconnect(connection_id)` method of the `Session` class.

```python
session_id = 'SESSIONID'
connection_id = 'CONNECTIONID'

# To send a request to disconnect a client:
opentok.force_disconnect(session_id, connection_id)
```

## Working with SIP Interconnect

You can connect your SIP platform to a Vonage Video session, the audio from your end of the SIP call is added to the Vonage Video session as an audio-only stream. The Vonage Video Media Router mixes audio from other streams in the session and sends the mixed audio to your SIP endpoint.

```python
session_id = u('SESSIONID')
token = u('TOKEN')
sip_uri = u('sip:user@sip.partner.com;transport=tls')

# call the method with the required parameters
sip_call = opentok.dial(session_id, token, sip_uri)

# the method also support aditional options to establish the sip call

options = {
    'from': 'from@example.com',
    'headers': {
        'headerKey': 'headerValue'
    },
    'auth': {
        'username': 'username',
        'password': 'password'
    },
    'secure': True
}

# call the method with aditional options
sip_call = opentok.dial(session_id, token, sip_uri, options)
```

For more information, including technical details and security considerations, see the [Vonage Video SIP interconnect](/video/guides/sip-interconnect)developer guide.

## Working with Broadcasts

Vonage Video broadcast lets you share live Vonage Video sessions with many viewers.

You can use the `opentok.start_broadcast()` method to start a live streaming for a Vonage Video session. This broadcasts the session to an HLS (HTTP live streaming) or to RTMP streams.

To successfully start broadcasting a session, at least one client must be connected to the session.

The live streaming broadcast can target one HLS endpoint and up to five RTMP servers simultaneously for a session.

You can only start live streaming for sessions that use the Vonage Video Media Router; you cannot use live streaming with sessions that have the media mode set to relayed.

```python
session_id = 'SESSIONID'
options = {
'layout': {
    'type': 'custom',
    'stylesheet': 'the layout stylesheet (only used with type == custom)'
},
'maxDuration': 5400,
'outputs': {
    'hls': {},
    'rtmp': [{
    'id': 'foo',
    'serverUrl': 'rtmp://myfooserver/myfooapp',
    'streamName': 'myfoostream'
    }, {
    'id': 'bar',
    'serverUrl': 'rtmp://mybarserver/mybarapp',
    'streamName': 'mybarstream'
    }]
},
'resolution': '640x480'
}

broadcast = opentok.start_broadcast(session_id, options)
```

You can stop a started Broadcast using the `opentok.stop_broadcast(broadcast_id)` method.

```python
# getting the ID from a broadcast object
broadcast_id = broadcast.id

# stop a broadcast
broadcast = opentok.stop_broadcast(broadcast_id)
```

You can get details on a broadcast that is in-progress using the method `opentok.get_broadcast(broadcast_id)`.

```python
broadcast_id = '1748b7070a81464c9759c46ad10d3734'

# get broadcast details
broadcast = opentok.get_broadcast(broadcast_id)

print broadcast.json()

# print result
# {
#   "createdAt": 1437676551000,
#   "id": "1748b707-0a81-464c-9759-c46ad10d3734",
#   "projectId": 100,
#   "resolution": "640x480",
#   "sessionId": "2_MX4xMDBfjE0Mzc2NzY1NDgwMTJ-TjMzfn4",
#   "status": "started",
#   "updatedAt": 1437676551000,
#   "broadcastUrls": {
#       "hls": "http://server/fakepath/playlist.m3u8",
#       "rtmp": {
#           "bar": {
#               "serverUrl": "rtmp://mybarserver/mybarapp",
#               "status": "live",
#               "streamName": "mybarstream"
#           },
#           "foo": {
#               "serverUrl": "rtmp://myfooserver/myfooapp",
#               "status": "live",
#               "streamName": "myfoostream"
#           }
#       }
#   }
# }
```

You can dynamically change the layout type of a live streaming broadcast.

```python
# Valid values to 'layout_type' are: 'custom', 'horizontalPresentation',
# 'pip' and 'verticalPresentation' 
opentok.set_broadcast_layout('BROADCASTID', 'horizontalPresentation')

# if you specify a 'custom' layout type, set the stylesheet parameter:
opentok.set_broadcast_layout(
    'BROADCASTID',
    'custom',
    'stream.instructor {position: absolute; width: 100%;  height:50%;}'
)
```

## Requirements

You need an Vonage Video API key and API secret, which you can obtain by logging in to your [Vonage Video API account](https://www.tokbox.com/account/user/signup).

The Vonage Video Python SDK requires Python 2.6, 2.7, 3.3, 3.4, 3.5 or 3.6.
