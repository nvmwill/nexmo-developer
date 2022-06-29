---
title: Generating Tokens
description: Generating Tokens
---

### Generating Tokens

Once a Session is created, you can start generating tokens for clients to connect to a stream.

You can generate a token either by calling the `generateToken($sessionId, $options)` method of the `OpenTok\OpenTok` class, or by calling the `generateToken($options)` method on the `OpenTok\Session` instance after creating it.

The `$options` parameter is an optional array used to set the **role**, **expire time**, and **connection data** of the token. For layout control in **archives** and **broadcasts**, the initial layout class list of streams published from connections using this token can be set as well.

```php
use OpenTok\Session;
use OpenTok\Role;

// Generate a Token from just a sessionId (fetched from a database)
$token = $opentok->generateToken($sessionId);
// Generate a Token by calling the method on the Session (returned from createSession)
$token = $session->generateToken();

// Set some options in a token
$token = $session->generateToken(array(
    'role'       => Role::MODERATOR,
    'expireTime' => time()+(7 * 24 * 60 * 60), // in one week
    'data'       => 'name=Johnny',
    'initialLayoutClassList' => array('focus')
));
```

In the next section you will learn how to [work with streams](/video/tutorials/server-side-setup/video/server-side/php/streams/php).