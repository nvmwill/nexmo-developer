---
title: Working with SIP Interconnect
description: Working with SIP Interconnect
---

### Working with SIP Interconnect

You can add an audio-only stream from an external third-party SIP gateway using the SIP Interconnect feature. This requires a SIP URI, the session ID you wish to add the audio-only stream to, and a token to connect to that session ID.

To initiate a SIP call, call the `dial($sessionId, $token, $sipUri, $options)` method of the `OpenTok\OpenTok` class:

```php
$sipUri = 'sip:user@sip.partner.com;transport=tls';

$options = array(
  'headers' =>  array(
    'X-CUSTOM-HEADER' => 'headerValue'
  ),
  'auth' => array(
    'username' => 'username',
    'password' => 'password'
  ),
  'secure' => true,
  'from' => 'from@example.com'
);

$opentok->dial($sessionId, $token, $sipUri, $options);
```

<!-- opentok-todo: For more information, see the OpenTok SIP Interconnect developer guide. -->
