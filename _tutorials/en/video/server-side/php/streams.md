---
title: Working with Streams
description: Working with Streams
---

### Working with Streams

To get stream details use the `getStream($sessionId, $streamId)` method of the `OpenTok\OpenTok` class.


```php
use OpenTok\Session;

// Get stream info from just a sessionId (fetched from a database)
$stream = $opentok->getStream($sessionId, $streamId);

// Stream properties
$stream->id; // string with the stream ID
$stream->videoType; // string with the video type
$stream->name; // string with the name
$stream->layoutClassList; // array with the layout class list
```

To get details on all streams in a session call the `listStreams($sessionId)` method of the `OpenTok\OpenTok` class.

```php
use OpenTok\Session;

// Get list of streams from just a sessionId (fetched from a database)
$streamList = $opentok->listStreams($sessionId);

$streamList->totalCount(); // total count
```

In the next section you will learn how to [work with archives](/video/tutorials/server-side-setup/video/server-side/php/archives/php).