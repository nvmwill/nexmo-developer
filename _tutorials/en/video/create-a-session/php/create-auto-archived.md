---
title: Create an automatically archived session
description:  Use the Vonage Video API PHP SDK to learn how to create a session. Sessions allow participants to use audio, video, and messaging functionality in your application.
product: video
---

## Creating an automatically archived session

You can create a session that is automatically archived. Here is PHP sample code that creates an automatically archived session:

```php
$sessionOptions = array(
    'archiveMode' => ArchiveMode::ALWAYS,
    'mediaMode' => MediaMode::ROUTED
);
$session = $opentok->createSession($sessionOptions);

echo $session->getSessionId();
```

Note that archived sessions must use the routed media mode.

For more information, see the [archiving](/video/guides/archiving) developer guide.
