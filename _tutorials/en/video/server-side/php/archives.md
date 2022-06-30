---
title: Working with Archives
description: Working with Archives
---

### Working with Archives

An archive is essentially a recorded session.

>You can only archive sessions that use the OpenTok Media Router (sessions with the media mode set to routed).

You can start the recording of an session using the `startArchive($sessionId, $name)` method of the `OpenTok\OpenTok` class. This will return an `OpenTok\Archive` instance.

The parameter `$archiveOptions` is an optional array and is used to assign a name, whether to recorded audio and/or video, the desired output mode for the Archive, and the desired resolution if applicable.

> Note that you can only start an Archive on a Session that has clients connected.

```php
// Create a simple archive of a session
$archive = $opentok->startArchive($sessionId);


// Create an archive using custom options
$archiveOptions = array(
    'name' => 'Important Presentation',     // default: null
    'hasAudio' => true,                     // default: true
    'hasVideo' => true,                     // default: true
    'outputMode' => OutputMode::COMPOSED,   // default: OutputMode::COMPOSED
    'resolution' => '1280x720'              // default: '640x480'
);
$archive = $opentok->startArchive($sessionId, $archiveOptions);

// Store this archiveId in the database for later use
$archiveId = $archive->id;
```

If you set the `outputMode` option to `OutputMode::INDIVIDUAL`, it causes each stream in the archive to be recorded to its own individual file. Please note that you cannot specify the resolution when you set the `outputMode` option to `OutputMode::INDIVIDUAL`.

The `OutputMode::COMPOSED` setting (the default) causes all streams in the archive to be recorded to a single (composed) file.

> Note that you can also create an automatically archived session, by passing in `ArchiveMode::ALWAYS` as the `archiveMode` key of the options parameter passed into the `OpenTok->createSession()` method (see ["Creating Sessions,"](/video/tutorials/server-side-setup/video/server-side/php/streams/php)).

**Stop recording**

You can stop the recording of a started archive using the `stopArchive($archiveId)` method of the `OpenTok\OpenTok` object. You can also do this using the `stop()` method of the `OpenTok\Archive` instance.

```php
// Stop an Archive from an archiveId (fetched from database)
$opentok->stopArchive($archiveId);
// Stop an Archive from an Archive instance (returned from startArchive)
$archive->stop();
```

**Get archive instance**

To get an `OpenTok\Archive` instance (and all the information about it) from an archive ID, use the `getArchive($archiveId)` method of the `OpenTok\OpenTok` class.

```php
$archive = $opentok->getArchive($archiveId);
```

**Delete archive**

To delete an Archive, you can call the `deleteArchive($archiveId)` method of the `OpenTok\OpenTok` class or the `delete()` method of an `OpenTok\Archive` instance.

```php
// Delete an Archive from an archiveId (fetched from database)
$opentok->deleteArchive($archiveId);
// Delete an Archive from an Archive instance (returned from startArchive, getArchive)
$archive->delete();
```

**Get list of all archives**

You can also get a list of all the Archives you've created (up to 1000) with your API Key. This is done using the `listArchives($offset, $count, $sessionId)` method of the `OpenTok/OpenTok` class. The parameters `$offset`, `$count`, and `$sessionId` are optional and can help you paginate through the results, and subset the data by a specific session. 

This will return an instance of the `OpenTok\ArchiveList` class.

```php
$archiveList = $opentok->listArchives();

// Get an array of OpenTok\Archive instances
$archives = $archiveList->getItems();
// Get the total number of Archives for this API Key
$totalCount = $archiveList->totalCount();
```

**Change layout**

For composed archives, you can change the layout dynamically, using the `setArchiveLayout($archiveId, $layoutType)` method:

```php
use OpenTok\OpenTok;

$layout = Layout::getPIP(); // Or use another get method of the Layout class.
$opentok->setArchiveLayout($archiveId, $layout);
```

You can set the initial layout class for a client's streams by setting the layout option when you create the token for the client, using the `OpenTok->generateToken()` method or the `Session->generateToken()` method.
 
You also can change the layout classes for a stream by calling the `OpenTok->updateStream()` method.

Setting the layout of composed archives is optional. By default, composed archives use the "best fit" layout.

<!-- opentok-todo: (see Customizing the video layout for composed archives). https://tokbox.com/developer/guides/archiving/layout-control.html-->

<!-- opentok-todo: For more information on archiving, see the OpenTok archiving developer guide. https://tokbox.com/developer/guides/archiving/ -->

In the next section you will learn how to [work with broadcasts](/video/tutorials/server-side-setup/video/server-side/php/broadcasts/php).