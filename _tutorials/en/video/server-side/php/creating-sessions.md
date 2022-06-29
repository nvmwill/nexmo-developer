---
title: Creating Sessions
description: Creating Sessions
---

### Creating Sessions

To create a Session, use the `createSession($options)` method of the `OpenTok\OpenTok` class. The `$options` parameter is an optional array used to specify the following:

- Setting whether the session will use the OpenTok Media Router or attempt to send streams directly between clients.

- Setting whether the session will automatically create archives (implies use of routed session)

- Specifying a location hint.

The `getSessionId()` method of the `OpenTok\Session` instance returns the **session ID**.

```php
use OpenTok\MediaMode;
use OpenTok\ArchiveMode;

// Create a session that attempts to use peer-to-peer streaming:
$session = $opentok->createSession();

// A session that uses the OpenTok Media Router, which is required for archiving:
$session = $opentok->createSession(array( 'mediaMode' => MediaMode::ROUTED ));

// A session with a location hint:
$session = $opentok->createSession(array( 'location' => '12.34.56.78' ));

// An automatically archived session:
$sessionOptions = array(
    'archiveMode' => ArchiveMode::ALWAYS,
    'mediaMode' => MediaMode::ROUTED
);
$session = $opentok->createSession($sessionOptions);


// Store this sessionId in the database for later use
$sessionId = $session->getSessionId();
```

In the next section you will learn how to [generate a token](/video/tutorials/server-side-setup/video/server-side/php/generating-tokens/php).