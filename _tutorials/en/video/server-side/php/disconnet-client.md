---
title: Force a Client to Disconnect
description: Force a Client to Disconnect
---

### Force a Client to Disconnect

Your application server can disconnect a client from a session by calling the `forceDisconnect($sessionId, $connectionId)` method of the `OpenTok\OpenTok` class.

```php
use OpenTok\OpenTok;

// Force disconnect a client connection
$opentok->forceDisconnect($sessionId, $connectionId);
```

In the next section you will learn how to [mute a client before they join a session](/video/tutorials/server-side-setup/video/server-side/php/mute-audio/php).