---
title: Creating Sessions
description: Creating Sessions
---

### Creating Sessions

To create an OpenTok Session, use the `OpenTok.createSession(properties, callback)` method. The `properties` parameter is an optional object used to specify whether the session uses the OpenTok Media Router, to specify a location hint, and to specify whether the session will be automatically archived or not.

The callback has the signature `function(error, session)`. The session returned in the callback is a session instance. 

The session object has a **sessionId** property that can be saved to a persistent store (such as a database).


```js
// Create a session that will attempt to transmit streams directly between
// clients. If clients cannot connect, the session uses the OpenTok TURN server:
opentok.createSession(function (err, session) {
  if (err) return console.log(err);

  // save the sessionId
  db.save("session", session.sessionId, done);
});

// The session will the OpenTok Media Router:
opentok.createSession({ mediaMode: "routed" }, function (err, session) {
  if (err) return console.log(err);

  // save the sessionId
  db.save("session", session.sessionId, done);
});

// A Session with a location hint
opentok.createSession({ location: "12.34.56.78" }, function (err, session) {
  if (err) return console.log(err);

  // save the sessionId
  db.save("session", session.sessionId, done);
});

// A Session with an automatic archiving
opentok.createSession({ mediaMode: "routed", archiveMode: "always" }, function (
  err,
  session
) {
  if (err) return console.log(err);

  // save the sessionId
  db.save("session", session.sessionId, done);
});
```

In the next section you will learn how to [generate a token](/video/tutorials/server-side-setup/video/server-side/node/generating-tokens/node).