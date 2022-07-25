---
title: Create a session that uses the Vonage Video Media Router
description:  Use the Vonage Video API PHP SDK to learn how to create a session. Sessions allow participants to use audio, video, and messaging functionality in your application.
product: video
---

## Creating a session that uses the Vonage Video Media Router

The following code session that uses the Vonage Video Media Router:

```php
use OpenTok\OpenTok;

$apiObj = new OpenTok($API_KEY, $API_SECRET);
$session = $apiObj->createSession(array('mediaMode' => MediaMode::ROUTED));
echo $session->getSessionId();
```

Use the session ID in an Vonage Video client library to connect to an Vonage Video session.

In an HTML page that uses the [Vonage Video JS client SDK](/video/resources#client-sdks), you can embed PHP that references the API key, the session ID, and the generated token string, as in the following:

```js
var apiKey = <?php print $API_KEY?>;
var sessionId = '<?php print $sessionId; ?>';
var token = '<?php print $apiObj->generateToken($sessionId); ?>';
```

<!-- OPT-TODO: You will also need to generate a token for each user connecting to the Vonage Video session. See [Connection Token Creation](/developer/guides/create-token/php/) for information on the `generateToken()` method. -->

The [Vonage Video Media Router](https://www.vonage.com/communications-apis/video/features) provides the following benefits:

* The Vonage Video Media Router can decrease bandwidth usage in multiparty sessions. (In a relayed session, each client must send a separate audio-video stream to each client subscribing to it.)
* The Vonage Video Media Router can improve the quality of the user experience through [audio fallback and video recovery](https://www.vonage.com/communications-apis/video/features). With these features, if a client's connectivity degrades to a degree that it does not support video for a stream it's subscribing to, the video is dropped on that client (without affecting other clients), and the client receives audio only. If the client's connectivity improves, the video returns.
* The Vonage Video Media Router supports the [archiving feature](https://www.vonage.com/communications-apis/video/features), which lets you record, save, and retrieve Vonage Video sessions.
