---
title: Working with Broadcasts
description: Working with Broadcasts
---

### Working with Broadcasts

You can only start live streaming broadcasts for sessions that use the OpenTok Media Router (sessions with the media mode set to routed).

Start the live streaming broadcast of a session using the `startBroadcast($sessionId, $options)` method of the `OpenTok\OpenTok` class.

This will return an `OpenTok\Broadcast` instance. The `$options` parameter is an optional array used to assign broadcast options such as **layout**, **maxDuration**, **resolution**, and more.

```php
// Start a live streaming broadcast of a session
$broadcast = $opentok->startBroadcast($sessionId);


// Start a live streaming broadcast of a session, using broadcast options
$options = array(
    'layout' => Layout::getBestFit(),
    'maxDuration' => 5400,
    'resolution' => '1280x720'
);
$broadcast = $opentok->startBroadcast($sessionId, $options);

// Store the broadcast ID in the database for later use
$broadcastId = $broadcast->id;
```

You can stop the live streaming broadcast using the `stopBroadcast($broadcastId)` method of the `OpenTok\OpenTok` object. You can also do this using the `stop()` method of the `OpenTok\Broadcast` instance.

```php
// Stop a broadcast from an broadcast ID (fetched from database)
$opentok->stopBroadcast($broadcastId);

// Stop a broadcast from an Broadcast instance (returned from startBroadcast)
$broadcast->stop();
```

To get an `OpenTok\Broadcast` instance (and all the information about it) from a broadcast ID, use the `getBroadcast($broadcastId)` method of the `OpenTok\OpenTok` class.

```php
$broadcast = $opentok->getBroadcast($broadcastId);
```

You can set change the layout dynamically, using the `OpenTok->updateBroadcastLayout($broadcastId, $layout)` method:


```php
use OpenTok\OpenTok;

$layout = Layout::getPIP(); // Or use another get method of the Layout class.
$opentok->updateBroadcastLayout($broadcastId, $layout);
You can use the Layout class to set the layout types: Layout::getHorizontalPresentation(), Layout::getVerticalPresentation(), Layout::getPIP(), Layout::getBestFit(), Layout::createCustom().

$layoutType = Layout::getHorizontalPresentation();
$opentok->setArchiveLayout($archiveId, $layoutType);

// For custom Layouts, you can do the following
$options = array(
    'stylesheet' => 'stream.instructor {position: absolute; width: 100%;  height:50%;}'
);

$layoutType = Layout::createCustom($options);
$opentok->setArchiveLayout($archiveId, $layoutType);
```

You can also set the Screenshare Layout by calling the `setScreenshareType()` method on a layout object.

```php
$layout = Layout::getBestFit(); // Other types are not currently supported
$layout->setScreenshareType(Layout::LAYOUT_VERTICAL);
```

You can set the initial layout class for a client's streams by setting the layout option when you create the token for the client, using the `OpenTok->generateToken()` method or the `Session->generateToken()` method.

You can also change the layout classes for a stream by calling the `OpenTok->updateStream()` method.

Setting the layout of live streaming broadcasts is optional. By default, broadcasts use the "best fit" layout.


<!-- opentok-todo: Configuring video layout for OpenTok live streaming broadcasts. https://tokbox.com/developer/guides/broadcast/live-streaming/#configuring-video-layout-for-opentok-live-streaming-broadcasts-->

<!-- opentok-todo: For more information on live streaming broadcasts, see the OpenTok live streaming broadcasts developer guide.. https://tokbox.com/developer/guides/broadcast/live-streaming/ -->

In the next section you will learn how to [disconnect a client from a session](/video/tutorials/server-side-setup/video/server-side/php/disconnect-client/php).