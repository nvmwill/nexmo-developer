---
title: Generating Tokens
description: Generating Tokens
---

### Generating Tokens

Once a Session is created, you can start generating Tokens for clients to use when connecting to it.

You can generate a token by calling the `OpenTok.generateToken(sessionId, options)` method. Another way is to call the `generateToken(options)` method of a session object. The options parameter is an optional object used to set the role, expire time, and connection data of the Token.

For layout control in archives and broadcasts, the initial layout class list of streams published from connections using this token can be set as well.

```js
// Generate a Token from just a sessionId (fetched from a database)
token = opentok.generateToken(sessionId);

// Generate a Token from a session object (returned from createSession)
token = session.generateToken();

// Set some options in a Token
token = session.generateToken({
  role: "moderator",
  expireTime: new Date().getTime() / 1000 + 7 * 24 * 60 * 60, // in one week
  data: "name=Johnny",
  initialLayoutClassList: ["focus"],
});
```

In the next section you will learn how to [work with streams](/video/tutorials/server-side-setup/video/server-side/node/streams/node).