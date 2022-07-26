---
title: PHP
---

```php
use Vonage\Video\MediaMode;
use Vonage\Video\SessionOptions;
use Vonage\Video\Archive\ArchiveMode;

$sessionOptions = new SessionOptions([
    'archiveMode' => ArchiveMode::ALWAYS,
    'mediaMode' => MediaMode::ROUTED
]);
$session = $client->video()->createSession($sessionOptions);

$sessionId = $session->getSessionId();
```