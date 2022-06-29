---
title: Sending Signals
description: Sending Signals
---

### Sending Signals

Once a Session is created, you can send signals to everyone in the session or to a specific connection. You can send a signal by calling the `signal($sessionId, $payload, $connectionId)` method of the `OpenTok\OpenTok` class.

The `$sessionId` parameter is the **session ID** of the session.

The `$payload` parameter is an associative array used to set the following:

- `data` (string) -- The data string for the signal. You can send a maximum of 8kB.

- `type` (string) -- — (Optional) The type string for the signal. You can send a maximum of 128 characters, and only the following characters are allowed: A-Z, a-z, numbers (0-9), '-', '_', and '~'.

The `$connectionId` parameter is an optional string used to specify the connection ID of a client connected to the session. If you specify this value, the signal is sent to the specified client. Otherwise, the signal is sent to all clients connected to the session.

```php
use OpenTok\OpenTok;

// Send a signal to a specific client
$signalPayload = array(
    'data' => 'some signal message',
    'type' => 'signal type'
);
$connectionId = 'da9cb410-e29b-4c2d-ab9e-fe65bf83fcaf';
$opentok->signal($sessionId, $signalPayload, $connectionId);

// Send a signal to everyone in the session
$signalPayload = array(
    'data' => 'some signal message',
    'type' => 'signal type'
);
$opentok->signal($sessionId, $signalPayload);
```

<!-- open-todo: For more information, see the OpenTok signaling developer guide. https://tokbox.com/developer/guides/signaling/ -->

In the next section you will learn how to [work with SIP Interconnect](/video/tutorials/server-side-setup/video/server-side/php/sip/php).