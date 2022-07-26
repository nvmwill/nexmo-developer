---
title: Create an automatically archived session
description:  Use the Vonage Video API PHP SDK to learn how to create a session. Sessions allow participants to use audio, video, and messaging functionality in your application.
product: video
---

## Creating an automatically archived session

You can create a session that is automatically archived. Here is PHP sample code that creates an automatically archived session:

```php
use Vonage\Video\MediaMode;
use Vonage\Video\SessionOptions;
use Vonage\Video\Archive\ArchiveMode;

// An automatically archived session:
$sessionOptions = new SessionOptions([
    'archiveMode' => ArchiveMode::ALWAYS,
    'mediaMode' => MediaMode::ROUTED
]);
$session = $client->video()->createSession($sessionOptions);


// Store this sessionId in the database for later use
$sessionId = $session->getSessionId();
```

Note that archived sessions must use the routed media mode.

For more information, see the [archiving](/video/guides/archiving) developer guide.
