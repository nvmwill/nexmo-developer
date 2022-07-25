---
title: Generate a token
description: Use the Vonage Video API PHP SDK to learn how to create a token. Tokens allow participants to use audio, video, and messaging functionality in your application.
product: video
---

## Generating a token using the PHP library

The following PHP code example shows how to generate a token using the Vonage Video PHP server-side library:

```php
use OpenTok\OpenTok;

$opentok = new OpenTok(API_KEY,API_SECRET);
// Replace with the correct session ID:
print $opentok->generateToken('your_session_ID');
print "\n";
```

Calling the `generateToken()` method returns a string. This string is the token. Use server-side PHP code to include the token in the served web page.

The following PHP code example shows how to obtain a token that has a role of "publisher" and that has a connection metadata string:

```php
use OpenTok\OpenTok;

$opentok = new OpenTok(API_KEY,API_SECRET);
// Replace with meaningful metadata for the connection:
$connectionMetaData = "username=Bob,userLevel=4";
// Replace with the correct session ID:
print $opentok->generateToken('your_session_ID', array('role' => Role::PUBLISHER, 'expireTime' => time()+(7 * 24 * 60 * 60), 'data' =>  $connectionMetaData);
print "\n";
```

The method takes the following arguments:

* `session_id` (String) — The session ID corresponding to the session to which the user will connect.
* `options` (Options) — An array with options for the token:
    * `role` (String) — Optional. This defines the role the user will have. There are three roles: subscriber, publisher, and moderator. Subscribers can only subscribe to streams in the session (they cannot publish). Publishers can subscribe and publish streams to the session, and they can use the signaling API. Moderators have the privileges of publishers and, in addition, they can also force other users to disconnect from the session or to cease publishing. The default role (if no value is passed) is publisher.
    * `expireTime` (int) — Optional. The time when the token will expire, defined as an integer value for a Unix timestamp (in seconds). If you do not specify this value, tokens expire in 24 hours after being created. The `expireTime` value, if specified, must be within 30 days of the creation time.
    * `data` (String) — Optional. A string containing metadata describing the connection. For example, you can pass the user ID, name, or other data describing the connection. You may obtain this data from a server-side database or from data provided to you by the client, depending on your application.
