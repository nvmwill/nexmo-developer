---
title: Create a relayed session
description:  Use the Vonage Video API PHP SDK to learn how to create a session. Sessions allow participants to use audio, video, and messaging functionality in your application.
product: video
---

## Creating a relayed session

Here is PHP sample code that creates a new session with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to relayed:

```php
use Vonage\Video\MediaMode;
use Vonage\Video\SessionOptions;

$session = $client->video()->createSession(new SessionOptions(['mediaMode' => MediaMode::RELAYED]));

$sessionId = $session->getSessionId();
```  

In a relayed session, clients will attempt to send streams directly between each other. However, if clients cannot connect due to firewall restrictions, the session uses the Vonage Video TURN server to relay audio-video streams.

**Important:** Some features, such as archiving, are only available in routed (not relayed) sessions. See the previous section for instructions on creating a routed session.
