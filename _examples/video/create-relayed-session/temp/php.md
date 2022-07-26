---
title: PHP
---

```php
use Vonage\Video\MediaMode;
use Vonage\Video\SessionOptions;

$session = $client->video()->createSession(new SessionOptions(['mediaMode' => MediaMode::RELAYED]));

$sessionId = $session->getSessionId();
```